import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import crypto from "crypto";

export async function POST(request: Request) {
  const secret = process.env.PRINTFUL_WEBHOOK_SECRET;
  const signature = request.headers.get("x-pf-signature");
  const rawBody = await request.text();

  // If secret is configured, verify signature
  if (secret) {
    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 401 });
    }

    const hmac = crypto.createHmac("sha256", secret);
    const digest = hmac.update(rawBody).digest("hex");

    if (signature !== digest) {
      console.error("Printful Webhook: Invalid signature", { signature, digest });
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
  }

  const body = JSON.parse(rawBody);
  const supabase = getSupabaseServerClient();

  console.log("Printful Webhook received:", body.type, body.data);

  // Handle package_shipped event
  if (body.type === "package_shipped") {
    const externalId = body.data?.order?.external_id;
    const tracking = body.data?.order?.shipment?.tracking_number;
    const trackingUrl = body.data?.order?.shipment?.tracking_url;

    if (externalId) {
      const { error } = await supabase
        .from("orders")
        .update({ 
          status: "fulfilled", 
          tracking_number: tracking ?? null,
          tracking_url: trackingUrl ?? null,
          updated_at: new Date().toISOString()
        })
        .eq("id", externalId);
      
      if (error) {
        console.error("Error updating order from Printful webhook:", error);
      } else {
        console.log(`Order ${externalId} updated to fulfilled via Printful webhook.`);
      }
    }
  }

  // Handle other events if needed
  if (body.type === "order_failed" || body.type === "order_cancelled") {
    const externalId = body.data?.order?.external_id;
    if (externalId) {
       await supabase
        .from("orders")
        .update({ status: body.type === "order_cancelled" ? "cancelled" : "failed" })
        .eq("id", externalId);
    }
  }

  return NextResponse.json({ received: true });
}

