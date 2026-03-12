import { notFound } from "next/navigation";
import { 
  getCategoryBySlug, 
  getCollectionBySlug, 
  getProductBySlug,
  getProductsByCategorySlug,
  getProductsByCollectionSlug,
  getCategories,
  getVariantsByProductId,
  getProductImages
} from "@/lib/store";
import { buildMetadata } from "@/lib/seo";
import CategoryPage from "@/app/categories/[slug]/page";
import CollectionPage from "@/app/collections/[slug]/page";
import ProductPage from "@/app/product/[slug]/page";

// Next.js 15+ params are Promises
type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  // Try Category
  const category = await getCategoryBySlug(slug);
  if (category) {
    return buildMetadata({
      title: category.seo_title || `${category.name} | tsgabrielle®`,
      description: category.seo_description || category.description || `Shop ${category.name}`,
      path: `/${slug}`
    });
  }

  // Try Collection
  const collection = await getCollectionBySlug(slug);
  if (collection) {
    return buildMetadata({
      title: collection.meta_title || `${collection.name} | tsgabrielle®`,
      description: collection.meta_description || collection.description || `Explore ${collection.name} collection`,
      path: `/${slug}`
    });
  }

  // Try Product
  const product = await getProductBySlug(slug);
  if (product) {
    return buildMetadata({
      title: `${product.title} | tsgabrielle®`,
      description: product.description,
      path: `/${slug}`
    });
  }

  return buildMetadata({ title: "Not Found", description: "" });
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ShortUrlResolverPage(props: PageProps) {
  const { slug } = await props.params;

  // 1. Check if it's a Category
  const category = await getCategoryBySlug(slug);
  if (category) {
    return <CategoryPage {...props} />;
  }

  // 2. Check if it's a Collection
  const collection = await getCollectionBySlug(slug);
  if (collection) {
    return <CollectionPage {...props} />;
  }

  // 3. Check if it's a Product
  const product = await getProductBySlug(slug);
  if (product) {
    return <ProductPage {...props} />;
  }

  // 4. If none of the above, 404
  return notFound();
}
