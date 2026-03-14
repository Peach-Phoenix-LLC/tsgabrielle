import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user as any).role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const productId = parseInt(id);
        if (isNaN(productId)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

        const body = await request.json();
        const { name, description, price, category, image_url, images, variants } = body;

        // Perform update
        const product = await prisma.product.update({
            where: { id: productId },
            data: {
                title: name,
                short_description: description,
                msrp_display: `$${price}`,
                catalogue_category: category,
                media_primary_url: image_url,
                media_gallery_urls: images,
                // Simple variant sync: delete and recreation
                variants: variants ? {
                    deleteMany: {},
                    create: (variants || []).map((v: any) => ({
                        size_label: v.size || "Standard",
                        color: v.color || "Default",
                        variant_sku: v.sku || `${Date.now()}-${Math.random()}`,
                        variant_mpn: v.sku || `${Date.now()}-${Math.random()}`,
                        height: "0",
                        diameter: "0",
                        msrp: `$${price}`,
                        inventory: "In Stock"
                    }))
                } : undefined
            },
            include: {
                variants: true
            }
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error('Error updating product:', error);
        return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user as any).role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const productId = parseInt(id);
        if (isNaN(productId)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

        // Delete variants first
        await prisma.productVariant.deleteMany({
            where: { product_id: productId }
        });

        await prisma.product.delete({
            where: { id: productId }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting product:', error);
        return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
    }
}
