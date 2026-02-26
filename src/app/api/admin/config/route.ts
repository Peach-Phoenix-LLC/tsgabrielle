import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const ALLOWED_EMAIL = "yridoutt@gmail.com";

async function checkAdmin() {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.email !== ALLOWED_EMAIL) {
        return false;
    }
    return true;
}

export async function GET() {
    if (!(await checkAdmin())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const config = await prisma.storeConfig.findUnique({
            where: { id: 1 },
        });
        return NextResponse.json(config || {});
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch config" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    if (!(await checkAdmin())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const config = await prisma.storeConfig.upsert({
            where: { id: 1 },
            update: body,
            create: { id: 1, ...body },
        });
        return NextResponse.json(config);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update config" }, { status: 500 });
    }
}
