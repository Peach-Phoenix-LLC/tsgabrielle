"use server";

import { prisma } from "@/lib/prisma";

export async function getUserOrdersAction(userId: string) {
    if (!userId) {
        return { success: false, error: "User ID is required", orders: [] };
    }

    try {
        const orders = await prisma.order.findMany({
            where: { user_id: userId },
            orderBy: { created_at: 'desc' },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });

        // We need to gracefully serialize any Date objects since Server Actions
        // require plain objects, or we can just return them and let Next.js handle it
        // Next.js 14+ handles Date serialization in Server Actions natively.

        return { success: true, orders };
    } catch (error) {
        console.error("Error fetching user orders:", error);
        return { success: false, error: "Failed to fetch orders", orders: [] };
    }
}
