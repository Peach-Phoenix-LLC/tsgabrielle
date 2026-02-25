"use server";

import { prisma } from "@/lib/prisma";

export async function createOrderAction(formData: FormData, cartItems: any[]) {
    try {
        if (!cartItems || cartItems.length === 0) {
            return { success: false, error: "Cart is empty" };
        }

        // Calculate totals server-side for security ensuring price is pulled from DB
        let subtotal = 0;
        const validOrderItems: any[] = [];

        for (const item of cartItems) {
            // Convert ID to number since schema changed to Int
            const productId = typeof item.id === 'string' ? parseInt(item.id) : item.id;

            if (isNaN(productId)) continue;

            const product = await prisma.product.findUnique({
                where: { id: productId }
            });

            if (!product) {
                return { success: false, error: `Product ${item.name} is no longer available.` };
            }

            // Fallback for price since 'price' field was removed in favor of msrp_display
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

        let userId = formData.get('userId') as string | null;

        // Create the order and nested order items in a single Prisma transaction
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

        // Normally here we'd integrate Stripe/Payment Gateway
        // For now, we mock the success logic by immediately setting PAID status
        await prisma.order.update({
            where: { id: newOrder.id },
            data: { status: "PAID" }
        });

        return { success: true, orderId: newOrder.id };

    } catch (error) {
        console.error("Failed to create order:", error);
        return { success: false, error: "Failed to process order. Please try again later." };
    }
}
