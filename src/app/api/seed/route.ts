
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
    try {
        // Clear existing data
        await prisma.gallerySlide.deleteMany();
        await prisma.productPillar.deleteMany();
        await prisma.productVariant.deleteMany();
        await prisma.productMetafield.deleteMany();
        await prisma.product.deleteMany();

        // Create a sample product
        const product = await prisma.product.create({
            data: {
                peach_number: 297298,
                title: "Eiffel Tower Black Glossy Mug",
                subtitle: "Collection Paris",
                tagline: "Elegance in Every Sip",
                brand: "tsgabrielle®",
                short_description: "A love letter to Paris in ceramic form...",
                long_description: "Capture the timeless allure of the City of Light with every morning ritual.",
                base_sku: "TSG-MUG-ETB-001",
                base_mpn: "MPN-TSG-ETB-001",
                product_type: "Ceramic Mug",
                catalogue_category: "Drinkware",
                catalogue_collection: "Collection Paris",
                msrp_display: "$21.99",
                composition: "Premium Ceramic",
                finish: "Glossy Obsidian",
                care_instructions: "Dishwasher safe",
                media_primary_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAlcy-ObziwhUk21hAeBp7qwb4LDDHzBTgAV1TJYFocUudHKPBpDTQadWGtZfSk0dvi5XBYQCefBLH3GJHoOTReNiKvzmbcacs25pfaQwWAtt9SGDPw3bRYLcJ2g_Fxx-y5TeAL168rQbgiiyLiHUTIUOKKNSBCCmLb6l9y4-lR9rnOCm1mRor8QJHOBA0kephN5zEVn7fLg_EZSQKcMMSlsA_atVC_BPkWTH6ySitjvBQP1eD1uSrcfx7i7LQrcP_Rr4ib2mYaDoDS",
                status: "active",
                traceability: "Verified",
                ethical_audit: "Passed",
                carbon_footprint: "Neutral",
                variants: {
                    create: [
                        {
                            size_label: "11 oz",
                            color: "Black",
                            variant_sku: "TSG-MUG-ETB-11",
                            variant_mpn: "MPN-ETB-11",
                            msrp: "$18.99",
                            height: "3.85",
                            diameter: "3.35",
                            inventory: "In Stock"
                        }
                    ]
                }
            }
        });

        return NextResponse.json({ success: true, product });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
