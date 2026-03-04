import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const metadata = buildMetadata({
  title: "tsgabrielle® | 2026 Official Catalogue",
  description: "Official 2026 catalogue with holographic luxury collections.",
  path: "/"
});

const heroSlides = [
  "/images/slides/tsgabrielle-Slide1.png",
  "/images/slides/tsgabrielle-Slide2.png",
  "/images/slides/tsgabrielle-Slide3.png",
  "/images/slides/tsgabrielle-Slide4.png"
];

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

  // Fetch Categories with representative images
  const { data: categories } = await supabase
    .from("categories")
    .select(`
      id,
      name,
      slug,
      products:products(
        id,
        images:product_images(url)
      )
    `)
    .limit(9);

  // Fetch Collections with representative images
  const { data: collections } = await supabase
    .from("collections")
    .select(`
      id,
      name,
      slug,
      products:products(
        id,
        images:product_images(url)
      )
    `)
    .limit(9);

  return (
    <>
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {heroSlides.map((src, index) => (
            <div
              key={src}
              className="absolute inset-0 bg-cover bg-center opacity-0 animate-[liquid_14s_ease-in-out_infinite]"
              style={{ backgroundImage: `url(${src})`, animationDelay: `${index * 2.2}s` }}
            />
          ))}
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center text-[#ffffff]">
          <p className="mb-6 text-[10px] uppercase tracking-[0.4em] font-light">Official 2026 Catalogue</p>
          <h1 className="text-6xl font-light tracking-tight md:text-8xl lg:text-9xl leading-tight">
            Ethereal
            <br />
            Dimension
          </h1>
          <div className="mt-16 flex justify-center gap-6">
            <Link
                href="/categories"
                className="inline-flex items-center bg-[#a932bd] px-12 py-5 text-[10px] font-medium uppercase tracking-[0.2em] text-white transition-all hover:bg-[#921fa6] active:scale-[0.98]"
            >
                Explore Departments
            </Link>
          </div>
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

      {/* Categories Section */}
      <section className="bg-[#f9f9f9] py-32 border-t border-[#e7e7e7]">
        <div className="container-luxe">
          <div className="mb-20 text-center space-y-4">
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#a932bd] font-medium">Shop by Department</p>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-[#111111]">The Elements</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#e7e7e7]">
            {categories?.map((category, idx) => {
              const displayImg = category.products?.[0]?.images?.[0]?.url || heroSlides[idx % 4];
              return (
                <div key={category.id} className="group relative aspect-square overflow-hidden border-[#e7e7e7] md:[&:not(:nth-child(3n))]:border-r [&:not(:last-child)]:border-b">
                  <img
                    src={displayImg}
                    alt={category.name}
                    className="h-full w-full object-cover grayscale-[0.5] transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-white">
                    <h3 className="text-2xl font-light tracking-wide mb-6">{category.name}</h3>
                    <Link
                      href={`/checkout?category=${category.slug}`}
                      className="inline-block border border-white px-8 py-3 text-[9px] uppercase tracking-[0.2em] font-medium transition-all hover:bg-white hover:text-[#111111] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 duration-500"
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

      {/* Collections Section */}
      <section className="bg-white py-32">
        <div className="container-luxe">
          <div className="mb-20 text-center space-y-4">
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#a932bd] font-medium">Curated Series</p>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-[#111111]">The Collections</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collections?.map((collection, idx) => {
              const displayImg = collection.products?.[0]?.images?.[0]?.url || heroSlides[(idx + 2) % 4];
              return (
                <div key={collection.id} className="group flex flex-col gap-6">
                  <div className="aspect-[3/4] overflow-hidden bg-[#f9f9f9] border border-[#e7e7e7]">
                    <img
                      src={displayImg}
                      alt={collection.name}
                      className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <h3 className="text-xl font-light tracking-wide text-[#111111] uppercase">{collection.name}</h3>
                    <div className="h-px w-8 bg-[#a932bd]/30 transition-all group-hover:w-16 group-hover:bg-[#a932bd]" />
                    <Link
                      href={`/checkout?collection=${collection.slug}`}
                      className="text-[9px] uppercase tracking-[0.3em] font-medium text-[#555555] hover:text-[#a932bd] transition-colors"
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
    </>

  );
}
