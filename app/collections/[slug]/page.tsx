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
  
  const isParis = resolvedParams.slug === "paris";
  const seoTitle = isParis ? "Paris Collection • tsgabrielle®" : (collection.seo_title || `${collection.name} | tsgabrielle`);
  const seoDesc = isParis ? "Discover Paris by tsgabrielle® — a luxury streetwear collection blending French elegance, identity, and modern design. The French Trans Touch™ at its finest." : (collection.seo_description || collection.description || "Explore this exclusive collection at tsgabrielle.");

  return buildMetadata({
    title: collection.meta_title ?? `${collection.name} | tsgabrielle`,
    description: collection.meta_description ?? collection.description ?? "Explore this exclusive collection at tsgabrielle.",
    path: `/collections/${resolvedParams.slug}`,
    keywords: collection.seo_tags ?? undefined,
    title: seoTitle,
    description: seoDesc,
    path: `/collections/${resolvedParams.slug}`,
    keywords: collection.tags || []
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
  const isParis = resolvedParams.slug === "paris";
  const parisSlogans = [
    "Paris. Reimagined by The French Trans Touch™.",
    "Elegance, unboxed with an edge.",
    "Born in Paris. Defined by you.",
    "Luxury that whispers in lower-case.",
    "Where couture finds its courage.",
    "Purple-powered Parisian attitude.",
    "The city of light, brilliantly rewritten."
  ];

  const heroDescriptions = isParis 
    ? parisSlogans 
    : (collection.slogans?.length 
        ? collection.slogans 
        : [collection.hero_description_1, collection.hero_description_2, collection.hero_description_3].filter(Boolean));
  const backgroundColor = collection.background_color || "#f9f9f9";
  const textColor = collection.text_color || "#111111";

  return (
    <div className="bg-[#f9f9f9] min-h-screen">
      <CollectionHero imageUrl={heroImage} alt={collection.name} />
      <CollectionHeader
        title={collection.name}
        description={collection.description}
        shortDescription={collection.short_description}
        slogans={collection.slogans}
    <div className="min-h-screen" style={{ backgroundColor }}>
      <CollectionHero
        imageUrl={heroImage}
        alt={collection.title || collection.name}
        overlayColor={collection.hero_overlay_color || "rgba(0,0,0,0.1)"}
        descriptions={heroDescriptions}
      />
      <CollectionHeader
        title={collection.title || collection.name}
        subtitle={collection.subtitle}
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
