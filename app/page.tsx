import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { CATEGORIES, COLLECTIONS } from "@/lib/menu";
import { getPageContent } from "@/lib/content";

import BuilderText from "@/components/builder/BuilderText";

export const metadata = buildMetadata({
  title: "Welcome to tsgabrielle® USA • The French Trans Touch™",
  description: "Discover curated lifestyle essentials at tsgabrielle® • Shop our exclusive collections of fashion accessories, luxury beauty, home décor, and apparel for him and her.",
  keywords: [
    "tsgabrielle", "lifestyle brand", "premium fashion", "home decor", "beauty essentials", 
    "luxury accessories", "online shopping", "curated lifestyle", "fashion for him", 
    "fashion for her", "stylish hats", "modern furnishings", "lifestyle boutique", 
    "exclusive collections", "high-quality apparel", "designer lifestyle", "luxury beauty", 
    "everyday elegance", "statement pieces", "premium skincare", "chic apparel", 
    "trendy lifestyle", "home styling", "lifestyle store", "premium goods"
  ],
  path: "/"
});

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [content] = await Promise.all([
    getPageContent("/")
  ]);

  // Static hero slides as requested
  const heroSlides = [
    "/images/slides/tsgabrielle-Slide1.png",
    "/images/slides/tsgabrielle-Slide2.png",
    "/images/slides/tsgabrielle-Slide3.png",
    "/images/slides/tsgabrielle-Slide4.png"
  ];

  let featuredProducts: any[] = [];
  try {
    const supabase = getSupabaseServerClient();
    const { data } = await supabase
      .from("products")
      .select(`
        id,
        title,
        base_sku,
        msrp_display,
        media_primary_url
      `)
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(4);

    featuredProducts = (data || []).map((p: any) => ({
      id: p.id,
      title: p.title,
      slug: p.base_sku || p.id.toString(),
      price_cents: Math.round(parseFloat(p.msrp_display || "0") * 100),
      images: p.media_primary_url ? [{ url: p.media_primary_url }] : []
    }));
  } catch (error) {
    console.warn("Could not fetch featured products:", error);
  }

  return (
    <div className="-mt-[160px] lg:-mt-[195px]">
      {/* Hero Section with optimized transition */}
      <section className="relative h-screen w-full overflow-hidden bg-white">
        {heroSlides.map((src, index) => (
          <div
            key={src}
            className="absolute inset-0 opacity-0 animate-slideShowFade"
            style={{ animationDelay: `${index * 8}s` }}
          >
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              fill
              priority={index === 0}
              quality={90}
              unoptimized
              className="object-contain"
            />
          </div>
        ))}
      </section>

      {/* Featured Products */}
      <section className="bg-white py-32">
        <div className="container-luxe">
          <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#e7e7e7] pb-12">
            <div>
              <BuilderText 
                contentKey="home_featured_subtitle" 
                initialValue={content.home_featured_subtitle || "Just In"} 
                as="p" 
                className="text-[10px] uppercase tracking-[0.3em] text-[#a932bd] font-medium mb-3 block" 
              />
              <BuilderText 
                contentKey="home_featured_title" 
                initialValue={content.home_featured_title || "Exclusive 💎 New"} 
                as="h1" 
                className="text-4xl md:text-6xl font-light tracking-tight text-[#111111] block capitalize" 
              />
            </div>
            <Link href="/categories" className="text-[10px] uppercase tracking-[0.2em] text-[#555555] font-medium hover:text-[#a932bd] transition-colors">
              View All Arrivals
            </Link>
          </div>
          
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4 md:gap-8">
            {featuredProducts && featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <Link key={product.id} href={`/${product.slug}`} className="group flex flex-col gap-6">
                  <div className="aspect-[3/4] overflow-hidden bg-[#f9f9f9] relative">
                    <Image
                      src={product.images?.[0]?.url || "/images/logo-icon.png"}
                      alt={product.title}
                      fill
                      className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-light text-[#111111] group-hover:text-[#a932bd] transition-colors duration-500 line-clamp-1">{product.title}</h3>
                    <p className="text-sm font-light text-[#555555] tracking-wide">
                      ${(product.price_cents / 100).toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full py-24 text-center border border-dashed border-[#e7e7e7]">
                <p className="text-xs font-light text-[#555555] uppercase tracking-[0.3em]">Awaiting New Arrival</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
