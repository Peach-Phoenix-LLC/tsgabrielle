"use server";

import { trackKlaviyoEvent, syncKlaviyoProfile } from "@/lib/klaviyo";
import { prisma } from "@/lib/prisma";
import { awardOrderPeaches, addPeaches } from "@/lib/peaches";
import { createPrintfulOrder } from "@/lib/printful";
import { trackPurchaseServer } from "@/lib/ga4-data";

// Helper to generate PayPal API access token
async function generateAccessToken() {
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_SECRET;

    if (!clientId || !clientSecret) {
        throw new Error("Missing PayPal API credentials");
    }

    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
    const response = await fetch(`${process.env.NEXT_PUBLIC_PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com'}/v1/oauth2/token`, {
        method: "POST",
        body: "grant_type=client_credentials",
        headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });

    const data = await response.json();
    return data.access_token;
}

export async function createPayPalOrderAction(cartItems: any[], formUserId?: string | null, shippingData?: any, peachesToRedeem: number = 0) {
    try {
        if (!cartItems || cartItems.length === 0) {
            return { success: false, error: "Cart is empty" };
        }

        // 1. Calculate totals from Prisma database
        let subtotal = 0;
        const validOrderItems: any[] = [];

        for (const item of cartItems) {
            const productId = typeof item.id === 'string' ? parseInt(item.id) : item.id;
            if (isNaN(productId)) continue;

            const product = await prisma.product.findUnique({
                where: { id: productId }
            });

            if (!product) {
                return { success: false, error: `Product ${item.name} is no longer available.` };
            }

            const itemPrice = parseFloat(product.msrp_display.replace(/[^0-9.]/g, '')) || 0;
            subtotal += itemPrice * Math.max(1, item.quantity);
            validOrderItems.push({
                product: { connect: { id: product.id } },
                quantity: Math.max(1, item.quantity),
                price: itemPrice,
            });
        }

        const shipping = subtotal > 0 ? 35.00 : 0;
        const tax = Number((subtotal * 0.08875).toFixed(2));

        // Peaches discount: 100 Peaches = $1
        const peachDiscount = Math.floor(peachesToRedeem / 100);
        const finalTotal = Math.max(0, subtotal + shipping + tax - peachDiscount);
        const totalAmountFormatted = finalTotal.toFixed(2);

        // 2. Resolve User ID
        let userId = formUserId;

        // 3. Create Pending Order in Prisma
        const newOrder = await prisma.order.create({
            data: {
                user_id: userId,
                total_amount: finalTotal,
                peaches_applied: peachesToRedeem,
                status: "PENDING",
                customer_name: shippingData?.customer_name,
                customer_email: shippingData?.customer_email,
                shipping_address1: shippingData?.shipping_address1,
                shipping_city: shippingData?.shipping_city,
                shipping_state: shippingData?.shipping_state,
                shipping_zip: shippingData?.shipping_zip,
                shipping_country: shippingData?.shipping_country,
                items: {
                    create: validOrderItems
                }
            }
        });

        // 4. Hit PayPal REST API to create the Order payload
        const accessToken = await generateAccessToken();
        const url = `${process.env.NEXT_PUBLIC_PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com'}/v2/checkout/orders`;

        const payload = {
            intent: "CAPTURE",
            purchase_units: [
                {
                    reference_id: newOrder.id, // Link PayPal ID to our Prisma ID
                    amount: {
                        currency_code: "USD",
                        value: totalAmountFormatted,
                    },
                },
            ],
        };

        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            method: "POST",
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("PayPal API Error:", data);
            throw new Error(data.message || "Failed to create PayPal order");
        }

        // Send back the PayPal ID (and our Prisma ID for later reference)
        return { success: true, paypalOrderId: data.id, prismaOrderId: newOrder.id };

    } catch (error) {
        console.error("Failed to create PayPal order:", error);
        return { success: false, error: "Failed to initialize secure payment. Please Try Again." };
    }
}

