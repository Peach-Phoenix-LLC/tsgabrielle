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

export async function POST() {
  const supabase = getSupabaseServerClient();
  const list = await printfulFetch<PrintfulListResponse>("/store/products");

  for (const item of list.result) {
    const variants = await printfulFetch<PrintfulVariantsResponse>(`/store/products/${item.id}/variants`);
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

    for (const variant of variants.result) {
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
