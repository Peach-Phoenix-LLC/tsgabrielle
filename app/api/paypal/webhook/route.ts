import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { trackServerEvent } from "@/lib/klaviyo";
import { paypalFetch } from "@/lib/paypal";

type PayPalWebhookEvent = {
  event_type?: string;
  resource?: { id?: string; status?: string };
};

type PayPalSignatureVerificationResponse = {
  verification_status?: "SUCCESS" | "FAILURE" | string;
};

export async function POST(request: Request) {
  const rawBody = await request.text();
  const event = JSON.parse(rawBody) as PayPalWebhookEvent;
  const orderId = event.resource?.id;
  if (!orderId) return NextResponse.json({ received: true });

  const webhookId = process.env.PAYPAL_WEBHOOK_ID;
  if (webhookId) {
    const authAlgo = request.headers.get("paypal-auth-algo");
    const certUrl = request.headers.get("paypal-cert-url");
    const transmissionId = request.headers.get("paypal-transmission-id");
    const transmissionSig = request.headers.get("paypal-transmission-sig");
    const transmissionTime = request.headers.get("paypal-transmission-time");

    if (!authAlgo || !certUrl || !transmissionId || !transmissionSig || !transmissionTime) {
      return NextResponse.json({ error: "Missing PayPal signature headers" }, { status: 401 });
    }

    const verification = await paypalFetch<PayPalSignatureVerificationResponse>(
      "/v1/notifications/verify-webhook-signature",
      {
        method: "POST",
        body: JSON.stringify({
          auth_algo: authAlgo,
          cert_url: certUrl,
          transmission_id: transmissionId,
          transmission_sig: transmissionSig,
          transmission_time: transmissionTime,
          webhook_id: webhookId,
          webhook_event: event,
        }),
      },
    );

    if (verification.verification_status !== "SUCCESS") {
      return NextResponse.json({ error: "Invalid PayPal webhook signature" }, { status: 401 });
    }
  } else {
    console.error("PAYPAL_WEBHOOK_ID is not set; rejecting webhook for security.");
    return NextResponse.json({ error: "Webhook verification not configured" }, { status: 500 });
  }

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
