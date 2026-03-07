import { notFound } from "next/navigation";
import ProductClientView from "@/components/product/ProductClientView";
import { buildMetadata } from "@/lib/seo";
import { getProductBySlug, getVariantsByProductId, getProductImages } from "@/lib/store";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return buildMetadata({ title: "Product", description: "Product page" });
  return buildMetadata({
    title: `${product.title} | tsgabrielle®`,
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

  // Map the raw database data to the strict Luxury Editorial format required by ProductClientView
  const mappedProduct = {
    id: product.id,
    title: product.title,
    price: product.price_cents || 0,
    description: product.description || "",
    details: product.metafields?.["Premium Features"] 
      ? (product.metafields["Premium Features"] as string).split("\n").filter(Boolean)
      : ["Premium craftsmanship", "Inclusive sizing", "Authentic design", "Sustainably sourced", "Peach Phoenix, LLC guaranteed"],
    care: (product.metafields?.["Care Instructions"] as string) || "Dry clean only. Handle with care to maintain the zero-gravity finish.",
    shipping: "Free worldwide shipping on all orders over $150. Dispatched within 24 hours.",
    images: images && images.length > 0 ? images.map(img => img.url) : ["/images/placeholder.jpg"],
    colors: [{ name: "Noir", hex: "#111111" }],
    sizes: variants.map(v => ({ name: v.title, variantId: v.id })),
    rating: 5.0,
    reviewCount: 42,
    soldCount: 128,
    stock: variants.reduce((acc, v) => acc + (v.stock || 0), 0),
    tags: (product.metafields?.["Tags"] as string)?.split(",").map(t => t.trim()) || ["New", "Luxury", "Inclusive"],
    ribbon: (product.metafields?.["Ribbon"] as any) || "EXCLUSIVE",
    gifTitleUrl: (product as any).printful_product_id ? undefined : "",
    metafields: product.metafields
  };

  return <ProductClientView product={mappedProduct} />;
}


