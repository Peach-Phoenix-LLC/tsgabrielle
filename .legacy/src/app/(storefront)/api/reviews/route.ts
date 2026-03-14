import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const productId = searchParams.get('product_id');

        if (!productId) {
            return NextResponse.json({ error: "Product ID is missing" }, { status: 400 });
        }

        const reviews = await prisma.review.findMany({
            where: {
                product_id: parseInt(productId),
                status: 'APPROVED'
            },
            orderBy: { created_at: 'desc' },
            include: {
                profile: true
            }
        });

        // Calculate average and total
        const total = reviews.length;
        const average = total > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / total).toFixed(1) : 0;

        return NextResponse.json({ reviews, stats: { total, average } });
    } catch (error) {
        console.error("GET Reviews error:", error);
        return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
    }
}

import { addPeaches } from "@/lib/peaches";

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        const body = await req.json();
        const { product_id, order_id, rating, title, content, image_url } = body;

        if (!product_id || !rating || !content) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const user_id = session?.user ? (session as any).user.id : body.user_id || undefined;

        const newReview = await prisma.review.create({
            data: {
                product_id: parseInt(product_id),
                order_id: order_id || undefined,
                user_id: user_id || undefined,
                rating: parseInt(rating),
                title,
                body: content,
                image_url,
                status: 'PENDING'
            }
        });

        // Award Peaches if user is identified
        if (user_id) {
            await addPeaches(
                user_id,
                25,
                'EARNED',
                `Review for Product #${product_id}`
            );
        }

        return NextResponse.json(newReview);
    } catch (error) {
        console.error("POST Review error:", error);
        return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
    }
}
