"use server";

import { postToSocial } from "@/lib/social";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const ADMIN_EMAILS = ["yridoutt@gmail.com", "peachphoenixllc@gmail.com"];

async function checkAdmin() {
    if (process.env.NODE_ENV === 'development') return true;
    const session = await getServerSession(authOptions);
    if (!session?.user) return false;
    return (session.user as any).role === 'ADMIN' || ADMIN_EMAILS.includes(session.user.email!);
}

export async function triggerSocialPostAction(productId: number, platforms?: string[]) {
    if (!(await checkAdmin())) {
        throw new Error("Unauthorized");
    }

    try {
        const results = await postToSocial(productId, platforms);
        return { success: true, results };
    } catch (error: any) {
        console.error("Social post action failed:", error);
        return { success: false, error: error.message };
    }
}

export async function getProductSocialHistory(productId: number) {
    if (!(await checkAdmin())) {
        throw new Error("Unauthorized");
    }

    return prisma.socialPost.findMany({
        where: { product_id: productId },
        orderBy: { created_at: 'desc' }
    });
}
