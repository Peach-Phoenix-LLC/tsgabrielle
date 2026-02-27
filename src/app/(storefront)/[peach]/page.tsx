import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getProductByPeach, toPublicProduct } from "@/lib/products";
import Gallery from "@/components/Product/Gallery";
import { BrandBar } from "@/components/Product/BrandBar";
import { TabNav } from "@/components/Product/TabNav";
import { SectionProduct } from "@/components/Product/sections/SectionProduct";
import { SectionIdentifiers } from "@/components/Product/sections/SectionIdentifiers";
import { SectionDetails } from "@/components/Product/sections/SectionDetails";
import { SectionLogistics } from "@/components/Product/sections/SectionLogistics";
import { SectionCompliance } from "@/components/Product/sections/SectionCompliance";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // ISR - revalidate every hour

interface PageProps {
    params: Promise<{ peach: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { peach } = await params;
    const product = await getProductByPeach(peach);
    if (!product) return {};

    return {
        title: product.seo_meta_title,
        description: product.seo_meta_description,
        openGraph: {
            title: product.seo_meta_title,
            description: product.seo_meta_description,
            images: product.media_primary_url ? [{ url: product.media_primary_url }] : [],
            type: 'website',
            url: `https://tsgabrielle.us/${peach}`,
        },
        alternates: {
            canonical: `https://tsgabrielle.us/${peach}`,
        },
        keywords: product.seo_tags,
    };
}

export async function generateStaticParams() {
    try {
        if (!process.env.DATABASE_URL) return [];
        const products = await prisma.product.findMany({
            where: { status: "active" },
            select: { peach_number: true }
        });

        return products.map((p) => ({
            peach: p.peach_number.toString(),
        }));
    } catch (e) {
        console.warn("Static generation for products failed:", e);
        return [];
    }
}

export default async function ProductPage({ params }: PageProps) {
    const { peach } = await params;

    if (!/^\d+$/.test(peach)) {
        notFound();
    }

    const rawProduct = await getProductByPeach(peach);
    if (!rawProduct) {
        notFound();
    }

    const P = toPublicProduct(rawProduct);

    return (
        <main className="bg-white text-[#1a1a1a] min-h-screen selection:bg-[#a932bd] selection:text-white pt-20">
            {/* 1. Fullscreen Gallery */}
            <Gallery slides={P.gallery_slides} />

            {/* 2. Brand Bar (Sticky Level 1) */}
            <BrandBar
                title={P.title}
                subtitle={P.subtitle}
                price={P.msrp_display}
                badges={['Limited Release', 'Atelier Exclusive']}
            />

            {/* 3. Tab Navigation (Sticky Level 2) */}
            <TabNav />

            {/* 4. Tab Sections */}
            <div className="flex flex-col bg-white">
                <SectionProduct
                    shortDesc={P.short_description}
                    longDesc={P.long_description}
                    pillars={P.pillars}
                />

                <SectionIdentifiers
                    baseSku={P.base_sku}
                    baseMpn={P.base_mpn}
                    productType={P.product_type}
                    variants={P.variants}
                />

                <div className="bg-white">
                    <SectionDetails
                        composition={P.composition}
                        finish={P.finish}
                        care={P.care_instructions}
                        metafields={P.metafields}
                    />

                    <SectionLogistics
                        shippingTier={P.shipping_tier}
                        leadTime={P.lead_time}
                        warehouse={P.warehouse_zone}
                        origin={P.country_of_origin}
                        hsCode={P.hs_code_primary}
                    />

                    <SectionCompliance
                        prop65={P.prop65_status}
                        warranty={P.warranty_info}
                        trademark={P.trademark_notes}
                        contact={P.contact_info}
                        safety={P.safety_testing}
                    />
                </div>
            </div>

            {/* Footer Spacer */}
            <div className="h-40 border-t border-black/5 bg-white flex items-center justify-center">
                <p className="text-[10px] uppercase tracking-[0.5em] opacity-40">Paris • Phoenix • tsgabrielle®</p>
            </div>
        </main>
    );
}
