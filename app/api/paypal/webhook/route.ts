import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

type PayPalWebhookEvent = {
  event_type?: string;
  resource?: { id?: string; status?: string };
};

export async function POST(request: Request) {
  const event = (await request.json()) as PayPalWebhookEvent;
  const orderId = event.resource?.id;
  if (!orderId) return NextResponse.json({ received: true });

  const supabase = getSupabaseServerClient();
  if (event.event_type === "CHECKOUT.ORDER.APPROVED" || event.resource?.status === "COMPLETED") {
    await supabase.from("orders").update({ status: "paid" }).eq("paypal_order_id", orderId);
  }
  if (event.event_type === "PAYMENT.CAPTURE.DENIED") {
    await supabase.from("orders").update({ status: "cancelled" }).eq("paypal_order_id", orderId);
  }

  return NextResponse.json({ received: true });
}
