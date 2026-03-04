import { NextResponse } from "next/server";
import { paypalFetch } from "@/lib/paypal";
import { getSupabaseServerClient } from "@/lib/supabase/server";

type CreateOrderBody = {
  items: Array<{ variantId: string; quantity: number }>;
};

type PayPalCreateResponse = {
  id: string;
  links: Array<{ rel: string; href: string }>;
};

export async function POST(request: Request) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }
  const body = (await request.json()) as CreateOrderBody;
  if (!body.items?.length) return NextResponse.json({ error: "Cart is empty" }, { status: 400 });

  const supabase = getSupabaseServerClient();
  const variantIds = body.items.map((item) => item.variantId);
  const { data: variants } = await supabase
    .from("product_variants")
    .select("id, title, price_cents")
    .in("id", variantIds);

  if (!variants?.length) return NextResponse.json({ error: "Invalid variants" }, { status: 400 });

  const totalCents = body.items.reduce((sum, cartItem) => {
    const variant = variants.find((v) => v.id === cartItem.variantId);
    if (!variant) return sum;
    return sum + variant.price_cents * cartItem.quantity;
  }, 0);
  const total = (totalCents / 100).toFixed(2);

  const order = await paypalFetch<PayPalCreateResponse>("/v2/checkout/orders", {
    method: "POST",
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [{ amount: { currency_code: "USD", value: total } }],
      application_context: {
        return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/cancel`
      }
    })
  });

  const { data: { user } } = await supabase.auth.getUser();

  const { data: orderRow } = await supabase
    .from("orders")
    .insert({
      user_id: user?.id,
      paypal_order_id: order.id,
      status: "pending",
      currency: "USD",
      total_cents: totalCents
    })
    .select("id")
    .single();

  if (orderRow?.id) {
    await supabase.from("order_items").insert(
      body.items.map((cartItem) => {
        const variant = variants.find((v) => v.id === cartItem.variantId);
        return {
          order_id: orderRow.id,
          product_variant_id: cartItem.variantId,
          quantity: cartItem.quantity,
          unit_price_cents: variant?.price_cents ?? 0
        };
      })
    );
  }

  return NextResponse.json({
    id: order.id,
    approveUrl: order.links.find((link) => link.rel === "approve")?.href
  });
}
