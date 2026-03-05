import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { trackServerEvent } from "@/lib/klaviyo";

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
    // Update order status and return the data so we can use it for Klaviyo
    const { data: orderData } = await supabase
      .from("orders")
      .update({ status: "paid" })
      .eq("paypal_order_id", orderId)
      .select()
      .single();

    if (orderData?.user_id) {
      // Get user email to track in Klaviyo
      const { data: userData } = await supabase
        .from("users")
        .select("email")
        .eq("id", orderData.user_id)
        .single();
      
      if (userData?.email) {
        await trackServerEvent(userData.email, "Placed Order", {
          "Order ID": orderData.id,
          "Total Value": orderData.total_cents / 100,
          "PayPal Order ID": orderId,
        });
      }
    }
  }
  
  if (event.event_type === "PAYMENT.CAPTURE.DENIED") {
    await supabase.from("orders").update({ status: "cancelled" }).eq("paypal_order_id", orderId);
  }

  return NextResponse.json({ received: true });
}
