import { notFound } from "next/navigation";
import CollectionHero from "@/components/collection/CollectionHero";
import CollectionHeader from "@/components/collection/CollectionHeader";
import CollectionPageClient from "@/components/collection/CollectionPageClient";
import { getCategoryBySlug, getProductsByCategorySlug, getCategories } from "@/lib/store";
import { buildMetadata } from "@/lib/seo";
import { CATEGORIES } from "@/lib/menu";

// Add dynamic params as this is an ecommerce site, slug could change or be new
export const dynamicParams = true;
export const dynamic = "force-dynamic";

// Define params type explicitly for Next.js 15+ constraints (params is a Promise)
type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const category = await getCategoryBySlug(resolvedParams.slug);

  if (!category) {
    return buildMetadata({ 
      title: "Category Not Found", 
      description: "" 
    });
  }
  
  return buildMetadata({
    title: `${category.name} | tsgabrielle`,
    description: category.description ?? `Explore our exclusive ${category.name} selection at tsgabrielle.`,
    path: `/categories/${resolvedParams.slug}`,
  });
}

export default async function CategoryPage({ params }: PageProps) {
  const resolvedParams = await params;
  
  let category: any = null;
  let products: any[] = [];
  let categories: any[] = [];
  
  try {
    const [catRes, prodRes, catsRes] = await Promise.all([
      getCategoryBySlug(resolvedParams.slug),
      getProductsByCategorySlug(resolvedParams.slug),
      getCategories(),
    ]);
    category = catRes;
    products = prodRes;
    categories = catsRes;
  } catch (error) {
    console.error("Error fetching category data:", error);
  }

  if (!category) {
    return notFound();
  }

  // Fallback to menu image if the DB doesn't have a hero image mapping
  const menuLookup = CATEGORIES.find(
    c => c.href === `/${resolvedParams.slug}` || c.href === `/categories/${resolvedParams.slug}`
  );
  
  // Choose image: we assume hero_image is on the category object, or fallback to menu.ts image
  const heroImage = category.hero_image || menuLookup?.image || undefined;

  return (
    <div className="bg-[#f9f9f9] min-h-screen">
      <CollectionHero imageUrl={heroImage} alt={category.name} />
      <CollectionHeader title={category.name} description={category.description} />
      <CollectionPageClient 
        initialProducts={products} 
        categories={categories} 
      />
    </div>
  );
}
