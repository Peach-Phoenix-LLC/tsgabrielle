import { notFound } from "next/navigation";
import { AddToCart } from "@/components/product/AddToCart";
import { buildMetadata } from "@/lib/seo";
import { getProductBySlug, getVariantsByProductId } from "@/lib/store";

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
  const variants = await getVariantsByProductId(product.id);

  return (
    <section className="container-luxe py-14">
      <h1 className="font-display text-4xl">{product.title}</h1>
      <p className="mt-4 max-w-2xl">{product.description}</p>
      <p className="mt-6 text-xl font-semibold">${(product.price_cents / 100).toFixed(2)}</p>
      <AddToCart variants={variants} />
    </section>
  );
}
