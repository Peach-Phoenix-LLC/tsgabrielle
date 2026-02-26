import { notFound } from "next/navigation";
import { STORIES, DEFAULT_STORY } from "@/lib/collection-data";
import { getProductsByCollection, toPublicProduct } from "@/lib/products";
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
        title: `${title} | Collection | tsgabrielle®`,
        description: `Explore the ${title} collection by tsgabrielle®.`,
    };
}

export async function generateStaticParams() {
    try {
        if (!process.env.DATABASE_URL) return [];
        const products = await prisma.product.findMany({
            where: { status: "active" },
            select: { catalogue_collection: true }
        });

        const slugs = new Set<string>();
        products.forEach(p => {
            if (p.catalogue_collection) {
                // Normalize slug: lowercase and hyphenated
                const slug = p.catalogue_collection.toLowerCase().replace(/ /g, '-').replace('collection-', '');
                slugs.add(slug);
            }
        });

        return Array.from(slugs).map(slug => ({ slug }));
    } catch (e) {
        console.warn("Static generation failed:", e);
        return [];
    }
}

export default async function CollectionPage({ params }: PageProps) {
    const { slug } = await params;

    // 1. Get products for this collection
    // Note: We might need to handle the mapping between URL slug and database collection name
    // e.g. "paris" -> "Collection Paris"
    const collectionName = slug.charAt(0).toUpperCase() + slug.slice(1);
    const rawProducts = await getProductsByCollection(collectionName);

    if (rawProducts.length === 0 && !STORIES[slug]) {
        // Only 404 if no products AND no custom story exists
        notFound();
    }

    const products = rawProducts.map(toPublicProduct);
    const story = STORIES[slug] || DEFAULT_STORY(slug);

    return (
        <CollectionTemplate
            slug={slug}
            type="collection"
            story={story}
            products={products as any}
        />
    );
}
