import { NextResponse } from "next/server";
import { printfulFetch } from "@/lib/printful";
import { getSupabaseServerClient } from "@/lib/supabase/server";

type PrintfulListResponse = {
  result: Array<{
    id: number;
    external_id: string | null;
    name: string;
    thumbnail_url: string;
  }>;
};

type PrintfulVariantsResponse = {
  result: Array<{
    id: number;
    external_id: string | null;
    sku: string;
    name: string;
    retail_price: string;
    currency: string;
  }>;
};

type PrintfulSyncProductDetailsResponse = {
  result: {
    sync_variants: Array<{
      id: number;
      external_id: string | null;
      sku: string | null;
      name: string;
      retail_price: string;
    }>;
  };
};

export async function POST(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");
  const bearer = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!cronSecret || bearer !== cronSecret) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  return runSync();
}

export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");
  const bearer = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!cronSecret || bearer !== cronSecret) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  return runSync();
}

async function runSync() {
  const supabase = getSupabaseServerClient();
  const list = await printfulFetch<PrintfulListResponse>("/store/products");

  for (const item of list.result) {
    let variants: PrintfulVariantsResponse["result"] = [];
    try {
      const directVariants = await printfulFetch<PrintfulVariantsResponse>(
        `/store/products/${item.id}/variants`,
      );
      variants = directVariants.result;
    } catch {
      const fallback = await printfulFetch<PrintfulSyncProductDetailsResponse>(
        `/sync/products/${item.id}`,
      );
      variants = (fallback.result?.sync_variants ?? []).map((variant) => ({
        id: variant.id,
        external_id: variant.external_id,
        sku: variant.sku ?? variant.external_id ?? `PF-${variant.id}`,
        name: variant.name,
        retail_price: variant.retail_price,
        currency: "USD",
      }));
    }

    const slug = item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

    const { data: product } = await supabase
      .from("products")
      .upsert(
        {
          slug,
          title: item.name,
          description: item.name,
          printful_product_id: String(item.id),
          price_cents: 0,
          currency: "USD",
          active: true
        },
        { onConflict: "slug" }
      )
      .select("id")
      .single();

    if (!product?.id) continue;

    await supabase
      .from("product_images")
      .upsert({ product_id: product.id, url: item.thumbnail_url, alt: item.name, sort_order: 0 });

    for (const variant of variants) {
      await supabase.from("product_variants").upsert(
        {
          product_id: product.id,
          sku: variant.sku,
          title: variant.name,
          printful_variant_id: String(variant.id),
          price_cents: Math.round(Number(variant.retail_price) * 100),
          currency: variant.currency ?? "USD"
        },
        { onConflict: "sku" }
      );
    }
  }

  return NextResponse.json({ ok: true, synced: list.result.length });
}
