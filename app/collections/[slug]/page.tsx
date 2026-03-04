import { notFound } from "next/navigation";
import CollectionHero from "@/components/collection/CollectionHero";
import CollectionHeader from "@/components/collection/CollectionHeader";
import CollectionPageClient from "@/components/collection/CollectionPageClient";
import { getCollectionBySlug, getProductsByCollectionSlug, getCategories } from "@/lib/store";
import { buildMetadata } from "@/lib/seo";
import { COLLECTIONS } from "@/lib/menu";

// Add dynamic params as this is an ecommerce site, slug could change or be new
export const dynamicParams = true;

// Define params type explicitly for Next.js 15+ constraints (params is a Promise)
type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const collection = await getCollectionBySlug(resolvedParams.slug);

  if (!collection) {
    return buildMetadata({ 
      title: "Collection Not Found", 
      description: "" 
    });
  }
  
  return buildMetadata({
    title: `${collection.name} | tsgabrielle`,
    description: collection.description ?? "Explore this exclusive collection at tsgabrielle.",
    path: `/collections/${resolvedParams.slug}`,
  });
}

export default async function CollectionPage({ params }: PageProps) {
  const resolvedParams = await params;
  const [collection, products, categories] = await Promise.all([
    getCollectionBySlug(resolvedParams.slug),
    getProductsByCollectionSlug(resolvedParams.slug),
    getCategories(),
  ]);

  if (!collection) {
    return notFound();
  }

  // Fallback to menu image if the DB doesn't have a hero image mapping
  const menuLookup = COLLECTIONS.find(
    c => c.href === `/${resolvedParams.slug}` || c.href === `/collections/${resolvedParams.slug}`
  );
  
  // Choose image: we assume hero_image is on the collection object, or fallback to menu.ts image
  const heroImage = collection.hero_image || menuLookup?.image || undefined;

  return (
    <div className="bg-[#f9f9f9] min-h-screen">
      <CollectionHero imageUrl={heroImage} alt={collection.name} />
      <CollectionHeader title={collection.name} description={collection.description} />
      <CollectionPageClient 
        initialProducts={products} 
        categories={categories} 
      />
    </div>
  );
}
