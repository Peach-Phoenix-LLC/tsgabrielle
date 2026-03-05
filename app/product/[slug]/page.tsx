import { notFound } from "next/navigation";
import ProductClientView from "@/components/product/ProductClientView";
import { buildMetadata } from "@/lib/seo";
import { getProductBySlug, getVariantsByProductId, getProductImages } from "@/lib/store";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return buildMetadata({ title: "Product", description: "Product page" });
  return buildMetadata({
    title: `${product.title} | tsgabrielle`,
    description: product.description,
    path: `/product/${slug}`
  });
}

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  let product = null;
  let variants: any[] = [];
  let images: any[] = [];
  
  try {
    product = await getProductBySlug(slug);
    if (product) {
      const [vRes, iRes] = await Promise.all([
        getVariantsByProductId(product.id),
        getProductImages(product.id)
      ]);
      variants = vRes;
      images = iRes;
    }
  } catch (error) {
    console.error("Error fetching product data:", error);
  }

  if (!product) notFound();

  return <ProductClientView product={product} variants={variants} images={images} />;
}

