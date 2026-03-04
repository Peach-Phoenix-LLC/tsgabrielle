import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { CATEGORIES, COLLECTIONS } from "@/lib/menu";

// ... existing heroSlides mapping ...
const heroSlides = [
  "/images/slides/tsgabrielle-Slide1.png",
  "/images/slides/tsgabrielle-Slide2.png",
  "/images/slides/tsgabrielle-Slide3.png",
  "/images/slides/tsgabrielle-Slide4.png"
];

export const metadata = buildMetadata({
  title: "tsgabrielle® | 2026 Official Catalogue",
  description: "Official 2026 catalogue with holographic luxury collections.",
  path: "/"
});

export default async function HomePage() {
  const supabase = getSupabaseServerClient();
  
  // Fetch featured products
  const { data: featuredProducts } = await supabase
    .from("products")
    .select(`
      id,
      title,
      slug,
      price_cents,
      images:product_images(url)
    `)
    .eq("active", true)
    .limit(4);

  // We use the imported CATEGORIES and COLLECTIONS for the main grid to ensure premium imagery
  // we take up to 9 for the 3x3 grid
  const displayCategories = CATEGORIES.slice(0, 9);
  const displayCollections = COLLECTIONS.slice(0, 9);

  return (
    <div className="-mt-[100px] lg:-mt-[112px]">
      <section className="relative flex h-screen items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {heroSlides.map((src, index) => (
            <div
              key={src}
              className="absolute inset-0 bg-cover bg-center opacity-0 animate-[liquid_32s_ease-in-out_infinite]"
              style={{ backgroundImage: `url(${src})`, animationDelay: `${index * 8}s` }}
            />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-white py-32">
        <div className="container-luxe">
          <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#e7e7e7] pb-12">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#a932bd] font-medium mb-3">Selected Works</p>
              <h2 className="text-4xl md:text-6xl font-light tracking-tight text-[#111111]">The Catalogue</h2>
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
                    <img
                      src={product.images?.[0]?.url || "/images/logo-icon.png"}
                      alt={product.title}
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

      {/* Categories Section - 3x3 Grid */}
      <section className="bg-[#f9f9f9] py-32 border-t border-[#e7e7e7]">
        <div className="container-luxe">
          <div className="mb-24 text-center space-y-4">
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#a932bd] font-medium">Shop by Department</p>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-[#111111]">The Elements</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {displayCategories.map((category, idx) => {
              const displayImg = category.image || heroSlides[idx % 4];
              return (
                <div key={idx} className="group flex flex-col items-center gap-8">
                  {/* Circular Image Container */}
                  <div className="aspect-square w-full max-w-[320px] overflow-hidden rounded-full border border-[#e7e7e7] bg-white transition-all duration-700 group-hover:shadow-xl group-hover:border-[#a932bd]/20">
                    <img
                      src={displayImg}
                      alt={category.label}
                      className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Name & Button Outside */}
                  <div className="flex flex-col items-center gap-4 text-center">
                    <h3 className="text-xl font-light tracking-wide text-[#111111] uppercase">{category.label}</h3>
                    <div className="h-px w-8 bg-[#a932bd]/30 transition-all duration-500 group-hover:w-16 group-hover:bg-[#a932bd]" />
                    <Link
                      href={category.href}
                      className="inline-block border border-[#111111] px-8 py-3 text-[9px] uppercase tracking-[0.2em] font-medium transition-all hover:bg-[#111111] hover:text-white"
                    >
                      Discover
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Collections Section - 3x3 Grid */}
      <section className="bg-white py-32">
        <div className="container-luxe">
          <div className="mb-20 text-center space-y-4">
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#a932bd] font-medium">Curated Series</p>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-[#111111]">The Collections</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayCollections.map((collection, idx) => {
              const displayImg = collection.image || heroSlides[(idx + 2) % 4];
              return (
                <div key={idx} className="group flex flex-col gap-6">
                  <div className="aspect-[3/4] overflow-hidden bg-[#f9f9f9] border border-[#e7e7e7] rounded-[3rem] transition-all duration-700 group-hover:shadow-xl group-hover:border-[#a932bd]/20">
                    <img
                      src={displayImg}
                      alt={collection.label}
                      className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <h3 className="text-xl font-light tracking-wide text-[#111111] uppercase">{collection.label}</h3>
                    <div className="h-px w-8 bg-[#a932bd]/30 transition-all group-hover:w-16 group-hover:bg-[#a932bd]" />
                    <Link
                      href={collection.href}
                      className="inline-block border border-[#111111] px-8 py-3 text-[9px] uppercase tracking-[0.2em] font-medium transition-all hover:bg-[#111111] hover:text-white"
                    >
                      Discover Series
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Visual Identity Section */}
      <section className="bg-[#f9f9f9] py-32 border-t border-[#e7e7e7]">
        <div className="container-luxe text-center max-w-3xl">
          <h2 className="text-3xl font-light tracking-[0.2em] text-[#111111] uppercase mb-10">Ethereal Craftsmanship</h2>
          <p className="text-lg font-light leading-relaxed text-[#555555]">
             Defining the next era of high-end aesthetics through material innovation and liquid luxury. tsgabrielle® 2026 presents a curated selection of inclusive products designed for the contemporary global citizen.
          </p>
          <div className="mt-16 flex justify-center gap-12">
             <div className="h-px w-16 bg-[#a932bd]/40" />
             <div className="h-px w-16 bg-[#a932bd]" />
             <div className="h-px w-16 bg-[#a932bd]/40" />
          </div>
        </div>
      </section>
    </div>
  );
}


