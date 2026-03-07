import { notFound } from "next/navigation";
import CollectionHero from "@/components/collection/CollectionHero";
import CollectionHeader from "@/components/collection/CollectionHeader";
import CollectionPageClient from "@/components/collection/CollectionPageClient";
import { getCollectionBySlug, getProductsByCollectionSlug, getCategories } from "@/lib/store";
import { buildMetadata } from "@/lib/seo";
import { COLLECTIONS } from "@/lib/menu";

// Add dynamic params as this is an ecommerce site, slug could change or be new
export const dynamicParams = true;
export const dynamic = "force-dynamic";

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
    title: collection.meta_title ?? `${collection.name} | tsgabrielle`,
    description: collection.meta_description ?? collection.description ?? "Explore this exclusive collection at tsgabrielle.",
    path: `/collections/${resolvedParams.slug}`,
    keywords: collection.seo_tags ?? undefined,
  });
}

export default async function CollectionPage({ params }: PageProps) {
  const resolvedParams = await params;
  
  let collection: any = null;
  let products: any[] = [];
  let categories: any[] = [];
  
  try {
    const [collRes, prodRes, catsRes] = await Promise.all([
      getCollectionBySlug(resolvedParams.slug),
      getProductsByCollectionSlug(resolvedParams.slug),
      getCategories(),
    ]);
    collection = collRes;
    products = prodRes;
    categories = catsRes;
  } catch (error) {
    console.error("Error fetching collection data:", error);
  }

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
      <CollectionHeader
        title={collection.name}
        description={collection.description}
        shortDescription={collection.short_description}
        slogans={collection.slogans}
      />
      <CollectionPageClient 
        initialProducts={products} 
        categories={categories} 
      />
    </div>
  );
}
