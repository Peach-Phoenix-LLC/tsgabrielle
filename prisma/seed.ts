import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    // Clear existing data to avoid conflicts on re-run
    await prisma.gallerySlide.deleteMany();
    await prisma.productPillar.deleteMany();
    await prisma.productVariant.deleteMany();
    await prisma.productMetafield.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.wishlistItem.deleteMany();
    await prisma.product.deleteMany();

    const product1 = await prisma.product.create({
        data: {
            peach_number: 1,
            title: "Eiffel Tower Black Glossy Mug",
            subtitle: "Collection Paris",
            tagline: "Elegance in Every Sip",
            brand: "tsgabrielle®",
            short_description: "A love letter to Paris in ceramic form...",
            long_description: `Capture the timeless allure of the City of Light with every morning ritual. Our Eiffel Tower Black Glossy Mug isn't just a vessel; it's a piece of Parisian soul meticulously crafted for those who find beauty in the minimalist.

      The deep, obsidian glaze reflects the midnight Seine, while the minimalist Eiffel Tower silhouette stands as a beacon of artistic expression. Crafted from premium food-safe ceramic, this piece balances substantial weight with a refined ergonomic handle, ensuring your café au lait feels as luxurious as it tastes.

      Whether you're in a Phoenix high-rise or a Parisian studio, let tsgabrielle® bring a touch of the French avant-garde to your desk.`,
            base_sku: "TSG-MUG-ETB-001",
            base_mpn: "MPN-TSG-ETB-001",
            product_type: "Ceramic Mug — Drinkware",
            catalogue_category: "Home & Living > Kitchen & Dining > Drinkware",
            catalogue_collection: "Collection Paris",
            google_category_id: "2077",
            google_category_name: "Kitchen & Dining > Food & Beverage Carriers > Mugs",
            seo_meta_title: "Eiffel Tower Black Mug — tsgabrielle® Paris",
            seo_meta_description: "Sip in Parisian style. tsgabrielle® Eiffel Tower Black Glossy Mug blends luxury minimalism with the soul of Paris. Premium ceramic, microwave & dishwasher safe.",
            seo_tags: ["Paris", "Eiffel Tower", "Black Mug", "Luxury Mug", "Minimalist Design", "tsgabrielle", "Parisian Style", "Ceramic Art", "Gift for Her", "Gift for Him", "Coffee Culture", "Artistic Drinkware", "Glossy Finish", "Home Decor", "Paris Decor", "French Design", "Designer Mug", "Premium Ceramic", "Morning Ritual", "Kitchen Essentials", "Atelier Experience", "Chic Interior", "Modern Living", "Traveler Gift", "Wanderlust", "Souvenir Paris", "Office Decor", "Desk Accessory", "Interior Styling", "Boutique Gift", "Exclusive Collection", "Limited Edition", "Craftsmanship", "Sustainability", "Ethical Production", "Parisian Chic", "Luxury Lifestyle", "Sip in Style", "Elegant Gift", "Sophisticated Design", "Timeless Piece", "Artisan Made", "High-End Kitchen", "Gourmet Coffee", "Tea Lover", "French Luxury", "Iconic Landmark", "Monochrome", "Obsidian Black", "Noir Art"],
            hs_code_primary: "6912.00 — Ceramic tableware, other than porcelain",
            shipping_tier: "Standard Parcel — Non-Fragile Packed",
            lead_time: "2–5 business days (print-on-demand production)",
            warehouse_zone: "US / EU Printful / Printify Fulfillment Network",
            country_of_origin: "USA/Latvia (Global Fulfillment)",
            certifications: ["Food Safe", "FDA Compliant", "Lead-Free"],
            traceability: "Fulfillment path tracked from hub to doorstep",
            ethical_audit: "Third-party labor & environmental audits conducted annually",
            carbon_footprint: "Neutral through local fulfillment proximity",
            msrp_display: "$18.99 – $21.99",
            composition: "High-grade food-safe ceramic with glossy exterior glaze",
            finish: "Glossy Obsidian",
            care_instructions: "Microwave safe · Dishwasher safe · No abrasive cleaners",
            prop65_status: "Not required — ceramic compound meets US/EU thresholds",
            trademark_notes: "tsgabrielle® is a registered trademark of Peach Phoenix, LLC.",
            safety_testing: "SGS laboratory tested for thermal shock & lead content",
            warranty_info: "2-Year Legal Warranty (EU)",
            contact_info: "contact@tsgabrielle.us · 1801 E Camelback Rd, Suite 102, Phoenix AZ 85016",
            media_primary_url: "/images/products/paris-mug-1.png",
            status: "active",
            variants: {
                create: [
                    {
                        size_label: "11 oz / 325 ml",
                        color: "Black",
                        variant_sku: "TSG-MUG-ETB-11",
                        variant_mpn: "MPN-ETB-11",
                        height: "3.85\"/9.8cm",
                        diameter: "3.35\"/8.5cm",
                        msrp: "$18.99",
                        sort_order: 1
                    },
                    {
                        size_label: "15 oz / 443 ml",
                        color: "Black",
                        variant_sku: "TSG-MUG-ETB-15",
                        variant_mpn: "MPN-ETB-15",
                        height: "4.7\"/12cm",
                        diameter: "3.35\"/8.5cm",
                        msrp: "$21.99",
                        sort_order: 2
                    }
                ]
            },
            pillars: {
                create: [
                    { sort_order: 1, title: "Parisian Grace", body: "Every curve and contour is a homage to the architectural mastery of Paris." },
                    { sort_order: 2, title: "Obsidian Depth", body: "A high-gloss finish that captures light and shadow with cinematic intensity." },
                    { sort_order: 3, title: "Ergonomic Art", body: "Designed for a perfect grip, balancing weight and comfort effortlessly." },
                    { sort_order: 4, title: "Enduring Quality", body: "Crafted to withstand the test of time, microwave, and dishwasher usage." },
                    { sort_order: 5, title: "Global Expression", body: "A universal symbol of love and light, shipped with care from our global network." }
                ]
            },
            gallery_slides: {
                create: [
                    { sort_order: 1, label: "Campaign — Morning Ritual", caption: "Dawn in the Atelier", sub_caption: "Starting the day with intent and elegance.", accent_color: "#a932bd", bg_gradient: "linear-gradient(135deg, #0f0f0f 0%, #2a2a2a 100%)" },
                    { sort_order: 2, label: "Detail — Glossy Finish", caption: "The Obsidian Mirror", sub_caption: "A deep, reflective surface that defines luxury.", accent_color: "#ffffff", bg_gradient: "linear-gradient(135deg, #1a1a1a 0%, #3a3a3a 100%)" },
                    { sort_order: 3, label: "Life — Parisian Vibe", caption: "At Home in Paris", sub_caption: "Seamlessly blending into the most refined interiors.", accent_color: "#e7e7e7", bg_gradient: "linear-gradient(135deg, #2a2a2a 0%, #111111 100%)" },
                    { sort_order: 4, label: "Process — Craftsmanship", caption: "Baked Perfection", sub_caption: "High-fire ceramic built for a lifetime of sips.", accent_color: "#a932bd", bg_gradient: "linear-gradient(135deg, #000000 0%, #333333 100%)" },
                    { sort_order: 5, label: "Vision — tsgabrielle®", caption: "Beyond Drinkware", sub_caption: "An artifact of style for the modern collector.", accent_color: "#ffffff", bg_gradient: "linear-gradient(135deg, #1a1a1a 0%, #000000 100%)" }
                ]
            },
            metafields: {
                create: [
                    { key: "Material", value: "Premium Ceramic", is_public: true },
                    { key: "Finish", value: "High-Gloss Obsidian", is_public: true },
                    { key: "Volume", value: "11oz or 15oz", is_public: true }
                ]
            }
        }
    })

    console.log({ product1 })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
