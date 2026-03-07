import { notFound } from "next/navigation";
import CollectionHero from "@/components/collection/CollectionHero";
import CollectionHeader from "@/components/collection/CollectionHeader";
import CollectionPageClient from "@/components/collection/CollectionPageClient";
import { getCategoryBySlug, getProductsByCategorySlug, getCategories } from "@/lib/store";
import { buildMetadata } from "@/lib/seo";
import { CATEGORIES } from "@/lib/menu";
import { getPageContent } from "@/lib/content";

// ... existing dynamic settings ...
export const dynamicParams = true;
export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const pagePath = `/categories/${resolvedParams.slug}`;
  
  const [category, content] = await Promise.all([
    getCategoryBySlug(resolvedParams.slug),
    getPageContent(pagePath)
  ]);

  if (!category) {
    return buildMetadata({ 
      title: "Category Not Found", 
      description: "" 
    });
  }

  const title = category.seo_title || content.seo_title || `${category.name} | tsgabrielle`;
  const description =
    category.seo_description ||
    content.seo_description ||
    category.description ||
    `Explore our exclusive ${category.name} selection at tsgabrielle.`;
  const keywords = Array.isArray(category.tags) && category.tags.length > 0
    ? category.tags
    : content.keywords
      ? content.keywords.split(",").map(k => k.trim())
      : undefined;
  
  return buildMetadata({
    title,
    description,
    keywords,
    path: pagePath,
  });
}

export default async function CategoryPage({ params }: PageProps) {
  const resolvedParams = await params;
  const pagePath = `/categories/${resolvedParams.slug}`;
  
  let category: any = null;
  let products: any[] = [];
  let categories: any[] = [];
  let content: any = {};
  
  try {
    const [catRes, prodRes, catsRes, contentRes] = await Promise.all([
      getCategoryBySlug(resolvedParams.slug),
      getProductsByCategorySlug(resolvedParams.slug),
      getCategories(),
      getPageContent(pagePath)
    ]);
    category = catRes;
    products = prodRes;
    categories = catsRes;
    content = contentRes;
  } catch (error) {
    console.error("Error fetching category data:", error);
  }

  if (!category) {
    return notFound();
  }

  const displayDescription = category.description || content.description;

  // Fallback to menu image if the DB doesn't have a hero image mapping
  const menuLookup = CATEGORIES.find(
    c => c.href === `/${resolvedParams.slug}` || c.href === `/categories/${resolvedParams.slug}`
  );
  
  const heroImages = [category.hero_image_1, category.hero_image_2, category.hero_image_3].filter(Boolean);
  const heroImage = heroImages[0] || content.hero_image || category.hero_image || menuLookup?.image || undefined;
  const heroDescriptions = [
    category.hero_description_1,
    category.hero_description_2,
    category.hero_description_3,
  ].filter(Boolean);
  const backgroundColor = category.background_color || "#f9f9f9";
  const textColor = category.text_color || "#111111";

  return (
    <div className="min-h-screen" style={{ backgroundColor }}>
      <CollectionHero
        imageUrl={heroImage}
        alt={category.title || category.name}
        overlayColor={category.hero_overlay_color || "rgba(0,0,0,0.1)"}
        descriptions={heroDescriptions}
      />
      <CollectionHeader
        title={category.title || category.name}
        subtitle={category.subtitle}
        description={displayDescription}
        textColor={textColor}
      />
      <CollectionPageClient 
        initialProducts={products} 
        categories={categories} 
        gridTheme={{
          backgroundColor: category.product_grid_background_color || "#ffffff",
          textColor: category.product_grid_text_color || textColor,
          accentColor: category.product_grid_accent_color || "#a932bd",
        }}
      />
    </div>
  );
}
