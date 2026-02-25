"use server";

import { prisma } from "@/lib/prisma";

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

export async function createPayPalOrderAction(cartItems: any[], formUserId?: string | null) {
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
        const totalAmount = subtotal + shipping + tax;
        const totalAmountFormatted = totalAmount.toFixed(2);

        // 2. Resolve User ID
        let userId = formUserId;

        // 3. Create Pending Order in Prisma
        const newOrder = await prisma.order.create({
            data: {
                user_id: userId,
                total_amount: totalAmount,
                status: "PENDING",
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

export async function capturePayPalOrderAction(paypalOrderId: string, prismaOrderId: string) {
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
            // Check for specific PayPal errors (e.g., funding instrument declined)
            console.error("PayPal Capture Error:", data);

            // Mark the order as FAILED or CANCELED depending on logic, here we set to CANCELLED logic
            await prisma.order.update({
                where: { id: prismaOrderId },
                data: { status: "CANCELLED" }
            });

            return { success: false, error: data.message || "Payment authorization failed." };
        }

        // Payment captured successfully! Mark order as PAID.
        if (data.status === "COMPLETED") {
            await prisma.order.update({
                where: { id: prismaOrderId },
                data: { status: "PAID" }
            });
            return { success: true, orderId: prismaOrderId };
        } else {
            return { success: false, error: "Payment was not completed successfully." };
        }

    } catch (error: any) {
        console.error("Failed to capture PayPal order:", error);
        return { success: false, error: error.message || "An unexpected error occurred capturing payment." };
    }
}
