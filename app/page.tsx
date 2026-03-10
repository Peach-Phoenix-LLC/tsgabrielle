import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { CATEGORIES, COLLECTIONS } from "@/lib/menu";
import { getPageContent } from "@/lib/content";

import { EditableText } from "@/components/builder/EditableText";

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
        slug,
        price_cents,
        images:product_images(url)
      `)
      .eq("active", true)
      .order("created_at", { ascending: false })
      .limit(4);
    featuredProducts = data || [];
  } catch (error) {
    console.warn("Could not fetch featured products:", error);
  }

  const displayCategories = CATEGORIES.slice(0, 9);
  const displayCollections = COLLECTIONS.slice(0, 9);

  return (
    <div className="-mt-[100px] lg:-mt-[112px]">
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
              <EditableText 
                contentKey="home_featured_subtitle" 
                initialValue={content.home_featured_subtitle || "Just In"} 
                as="p" 
                className="text-[10px] uppercase tracking-[0.3em] text-[#a932bd] font-medium mb-3 block" 
              />
              <EditableText 
                contentKey="home_featured_title" 
                initialValue={content.home_featured_title || "Exclusive 💎 New"} 
                as="h2" 
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
                <Link key={product.id} href={`/product/${product.slug}`} className="group flex flex-col gap-6">
                  <div className="aspect-[3/4] overflow-hidden bg-[#f9f9f9]">
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

      {/* Categories Section */}
      <section className="bg-[#f9f9f9] py-32 border-t border-[#e7e7e7]">
        <div className="container-luxe">
          <div className="mb-24 text-center space-y-4">
            <EditableText
              contentKey="home_categories_subtitle"
              initialValue={content.home_categories_subtitle || "Shop by Department"}
              as="p"
              className="text-[10px] uppercase tracking-[0.4em] text-[#a932bd] font-medium block"
            />
            <EditableText
              contentKey="home_categories_title"
              initialValue={content.home_categories_title || "The Elements"}
              as="h2"
              className="text-4xl md:text-5xl font-light tracking-tight text-[#111111] block capitalize"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayCategories.map((category, idx) => {
              const displayImg = category.image || heroSlides[idx % 4];
              return (
                <div key={idx} className="group flex flex-col gap-6">
                  <div className="holographic-card-border aspect-[3/4] overflow-hidden bg-[#f9f9f9] rounded-[3rem]">
                    <Image
                      src={displayImg}
                      alt={category.label}
                      fill
                      className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-col items-center gap-4 text-center">
                    <h3 className="text-xl font-light tracking-wide text-[#111111] capitalize">{category.label}</h3>
                    <div className="h-px w-8 bg-[#a932bd]/30 transition-all duration-500 group-hover:w-16 group-hover:bg-[#a932bd]" />
                    <Link href={category.href} className="btn-holographic-outline">
                      Discover
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="bg-white py-32">
        <div className="container-luxe">
          <div className="mb-20 text-center space-y-4">
             <EditableText
              contentKey="home_collections_subtitle"
              initialValue={content.home_collections_subtitle || "Curated Series"}
              as="p"
              className="text-[10px] uppercase tracking-[0.4em] text-[#a932bd] font-medium block"
            />
            <EditableText
              contentKey="home_collections_title"
              initialValue={content.home_collections_title || "The Collections"}
              as="h2"
              className="text-4xl md:text-5xl font-light tracking-tight text-[#111111] block capitalize"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayCollections.map((collection, idx) => {
              const displayImg = collection.image || heroSlides[(idx + 2) % 4];
              return (
                <div key={idx} className="group flex flex-col gap-6">
                  <div className="holographic-card-border aspect-[3/4] overflow-hidden bg-[#f9f9f9] rounded-[3rem]">
                    <Image
                      src={displayImg}
                      alt={collection.label}
                      fill
                      className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-col items-center gap-4 text-center">
                    <h3 className="text-xl font-light tracking-wide text-[#111111] capitalize">{collection.label}</h3>
                    <div className="h-px w-8 bg-[#a932bd]/30 transition-all group-hover:w-16 group-hover:bg-[#a932bd]" />
                    <Link href={collection.href} className="btn-holographic-outline">
                      Discover Series
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
