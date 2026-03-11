import { NextResponse } from "next/server";
import { paypalFetch } from "@/lib/paypal";
import { printfulFetch } from "@/lib/printful";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { monitor } from "@/lib/monitor";
import { getPostHogServerClient } from "@/lib/posthog-server";

type CaptureBody = { orderId: string };

export async function POST(request: Request) {
  const { orderId } = (await request.json()) as CaptureBody;
  if (!orderId) {
    monitor.checkoutError("orderId required for capture");
    return NextResponse.json({ error: "orderId required" }, { status: 400 });
  }

  // 1. Capture the PayPal payment
  let captureData;
  try {
    captureData = await paypalFetch<any>(`/v2/checkout/orders/${orderId}/capture`, {
      method: "POST"
    });
  } catch (err: any) {
    monitor.paymentFailed(orderId, err.message);
    return NextResponse.json({ error: "Payment capture failed" }, { status: 500 });
  }

  if (captureData.status !== "COMPLETED") {
    monitor.paymentFailed(orderId, `Status: ${captureData.status}`);
    return NextResponse.json({ error: "Payment not completed" }, { status: 400 });
  }

  const supabase = getSupabaseServerClient();

  // 2. Fetch the existing order and its items from Supabase
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("*, order_items(*, product_variants(*))")
    .eq("paypal_order_id", orderId)
    .single();

  if (orderError || !order) {
    monitor.checkoutError("Order not found in database", { paypal_order_id: orderId });
    return NextResponse.json({ error: "Order not found in database" }, { status: 404 });
  }

  // 3. Extract shipping info from PayPal
  const shipping = captureData.purchase_units[0].shipping;
  const payer = captureData.payer;

  const addr = {
    name: shipping.name.full_name,
    address1: shipping.address.address_line_1,
    address2: shipping.address.address_line_2,
    city: shipping.address.admin_area_2,
    state_code: shipping.address.admin_area_1,
    zip: shipping.address.postal_code,
    country_code: shipping.address.country_code
  };

  // 4. Create order in Printful (Legacy/Fallback)
  // Note: Local code still handles Printful creation to ensure immediate fulfillment,
  // but we log it for Make.com to potentially handle sync/orchestration.
  let printfulOrderId = null;
  try {
    const printfulItems = order.order_items.map((item: any) => ({
      external_variant_id: item.product_variant_id,
      variant_id: item.product_variants.printful_variant_id,
      quantity: item.quantity
    }));

    const printfulRes = await printfulFetch<any>("/orders", {
      method: "POST",
      body: JSON.stringify({
        external_id: order.id,
        recipient: addr,
        items: printfulItems,
        confirm: true // Automatically confirm to start fulfillment
      })
    });
    printfulOrderId = printfulRes.result.id.toString();
  } catch (err: any) {
    console.error("Printful order creation failed:", err);
    monitor.printfulError(err.message, order.id);
    // We don't fail the whole request since payment was already captured
  }

  // 5. Update Supabase with success status and details
  await supabase
    .from("orders")
    .update({
      status: "paid",
      printful_order_id: printfulOrderId,
      customer_email: payer.email_address,
      shipping_address: addr,
      automation_status: printfulOrderId ? "synced" : "pending",
      external_metadata: {
        paypal_capture_id: captureData.purchase_units[0].payments.captures[0].id,
        captured_at: new Date().toISOString()
      },
      updated_at: new Date().toISOString()
    })
    .eq("id", order.id);

  // 6. PostHog server-side tracking
  const ph = getPostHogServerClient();
  if (ph) {
    ph.capture({
      distinctId: payer.email_address || order.id,
      event: "order_completed",
      properties: {
        order_id: order.id,
        paypal_order_id: orderId,
        printful_order_id: printfulOrderId,
        total: order.total_cents / 100,
        currency: "USD",
        item_count: order.order_items.length,
        fulfillment_status: printfulOrderId ? "synced" : "pending",
      },
    });
  }

  // 7. Real-time Monitoring & Make.com Automation Trigger
  // This sends a structured event that Vercel Log Drains OR a direct Make.com Hook can catch
  await monitor.paymentSuccess(order.id, payer.email_address, {
    paypal_order_id: orderId,
    printful_order_id: printfulOrderId,
    total: order.total_cents / 100,
    sync_status: printfulOrderId ? "success" : "failed_local_retry_via_automation"
  });

  return NextResponse.json({ ok: true, printfulOrderId });
}
