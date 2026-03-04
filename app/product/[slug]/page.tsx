import { notFound } from "next/navigation";
import { AddToCart } from "@/components/product/AddToCart";
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

  return (
    <div className="bg-white pb-24">
      <section className="container-luxe py-12 md:py-24">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-start">
          
          {/* Left: Image Gallery */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {images.length > 0 ? (
                images.map((img) => (
                  <div key={img.id} className="aspect-[3/4] overflow-hidden bg-[#f9f9f9]">
                    <img
                      src={img.url}
                      alt={img.alt || product.title}
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                ))
              ) : (
                <div className="aspect-[3/4] bg-[#f9f9f9] flex items-center justify-center border border-[#e7e7e7]">
                   <span className="text-xs font-light text-[#555555] tracking-widest uppercase">No Image Available</span>
                </div>
              )}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="sticky top-32 space-y-10">
            <header className="space-y-4">
              <nav className="text-[10px] tracking-widest text-[#555555] uppercase font-light">
                tsgabrielle® · Official Catalogue
              </nav>
              <h1 className="text-4xl md:text-5xl font-light tracking-wide text-[#111111] leading-tight capitalize">
                {product.title}
              </h1>
              <div className="text-2xl font-light text-[#111111]">
                ${(product.price_cents / 100).toFixed(2)}
              </div>
            </header>

            <div className="space-y-6">
              <div className="h-px w-full bg-[#e7e7e7]" />
              <div className="text-base font-light leading-relaxed text-[#555555] max-w-lg">
                <p>{product.description}</p>
              </div>
              <div className="h-px w-full bg-[#e7e7e7]" />
            </div>

            <AddToCart variants={variants} />

            <div className="pt-10 space-y-6">
              <details className="group border-b border-[#e7e7e7] pb-4 cursor-pointer">
                <summary className="flex items-center justify-between text-xs tracking-widest text-[#111111] uppercase font-light list-none">
                  Sustainable Materials
                  <span className="text-lg font-light transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="mt-4 text-sm font-light text-[#555555] leading-relaxed">
                  Every tsgabrielle piece is crafted with material innovation and liquid luxury in mind, utilizing eco-conscious blends and inclusive design patterns.
                </div>
              </details>
              
              <details className="group border-b border-[#e7e7e7] pb-4 cursor-pointer">
                <summary className="flex items-center justify-between text-xs tracking-widest text-[#111111] uppercase font-light list-none">
                  Shipping & Returns
                  <span className="text-lg font-light transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="mt-4 text-sm font-light text-[#555555] leading-relaxed">
                  Complimentary global delivery on all orders. Returns are accepted within 30 days of receipt for items in their original, ethereal condition.
                </div>
              </details>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
