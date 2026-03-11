import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import crypto from "crypto";

type PrintfulWebhookPayload = {
  type?: string;
  data?: {
    order?: {
      external_id?: string;
      shipment?: {
        tracking_number?: string | null;
        tracking_url?: string | null;
      };
    };
  };
};

function decodeWebhookSecret(secret: string): Buffer {
  // OAuth/v2 webhook signatures use a hex-decoded signing secret key.
  if (/^[\da-fA-F]+$/.test(secret) && secret.length % 2 === 0) {
    return Buffer.from(secret, "hex");
  }

  return Buffer.from(secret, "utf8");
}

function signaturesMatch(expected: string, received: string): boolean {
  const expectedBuf = Buffer.from(expected, "utf8");
  const receivedBuf = Buffer.from(received, "utf8");

  if (expectedBuf.length !== receivedBuf.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedBuf, receivedBuf);
}

export async function POST(request: Request) {
  const secret = process.env.PRINTFUL_WEBHOOK_SECRET;
  const signature =
    request.headers.get("x-pf-webhook-signature") ??
    request.headers.get("x-pf-signature");
  const rawBody = await request.text();

  // Verify webhook signature - fail closed if secret not configured
  if (!secret) {
    console.error("PRINTFUL_WEBHOOK_SECRET is not set; rejecting webhook for security.");
    return NextResponse.json({ error: "Webhook verification not configured" }, { status: 500 });
  }

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 401 });
  }

  const hmac = crypto.createHmac("sha256", decodeWebhookSecret(secret));
  const digest = hmac.update(rawBody).digest("hex");

  if (!signaturesMatch(digest, signature)) {
    console.error("Printful Webhook: Invalid signature", { signature, digest });
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const body = JSON.parse(rawBody) as PrintfulWebhookPayload;
  const supabase = getSupabaseServerClient();

  console.log("Printful Webhook received:", body.type, body.data);

  // Determine what to update based on the event
  const updatePayload: {
    status?: "fulfilled" | "failed" | "cancelled";
    tracking_number?: string | null;
    tracking_url?: string | null;
  } = {};
  const externalId = body.data?.order?.external_id;

  if (body.type === "shipment_sent" || body.type === "package_shipped") {
    updatePayload.status = "fulfilled";
    updatePayload.tracking_number =
      body.data?.order?.shipment?.tracking_number ?? null;
    
    // These columns might not exist yet, we'll try to include them
    // Supabase will ignore columns that don't exist if we use a specific approach, 
    // but here we just list them and catch errors.
    updatePayload.tracking_url = body.data?.order?.shipment?.tracking_url ?? null;
  } else if (body.type === "order_failed") {
    updatePayload.status = "failed";
  } else if (body.type === "order_cancelled" || body.type === "order_canceled") {
    updatePayload.status = "cancelled";
  }

  if (externalId && Object.keys(updatePayload).length > 0) {
    // Try to update with all fields
    const { error: fullUpdateError } = await supabase
      .from("orders")
      .update({ ...updatePayload, updated_at: new Date().toISOString() })
      .eq("id", externalId);
    
    if (fullUpdateError) {
      console.warn("Full update failed, trying minimal update (status and tracking_number only):", fullUpdateError.message);
      
      // Fallback to minimal update if full update fails (likely due to missing columns)
      const minimalPayload: { status?: string; tracking_number?: string | null } = {
        status: updatePayload.status,
      };
      if (updatePayload.tracking_number !== undefined) {
        minimalPayload.tracking_number = updatePayload.tracking_number;
      }

      const { error: minimalUpdateError } = await supabase
        .from("orders")
        .update(minimalPayload)
        .eq("id", externalId);
      
      if (minimalUpdateError) {
        console.error("Minimal update also failed:", minimalUpdateError);
      } else {
        console.log(`Order ${externalId} updated (minimal) to ${updatePayload.status}`);
      }
    } else {
      console.log(`Order ${externalId} updated (full) to ${updatePayload.status}`);
    }
  }


  return NextResponse.json({ received: true });
}