export async function capturePayPalOrderAction(paypalOrderId: string, prismaOrderId: string, clientId: string = 'server_side') {
    try {
        const accessToken = await generateAccessToken();
        const url = `${process.env.NEXT_PUBLIC_PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com'}/v2/checkout/orders/${paypalOrderId}/capture`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("PayPal Capture Error:", data);
            await prisma.order.update({
                where: { id: prismaOrderId },
                data: { status: "CANCELLED" }
            });
            return { success: false, error: data.message || "Payment authorization failed." };
        }

        if (data.status === "COMPLETED") {
            const payerEmail = data.payer?.email_address;
            const payerName = `${data.payer?.name?.given_name || ''} ${data.payer?.name?.surname || ''}`.trim();

            const order = await prisma.order.findUnique({
                where: { id: prismaOrderId },
                include: {
                    items: {
                        include: {
                            product: {
                                include: {
                                    variants: true
                                }
                            }
                        }
                    }
                }
            });

            if (!order) throw new Error("Order not found");

            // Calculate peaches to earn: 1 Peach per $1
            const peachesEarned = Math.floor(Number(order.total_amount));

            // Update local order
            const updatedOrder = await prisma.order.update({
                where: { id: prismaOrderId },
                data: {
                    status: "PAID",
                    customer_email: payerEmail || order.customer_email,
                    customer_name: payerName || order.customer_name,
                    peaches_earned: peachesEarned
                }
            });

            // Handle Peaches Earnings and Redemptions
            if (order.user_id) {
                // Award earned peaches
                await awardOrderPeaches(order.user_id, order.id, Number(order.total_amount));

                // If peaches were applied, deduct them from balance
                if (order.peaches_applied > 0) {
                    await addPeaches(
                        order.user_id,
                        -order.peaches_applied,
                        'REDEEMED',
                        `Discount on Order #${order.id}`
                    );
                }
            }

            // Trigger Printful Order
            let printfulId: number | undefined;
            try {
                const psOrder = await createPrintfulOrder({
                    external_id: order.id,
                    recipient: {
                        name: updatedOrder.customer_name || 'Customer',
                        address1: order.shipping_address1 || '',
                        city: order.shipping_city || '',
                        state_code: order.shipping_state || '',
                        country_code: order.shipping_country || 'US',
                        zip: order.shipping_zip || '',
                        email: updatedOrder.customer_email || ''
                    },
                    items: order.items.map(item => ({
                        sync_variant_id: item.product.variants[0]?.printful_variant_id || undefined,
                        variant_id: item.product.variants[0]?.printful_variant_id || undefined,
                        quantity: item.quantity,
                        name: item.product.title
                    })).filter(i => i.variant_id || i.sync_variant_id)
                });
                printfulId = psOrder.id;

                await prisma.order.update({
                    where: { id: prismaOrderId },
                    data: { printful_id: printfulId }
                });
            } catch (err) {
                console.error("Printful Fulfillment Failed:", err);
                // We still mark as PAID, but we might need a manual retry or alert
            }

            if (payerEmail) {
                await syncKlaviyoProfile(payerEmail, {
                    first_name: data.payer?.name?.given_name,
                    last_name: data.payer?.name?.surname
                });

                await trackKlaviyoEvent("Order Placed", payerEmail, {
                    orderId: prismaOrderId,
                    printful_id: printfulId,
                    total: Number(updatedOrder.total_amount),
                    peaches_earned: peachesEarned,
                    peaches_applied: order.peaches_applied
                }, Number(updatedOrder.total_amount));

                // Track in GA4
                await trackPurchaseServer(
                    prismaOrderId,
                    Number(updatedOrder.total_amount),
                    order.items.map(i => ({
                        product_id: i.product.id,
                        product_name: i.product.title,
                        quantity: i.quantity,
                        price: i.price
                    })),
                    clientId
                );
            }

            return { success: true, orderId: prismaOrderId };
        } else {
            return { success: false, error: "Payment was not completed successfully." };
        }

    } catch (error: any) {
        console.error("Failed to capture PayPal order:", error);
        return { success: false, error: error.message || "An unexpected error occurred capturing payment." };
    }
}
