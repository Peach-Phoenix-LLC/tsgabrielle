import { NextResponse } from "next/server";
import { paypalFetch } from "@/lib/paypal";
import { getSupabaseServerClient } from "@/lib/supabase/server";

type CaptureBody = { orderId: string };

export async function POST(request: Request) {
  const { orderId } = (await request.json()) as CaptureBody;
  if (!orderId) return NextResponse.json({ error: "orderId required" }, { status: 400 });

  await paypalFetch(`/v2/checkout/orders/${orderId}/capture`, {
    method: "POST"
  });

  const supabase = getSupabaseServerClient();
  await supabase.from("orders").update({ status: "paid" }).eq("paypal_order_id", orderId);

  return NextResponse.json({ ok: true });
}
