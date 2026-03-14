import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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
    const type = searchParams.get('type');

    try {
        let data;
        if (type === 'categories') data = await prisma.category.findMany({ orderBy: { sort_order: 'asc' } });
        else if (type === 'collections') data = await prisma.collection.findMany({ orderBy: { sort_order: 'asc' } });
        else if (type === 'pages') data = await prisma.cMSPage.findMany({ orderBy: { updated_at: 'desc' } });
        else if (type === 'products') data = await prisma.product.findMany({
            orderBy: { created_at: 'desc' },
            include: {
                variants: true,
                social_posts: {
                    orderBy: { created_at: 'desc' },
                    take: 1
                }
            }
        });
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

        if (type === 'products' && (action === 'create' || action === 'update')) {
            const { variants, ...productData } = data;

            // Clean variants for prisma (remove IDs to force recreation if needed, or handle upsert)
            // For simplicity in a high-speed dashboard, we'll delete and recreate variants on update

            if (action === 'create') {
                result = await prisma.product.create({
                    data: {
                        ...productData,
                        variants: {
                            create: variants?.map((v: any) => {
                                const { id, product_id, created_at, updated_at, ...vData } = v;
                                return vData;
                            }) || []
                        }
                    }
                });
            } else {
                // Transaction to delete old variants and create new ones
                result = await prisma.$transaction(async (tx) => {
                    await tx.productVariant.deleteMany({ where: { product_id: numericId } });
                    return await tx.product.update({
                        where: { id: numericId },
                        data: {
                            ...productData,
                            variants: {
                                create: variants?.map((v: any) => {
                                    const { id, product_id, created_at, updated_at, ...vData } = v;
                                    return vData;
                                }) || []
                            }
                        }
                    });
                });
            }
        } else if (action === 'create') result = await model.create({ data });
        else if (action === 'update') result = await model.update({ where: { id: numericId }, data });
        else if (action === 'delete') result = await model.delete({ where: { id: numericId } });
        else return NextResponse.json({ error: "Invalid action" }, { status: 400 });

        return NextResponse.json(result);
    } catch (error) {
        console.error("CRUD ERROR:", error);
        return NextResponse.json({ error: "Operation failed" }, { status: 500 });
    }
}
