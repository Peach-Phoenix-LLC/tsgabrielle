const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const products = [
        {
            peach_number: 1001,
            title: 'PRISM TEE',
            subtitle: 'HOLOGRAPHIC ESSENTIALS',
            tagline: 'Refract your style.',
            short_description: 'Premium organic cotton tee with holographic prism detail.',
            long_description: 'The Prism Tee is the foundation of the Update collection. Featuring our signature holographic iridescent foil on sustainable organic cotton.',
            base_sku: 'UPD-PRISM-TEE-W',
            base_mpn: 'UPD001',
            product_type: 'Apparel',
            catalogue_category: 'T-Shirts',
            catalogue_collection: 'Update Essentials',
            google_category_id: '212',
            google_category_name: 'Apparel & Accessories > Clothing > Shirts & Tops',
            status: 'active',
            seo_meta_title: 'Prism Tee | Update Store',
            seo_meta_description: 'Premium holographic t-shirt from the Update collection.',
            hs_code_primary: '6109.10',
            shipping_tier: 'Standard',
            lead_time: '3-5 days',
            warehouse_zone: 'North',
            country_of_origin: 'USA',
            traceability: 'Fully Traceable',
            ethical_audit: 'Passed',
            carbon_footprint: 'Minimal',
            msrp_display: '48.00',
            composition: '100% Organic Cotton',
            finish: 'Soft Hand / Holographic Foil',
            care_instructions: 'Machine wash cold, inside out.',
            prop65_status: 'Compliant',
            trademark_notes: 'Update® Registered',
            safety_testing: 'Certified',
            warranty_info: 'Lifetime against defects',
            contact_info: 'support@update.store',
            media_primary_url: 'https://storage.googleapis.com/tsgabrielle-media-prod/images/Products/1/prism-tee-white.png',
        },
        {
            peach_number: 1002,
            title: 'SHIFT HOODIE',
            subtitle: 'ORGANIC COMFORT',
            tagline: 'The ultimate transformation.',
            short_description: 'Heavyweight organic French Terry hoodie with iridescent accents.',
            long_description: 'Engineered for comfort and transformation, the Shift Hoodie features a relaxed fit and subtle holographic branding.',
            base_sku: 'UPD-SHIFT-HDD-P',
            base_mpn: 'UPD002',
            product_type: 'Apparel',
            catalogue_category: 'Hoodies',
            catalogue_collection: 'Update Essentials',
            google_category_id: '212',
            google_category_name: 'Apparel & Accessories > Clothing > Outerwear',
            status: 'active',
            seo_meta_title: 'Shift Hoodie | Update Store',
            seo_meta_description: 'Luxury organic hoodie with holographic details.',
            hs_code_primary: '6110.20',
            shipping_tier: 'Standard',
            lead_time: '3-5 days',
            warehouse_zone: 'North',
            country_of_origin: 'USA',
            traceability: 'Fully Traceable',
            ethical_audit: 'Passed',
            carbon_footprint: 'Minimal',
            msrp_display: '84.00',
            composition: '100% Organic French Terry',
            finish: 'Brushed Interior / Holographic Print',
            care_instructions: 'Machine wash cold, tumble dry low.',
            prop65_status: 'Compliant',
            trademark_notes: 'Update® Registered',
            safety_testing: 'Certified',
            warranty_info: 'Lifetime against defects',
            contact_info: 'support@update.store',
            media_primary_url: 'https://storage.googleapis.com/tsgabrielle-media-prod/images/Products/1/shift-hoodie-purple.png',
        },
        {
            peach_number: 1003,
            title: 'SPECTRUM CAP',
            subtitle: 'REFLECTIVE ACCESSORY',
            tagline: 'Wear the light.',
            short_description: 'Structured 6-panel cap with full spectrum iridescence.',
            long_description: 'The Spectrum Cap reflects every angle of your shift. Made from recycled materials with a premium holographic finish.',
            base_sku: 'UPD-SPEC-CAP-I',
            base_mpn: 'UPD003',
            product_type: 'Accessories',
            catalogue_category: 'Headwear',
            catalogue_collection: 'Update Essentials',
            google_category_id: '166',
            google_category_name: 'Apparel & Accessories > Clothing Accessories > Hats',
            status: 'active',
            seo_meta_title: 'Spectrum Cap | Update Store',
            seo_meta_description: 'Holographic reflective cap from Update.',
            hs_code_primary: '6505.00',
            shipping_tier: 'Small',
            lead_time: '2-3 days',
            warehouse_zone: 'East',
            country_of_origin: 'USA',
            traceability: 'Fully Traceable',
            ethical_audit: 'Passed',
            carbon_footprint: 'Minimal',
            msrp_display: '32.00',
            composition: '100% Recycled Polyester',
            finish: 'Iridescent Reflective',
            care_instructions: 'Spot clean only.',
            prop65_status: 'Compliant',
            trademark_notes: 'Update® Registered',
            safety_testing: 'Certified',
            warranty_info: '1 year warranty',
            contact_info: 'support@update.store',
            media_primary_url: 'https://storage.googleapis.com/tsgabrielle-media-prod/images/Products/1/spectrum-cap.png',
        }
    ];

    for (const product of products) {
        await prisma.product.upsert({
            where: { peach_number: product.peach_number },
            update: product,
            create: product,
        });
    }

    console.log('Update Seed Successful: 3 products added.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
