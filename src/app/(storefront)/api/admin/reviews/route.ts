import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const ALLOWED_EMAIL = "yridoutt@gmail.com";

async function checkAdmin() {
    if (process.env.NODE_ENV === 'development') return true;
    const session = await getServerSession(authOptions);
    return session?.user?.email === ALLOWED_EMAIL;
}

export async function GET(req: NextRequest) {
    if (!(await checkAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const reviews = await prisma.review.findMany({
            orderBy: { created_at: 'desc' },
            include: {
                product: { select: { id: true, title: true, media_primary_url: true } },
                profile: { select: { full_name: true, email: true } },
                order: { select: { id: true } }
            }
        });

        return NextResponse.json(reviews);
    } catch (error) {
        console.error("GET Admin Reviews error:", error);
        return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    if (!(await checkAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { id, status } = await req.json();

        if (!id || !['PENDING', 'APPROVED', 'REJECTED'].includes(status)) {
            return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
        }

        const review = await prisma.review.update({
            where: { id },
            data: { status }
        });

        return NextResponse.json(review);
    } catch (error) {
        console.error("PATCH Admin Review error:", error);
        return NextResponse.json({ error: "Failed to update review" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    if (!(await checkAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: "ID required" }, { status: 400 });
        }

        await prisma.review.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("DELETE Admin Review error:", error);
        return NextResponse.json({ error: "Failed to delete review" }, { status: 500 });
    }
}
