import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { addPeaches } from "@/lib/peaches";

const ADMIN_EMAILS = ["yridoutt@gmail.com", "peachphoenixllc@gmail.com"];

async function checkAdmin() {
    if (process.env.NODE_ENV === 'development') return true;
    const session = await getServerSession(authOptions);
    if (!session?.user) return false;
    return (session.user as any).role === 'ADMIN' || ADMIN_EMAILS.includes(session.user.email!);
}

export async function GET(req: NextRequest) {
    if (!(await checkAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    try {
        if (userId) {
            const customer = await prisma.profile.findUnique({
                where: { id: userId },
                include: {
                    peach_history: {
                        orderBy: { created_at: 'desc' }
                    }
                }
            });
            return NextResponse.json({ customer });
        } else {
            const customers = await prisma.profile.findMany({
                orderBy: { createdAt: 'desc' },
                include: {
                    peach_history: {
                        take: 5,
                        orderBy: { created_at: 'desc' }
                    }
                }
            });
            return NextResponse.json({ customers });
        }
    } catch (error) {
        return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    if (!(await checkAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { userId, amount, description } = await req.json();

    try {
        const result = await addPeaches(userId, amount, 'ADJUSTMENT', description);
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: "Adjustment failed" }, { status: 500 });
    }
}
