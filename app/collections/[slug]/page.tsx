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
  
  const seoTitle = collection.meta_title || `${collection.name} | tsgabrielle®`;
  const seoDesc = collection.meta_description || collection.description || "Explore this exclusive collection at tsgabrielle.";

  return buildMetadata({
    title: seoTitle,
    description: seoDesc,
    path: `/collections/${resolvedParams.slug}`,
    keywords: collection.seo_tags || []
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
  
  const heroImages = [collection.hero_image_1, collection.hero_image_2, collection.hero_image_3].filter(Boolean);
  const heroImage = heroImages[0] || menuLookup?.image || undefined;

  const heroDescriptions = collection.slogans?.length 
    ? collection.slogans 
    : [collection.hero_description_1, collection.hero_description_2, collection.hero_description_3].filter(Boolean);
    
  const backgroundColor = collection.background_color || "#f9f9f9";
  const textColor = collection.text_color || "#111111";

  return (
    <div className="min-h-screen -mt-[160px] lg:-mt-[195px]" style={{ backgroundColor }}>
      <CollectionHero
        imageUrl={heroImage}
        alt={collection.meta_title || collection.name}
        overlayColor={collection.hero_overlay_color || "rgba(0,0,0,0.1)"}
        descriptions={heroDescriptions}
      />
      <CollectionHeader
        title={collection.name}
        subtitle={collection.short_description || collection.subtitle}
        description={collection.description}
        textColor={textColor}
      />
      <CollectionPageClient 
        initialProducts={products} 
        categories={categories} 
        gridTheme={{
          backgroundColor: collection.product_grid_background_color || "#ffffff",
          textColor: collection.product_grid_text_color || textColor,
          accentColor: collection.product_grid_accent_color || "#a932bd",
        }}
      />
    </div>
  );
}
