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

  return (
    <>
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
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
          <p className="mb-6 text-sm uppercase tracking-widest font-light">Official 2026 Catalogue</p>
          <h1 className="text-6xl font-light tracking-wide md:text-8xl lg:text-9xl leading-tight">
            Ethereal
            <br />
            Dimension
          </h1>
          <Link
            href="/categories"
            className="mt-12 inline-flex items-center border border-white px-10 py-4 text-xs font-light uppercase tracking-widest text-white transition-all hover:bg-white hover:text-[#a932bd]"
          >
            Explore Collections
          </Link>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container-luxe">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#a932bd] font-light mb-2">Selected Works</p>
              <h2 className="text-4xl md:text-5xl font-light tracking-wide text-[#111111]">The Catalogue</h2>
            </div>
            <Link href="/categories" className="text-sm uppercase tracking-[0.2em] text-[#555555] font-light border-b border-[#e7e7e7] pb-1 hover:text-[#a932bd] transition-colors">
              View All Series
            </Link>
          </div>
          
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4 md:gap-8">
            {featuredProducts && featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <Link key={product.id} href={`/product/${product.slug}`} className="group flex flex-col gap-5">
                  <div className="aspect-[3/4] overflow-hidden bg-[#f9f9f9]">
                    <img
                      src={product.images?.[0]?.url || "/images/logo-icon.png"}
                      alt={product.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-light text-[#111111] group-hover:text-[#a932bd] transition-colors line-clamp-1">{product.title}</h3>
                    <p className="text-sm font-light text-[#555555]">
                      ${(product.price_cents / 100).toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full py-20 text-center border border-dashed border-[#e7e7e7]">
                <p className="text-sm font-light text-[#555555] uppercase tracking-widest">Awaiting New Arrival</p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Visual Identity Section */}
      <section className="bg-[#f9f9f9] py-24 border-t border-[#e7e7e7]">
        <div className="container-luxe text-center max-w-3xl">
          <h2 className="text-2xl font-light tracking-widest text-[#111111] uppercase mb-8">Ethereal Craftsmanship</h2>
          <p className="text-base font-light leading-relaxed text-[#555555]">
             Defining the next era of high-end aesthetics through material innovation and liquid luxury. tsgabrielle® 2026 presents a curated selection of inclusive products designed for the contemporary global citizen.
          </p>
          <div className="mt-12 flex justify-center gap-10">
             <div className="h-0.5 w-12 bg-[#a932bd]" />
             <div className="h-0.5 w-12 bg-[#a932bd]" />
             <div className="h-0.5 w-12 bg-[#a932bd]" />
          </div>
        </div>
      </section>
    </>
  );
}
