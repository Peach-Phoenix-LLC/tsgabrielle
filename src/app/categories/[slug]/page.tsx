import { notFound } from "next/navigation";
import { STORIES, DEFAULT_STORY } from "@/lib/collection-data";
import { getProductsByCategory, toPublicProduct } from "@/lib/products";
import CollectionTemplate from "@/components/Collection/CollectionTemplate";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const title = slug.charAt(0).toUpperCase() + slug.slice(1);
    return {
        title: `${title} | Category | tsgabrielle®`,
        description: `Explore ${title} pieces in our curated catalog.`,
    };
}

export async function generateStaticParams() {
    try {
        if (!process.env.DATABASE_URL) return [];
        const products = await prisma.product.findMany({
            where: { status: "active" },
            select: { catalogue_category: true }
        });

        const slugs = new Set<string>();
        products.forEach(p => {
            if (p.catalogue_category) {
                slugs.add(p.catalogue_category.toLowerCase());
            }
        });

        return Array.from(slugs).map(slug => ({ slug }));
    } catch (e) {
        console.warn("Static generation failed:", e);
        return [];
    }
}

export default async function CategoryPage({ params }: PageProps) {
    const { slug } = await params;

    const rawProducts = await getProductsByCategory(slug);

    if (rawProducts.length === 0 && !STORIES[slug]) {
        notFound();
    }

    const products = rawProducts.map(toPublicProduct);
    const story = STORIES[slug] || DEFAULT_STORY(slug);

    return (
        <CollectionTemplate
            slug={slug}
            type="category"
            story={story}
            products={products as any}
        />
    );
}
