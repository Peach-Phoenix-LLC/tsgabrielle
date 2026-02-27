import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getDashboardStats } from "@/lib/ga4-data";

const ADMIN_EMAILS = ["yridoutt@gmail.com", "peachphoenixllc@gmail.com"];

async function checkAdmin() {
    if (process.env.NODE_ENV === 'development') return true;
    const session = await getServerSession(authOptions);
    if (!session?.user) return false;
    return (session.user as any).role === 'ADMIN' || ADMIN_EMAILS.includes(session.user.email!);
}

export async function GET() {
    if (!(await checkAdmin())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const stats = await getDashboardStats();
        return NextResponse.json(stats);
    } catch (error: any) {
        console.error("Analytics Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
