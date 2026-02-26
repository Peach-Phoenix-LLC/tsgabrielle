
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
                composition: "Premium Ceramic",
                finish: "Glossy Obsidian",
                care_instructions: "Dishwasher safe",
                google_category_id: "0",
                google_category_name: "Drinkware",
                seo_meta_title: "Eiffel Tower Black Glossy Mug",
                seo_meta_description: "A love letter to Paris in ceramic form.",
                hs_code_primary: "0",
                shipping_tier: "Standard",
                lead_time: "2-5 days",
                warehouse_zone: "Global",
                country_of_origin: "USA",
                msrp_display: "$21.99",
                prop65_status: "N/A",
                trademark_notes: "tsgabrielle®",
                safety_testing: "Certified",
                warranty_info: "1 Year",
                contact_info: "contact@tsgabrielle.us",
                media_primary_url: "https://images.unsplash.com/photo-1517256011271-bfbd1f5d214a?auto=format&fit=crop&q=80&w=800",
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
                },
                pillars: {
                    create: [
                        { sort_order: 1, title: "Parisian Grace", body: "Every curve and contour is a homage to the architectural mastery of Paris." },
                        { sort_order: 2, title: "Obsidian Depth", body: "A high-gloss finish that captures light and shadow with cinematic intensity." }
                    ]
                },
                gallery_slides: {
                    create: [
                        { sort_order: 1, label: "Campaign — Morning Ritual", caption: "Dawn in the Atelier", sub_caption: "Starting the day with intent and elegance.", accent_color: "#a932bd", image_url: "https://images.unsplash.com/photo-1517256011271-bfbd1f5d214a?auto=format&fit=crop&q=80&w=1200" },
                        { sort_order: 2, label: "Detail — Glossy Finish", caption: "The Obsidian Mirror", sub_caption: "A deep, reflective surface that defines luxury.", accent_color: "#ffffff", image_url: "https://images.unsplash.com/photo-1576435010619-325d7429188f?auto=format&fit=crop&q=80&w=1200" }
                    ]
                },
                metafields: {
                    create: [
                        { key: "Material", value: "Premium Ceramic", is_public: true },
                        { key: "Finish", value: "High-Gloss Obsidian", is_public: true }
                    ]
                }
            }
        });

        return NextResponse.json({ success: true, product });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
