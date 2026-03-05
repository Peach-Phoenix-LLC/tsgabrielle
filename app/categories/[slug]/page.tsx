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

  const title = content.seo_title || `${category.name} | tsgabrielle`;
  const description = content.seo_description || category.description || `Explore our exclusive ${category.name} selection at tsgabrielle.`;
  const keywords = content.keywords ? content.keywords.split(',').map(k => k.trim()) : undefined;
  
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

  // Use dynamic description from page_content if available
  const displayDescription = content.description || category.description;

  // Fallback to menu image if the DB doesn't have a hero image mapping
  const menuLookup = CATEGORIES.find(
    c => c.href === `/${resolvedParams.slug}` || c.href === `/categories/${resolvedParams.slug}`
  );
  
  const heroImage = content.hero_image || category.hero_image || menuLookup?.image || undefined;

  return (
    <div className="bg-[#f9f9f9] min-h-screen">
      <CollectionHero imageUrl={heroImage} alt={category.name} />
      <CollectionHeader title={category.name} description={displayDescription} />
      <CollectionPageClient 
        initialProducts={products} 
        categories={categories} 
      />
    </div>
  );
}
