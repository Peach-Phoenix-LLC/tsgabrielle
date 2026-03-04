import { notFound } from "next/navigation";
import { ProductClientView } from "@/components/product/ProductClientView";
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

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  
  const [variants, images] = await Promise.all([
    getVariantsByProductId(product.id),
    getProductImages(product.id)
  ]);

  return <ProductClientView product={product} variants={variants} images={images} />;
}

