import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import * as XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';

const ADMIN_EMAILS = ["yridoutt@gmail.com", "peachphoenixllc@gmail.com"];

async function checkAdmin() {
    if (process.env.NODE_ENV === 'development') return true;
    const session = await getServerSession(authOptions);
    if (!session?.user) return false;
    return (session.user as any).role === 'ADMIN' || ADMIN_EMAILS.includes(session.user.email!);
}

export async function POST(req: NextRequest) {
    if (!(await checkAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const filePath = path.join(process.cwd(), 'tmp', 'product_catalog.xlsx');
        if (!fs.existsSync(filePath)) {
            return NextResponse.json({ error: "Catalog file not found" }, { status: 404 });
        }

        const fileBuffer = fs.readFileSync(filePath);
        const workbook = XLSX.read(fileBuffer);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data: any[] = XLSX.utils.sheet_to_json(sheet);

        let createdCount = 0;
        let updatedCount = 0;

        for (const row of data) {
            const sku = row['SKU']?.toString();
            if (!sku) continue;

            // Simple numeric extraction for peach_number if possible, else use a hash or increment
            const peachNumberMatch = sku.match(/\d+/);
            const peachNumber = peachNumberMatch ? parseInt(peachNumberMatch[0]) : Math.floor(Math.random() * 1000000);

            const productData = {
                title: row['Product Name'] || "Untitled Product",
                subtitle: row['Collection'] || "",
                tagline: row['Alt_Text'] || "",
                brand: row['g:brand'] || "tsgabrielle®",
                short_description: row['Description (Short)'] || "",
                long_description: row['Description (Long)'] || row['Gemini_Product_Copy'] || "",
                base_sku: sku,
                base_mpn: row['g:mpn'] || row['Variant MPN'] || sku,
                base_gtin: row['g:gtin'] ? row['g:gtin'].toString() : null,
                product_type: row['Collection'] || "General",
                catalogue_category: "Catalog",
                catalogue_collection: row['Collection'] || "None",
                google_category_id: row['g:google_product_category']?.toString() || "",
                google_category_name: row['g:google_product_category']?.toString() || "",
                status: row['Product Active Status'] === 'TRUE' ? 'active' : 'draft',
                gs_condition: row['g:condition'] || "New",
                gs_availability: "In Stock",
                seo_meta_title: row['SEO Title'] || row['Product Name'] || "",
                seo_meta_description: row['SEO Description'] || row['Description (Short)'] || "",
                hs_code_primary: "000000", // Default
                shipping_tier: "Standard",
                lead_time: "5-7 days",
                warehouse_zone: "A1",
                country_of_origin: "US",
                traceability: "Full",
                ethical_audit: "Passed",
                carbon_footprint: "Neutral",
                msrp_display: row['Base_Price']?.toString() || "0.00",
                composition: "Various",
                finish: "Polished",
                care_instructions: "Handle with care",
                prop65_status: "Non-Toxic",
                trademark_notes: "None",
                safety_testing: "Certified",
                warranty_info: "1 Year",
                contact_info: "support@tsgabrielle.com",
                media_primary_url: row['Direct_Web_URL'] || null,
                media_primary_alt: row['Alt_Text'] || row['Product Name'] || "",
            };

            const existingProduct = await prisma.product.findUnique({
                where: { base_sku: sku }
            });

            if (existingProduct) {
                await prisma.product.update({
                    where: { id: existingProduct.id },
                    data: {
                        ...productData,
                        peach_number: existingProduct.peach_number // keep original
                    }
                });
                updatedCount++;
            } else {
                // Check if peach_number is already used
                let finalPeachNumber = peachNumber;
                const existingByPeach = await prisma.product.findUnique({ where: { peach_number: finalPeachNumber } });
                if (existingByPeach) {
                    finalPeachNumber = Math.floor(Math.random() * 1000000);
                }

                await prisma.product.create({
                    data: {
                        ...productData,
                        peach_number: finalPeachNumber
                    }
                });
                createdCount++;
            }

            // Handle Pillars (Premium Features)
            const pillarsText = row['Premium Features (Bullet Points)'];
            if (pillarsText && existingProduct?.id) {
                const bulletPoints = pillarsText.split('\n').filter((p: string) => p.trim());
                await prisma.productPillar.deleteMany({ where: { product_id: existingProduct.id } });
                await prisma.productPillar.createMany({
                    data: bulletPoints.map((p: string, i: number) => ({
                        product_id: existingProduct.id,
                        title: p.substring(0, 50),
                        body: p,
                        sort_order: i
                    }))
                });
            }
        }

        return NextResponse.json({
            success: true,
            message: `Catalog sync complete. Created: ${createdCount}, Updated: ${updatedCount}`
        });
    } catch (error: any) {
        console.error("SYNC CATALOG ERROR:", error);
        return NextResponse.json({ error: "Sync failed", details: error.message }, { status: 500 });
    }
}
