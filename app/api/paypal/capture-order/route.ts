import { NextResponse } from "next/server";
import { paypalFetch } from "@/lib/paypal";
import { printfulFetch } from "@/lib/printful";
import { getSupabaseServerClient } from "@/lib/supabase/server";

type CaptureBody = { orderId: string };

export async function POST(request: Request) {
  const { orderId } = (await request.json()) as CaptureBody;
  if (!orderId) return NextResponse.json({ error: "orderId required" }, { status: 400 });

  // 1. Capture the PayPal payment
  const captureData = await paypalFetch<any>(`/v2/checkout/orders/${orderId}/capture`, {
    method: "POST"
  });

  if (captureData.status !== "COMPLETED") {
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

  // 4. Create order in Printful
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
  } catch (err) {
    console.error("Printful order creation failed:", err);
    // We don't fail the whole request since payment was already captured
  }

  // 5. Update Supabase with success status and details
  await supabase
    .from("orders")
    .update({
      status: "paid",
      printful_order_id: printfulOrderId,
      customer_email: payer.email_address,
      shipping_address: addr
    })
    .eq("id", order.id);

  return NextResponse.json({ ok: true, printfulOrderId });
}
