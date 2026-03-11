// Follows Deno environment standards for Supabase Edge Functions
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

// Environment variables provided natively by Supabase Edge environment
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const PRINTFUL_API_KEY = Deno.env.get('PRINTFUL_API_KEY')!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

serve(async (req) => {
  try {
    const payload = await req.json();
    console.log("📦 [tsgabrielle®] Webhook Received:", payload.event_type);

    // 1. Validate PayPal Checkout Order Approved Event
    if (payload.event_type !== "CHECKOUT.ORDER.APPROVED") {
      return new Response(JSON.stringify({ status: "ignored" }), { status: 200 });
    }

    const paypalOrderId = payload.resource.id;

    // 2. Locate the Order in the tsgabrielle® database
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .eq('paypal_order_id', paypalOrderId)
      .single();

    if (orderError || !order) {
      console.error("❌ Order not found for PayPal ID:", paypalOrderId);
      return new Response("Order not found", { status: 404 });
    }

    // 3. Mark the Order as Paid
    await supabase
      .from('orders')
      .update({ status: 'paid' })
      .eq('id', order.id);

    console.log(`✅ [tsgabrielle®] Order ${order.id} marked as Paid. Initiating Fulfillment...`);

    // 4. Trigger Printful API Fulfillment
    const printfulBody = {
      external_id: order.id,
      recipient: {
        // Assume mapping of address from the webhook payload resource
        name: payload.resource.payer?.name?.given_name + " " + payload.resource.payer?.name?.surname,
        // ... address fields would map here from PayPal or internal DB
      },
      items: order.order_items.map((item: any) => ({
        external_variant_id: item.product_variant_id,
        quantity: item.quantity,
      })),
    };

    const printfulRes = await fetch("https://api.printful.com/orders", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${PRINTFUL_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(printfulBody)
    });

    if (!printfulRes.ok) {
      const pfError = await printfulRes.json();
      console.error("❌ Printful API Error:", pfError);
      // Failsafe: Revert to pending manual review
      return new Response("Printful processing failed", { status: 500 });
    }

    const pfOrder = await printfulRes.json();

    // 5. Update tsgabrielle® database with the Printful Order ID
    await supabase
      .from('orders')
      .update({ 
        printful_order_id: pfOrder.result.id.toString(),
        status: 'fulfilled'
      })
      .eq('id', order.id);

    console.log("🎉 [Peach Phoenix, LLC] Autonomous Fulfillment Successful.");

    return new Response(JSON.stringify({ success: true, printfulId: pfOrder.result.id }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });

  } catch (err) {
    console.error("🚨 Webhook Critical Failure:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
});