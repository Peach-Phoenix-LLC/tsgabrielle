import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const ALLOWED_EMAIL = "yridoutt@gmail.com";

async function checkAdmin() {
    const session = await getServerSession(authOptions);
    return session?.user?.email === ALLOWED_EMAIL;
}

export async function GET(req: NextRequest) {
    if (!(await checkAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');

    try {
        let data;
        if (type === 'categories') data = await prisma.category.findMany({ orderBy: { sort_order: 'asc' } });
        else if (type === 'collections') data = await prisma.collection.findMany({ orderBy: { sort_order: 'asc' } });
        else if (type === 'pages') data = await prisma.cMSPage.findMany({ orderBy: { updated_at: 'desc' } });
        else if (type === 'products') data = await prisma.product.findMany({ orderBy: { created_at: 'desc' } });
        else return NextResponse.json({ error: "Invalid type" }, { status: 400 });

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    if (!(await checkAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { type, action, id, data } = await req.json();

    try {
        let result;
        const model: any = type === 'categories' ? prisma.category :
            type === 'collections' ? prisma.collection :
                type === 'products' ? prisma.product :
                    prisma.cMSPage;

        const numericId = typeof id === 'string' ? parseInt(id) : id;

        if (action === 'create') result = await model.create({ data });
        else if (action === 'update') result = await model.update({ where: { id: numericId }, data });
        else if (action === 'delete') result = await model.delete({ where: { id: numericId } });
        else return NextResponse.json({ error: "Invalid action" }, { status: 400 });

        return NextResponse.json(result);
    } catch (error) {
        console.error("CRUD ERROR:", error);
        return NextResponse.json({ error: "Operation failed" }, { status: 500 });
    }
}
