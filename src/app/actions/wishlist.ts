'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

/**
 * Toggles a product in the user's wishlist.
 * If it exists, it's removed. If not, it's added.
 */
export async function toggleWishlistItemAction(userId: string, productId: string) {
    try {
        if (!userId || !productId) {
            return { success: false, error: "Missing identity or product ID." };
        }

        // Check if it exists
        const existing = await prisma.wishlistItem.findUnique({
            where: {
                user_id_product_id: {
                    user_id: userId,
                    product_id: parseInt(productId),
                },
            },
        });

        // Fetch product for correct path revalidation
        const product = await prisma.product.findUnique({ where: { id: parseInt(productId) } });
        const peach = product?.peach_number || productId;

        if (existing) {
            // Remove it
            await prisma.wishlistItem.delete({
                where: { id: existing.id },
            });
            revalidatePath(`/products/${peach}`);
            revalidatePath('/profile');
            return { success: true, action: 'removed' };
        } else {
            // Add it
            await prisma.wishlistItem.create({
                data: {
                    user_id: userId,
                    product_id: parseInt(productId),
                },
            });
            revalidatePath(`/products/${peach}`);
            revalidatePath('/profile');
            return { success: true, action: 'added' };
        }
    } catch (error) {
        console.error("Wishlist toggle error:", error);
        return { success: false, error: "Failed to update wishlist." };
    }
}

/**
 * Fetches all items in a user's wishlist.
 */
export async function getWishlistItemsAction(userId: string) {
    try {
        if (!userId) return { success: false, error: "Unauthorized" };

        const items = await prisma.wishlistItem.findMany({
            where: { user_id: userId },
            include: {
                product: true,
            },
            orderBy: {
                created_at: 'desc',
            },
        });

        return { success: true, items };
    } catch (error) {
        console.error("Fetch wishlist error:", error);
        return { success: false, error: "Failed to fetch wishlist." };
    }
}

/**
 * Checks if a specific product is in the user's wishlist.
 */
export async function isItemInWishlistAction(userId: string, productId: string) {
    try {
        if (!userId || !productId) return false;

        const existing = await prisma.wishlistItem.findUnique({
            where: {
                user_id_product_id: {
                    user_id: userId,
                    product_id: parseInt(productId),
                },
            },
        });

        return !!existing;
    } catch (error) {
        return false;
    }
}
