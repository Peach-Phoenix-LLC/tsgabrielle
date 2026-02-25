import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');

        const products = await prisma.product.findMany({
            where: category ? {
                catalogue_category: {
                    equals: category,
                    mode: 'insensitive'
                }
            } : {},
            include: {
                variants: true
            },
            orderBy: {
                created_at: 'desc'
            }
        });

        return NextResponse.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user as any).role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { name, description, price, category, image_url, images, variants } = body;

        const product = await prisma.product.create({
            data: {
                title: name,
                subtitle: category,
                tagline: name,
                short_description: description,
                long_description: description,
                base_sku: `${Date.now()}`,
                base_mpn: `${Date.now()}`,
                peach_number: Math.floor(Math.random() * 1000000),
                product_type: category,
                catalogue_category: category,
                catalogue_collection: category,
                google_category_id: "0",
                google_category_name: category,
                seo_meta_title: name,
                seo_meta_description: description,
                hs_code_primary: "0",
                shipping_tier: "Standard",
                lead_time: "2-5 days",
                warehouse_zone: "Global",
                country_of_origin: "USA",
                traceability: "Fully traceable to source",
                ethical_audit: "Passed",
                carbon_footprint: "Neutral",
                media_primary_url: image_url,
                media_gallery_urls: images || [],
                composition: "Mixed",
                finish: "Standard",
                care_instructions: "Handle with care",
                msrp_display: `$${price}`,
                prop65_status: "N/A",
                trademark_notes: "tsgabrielle®",
                safety_testing: "Certified",
                warranty_info: "1 Year",
                contact_info: "contact@tsgabrielle.us",
                variants: {
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
                }
            },
            include: {
                variants: true
            }
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error('Error creating product:', error);
        return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
    }
}
