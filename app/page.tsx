import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { COLLECTIONS } from "@/lib/menu";

export const metadata = buildMetadata({
  title: "tsgabrielle® | 2026 Official Catalogue",
  description: "Official 2026 catalogue with holographic luxury collections.",
  path: "/"
});

const heroSlides = [
  "/images/Collections/Peach Phoenix/Peach_Phienix.PNG",
  "/images/Collections/Édition Spatiale/Spatial_Edition_by_tsgabrielle.png",
  "/images/Collections/Flamant Rose/Flamant-Rose.png",
  "/images/Collections/Womanizer/Womanizer.png"
];

export default function HomePage() {
  return (
    <>
      <section className="relative flex min-h-[720px] items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {heroSlides.map((src, index) => (
            <div
              key={src}
              className="absolute inset-0 bg-cover bg-center opacity-0 animate-[liquid_14s_ease-in-out_infinite]"
              style={{ backgroundImage: `url(${src})`, animationDelay: `${index * 2.2}s` }}
            />
          ))}
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative z-10 mx-auto mt-24 max-w-5xl px-4 text-center text-white">
          <p className="mb-5 font-body text-sm uppercase tracking-[0.35em]">Official 2026 Catalogue</p>
          <h1 className="holographic-text text-6xl font-black tracking-tight md:text-8xl lg:text-9xl">
            Ethereal
            <br />
            Dimension
          </h1>
          <Link
            href="/collections"
            className="mt-10 inline-flex items-center rounded-full bg-white px-9 py-4 font-body text-xs font-bold uppercase tracking-[0.2em] text-charcoal"
          >
            View Collection
          </Link>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container-luxe">
          <div className="mb-14 flex items-end justify-between">
            <h2 className="font-display text-5xl font-bold tracking-tight text-charcoal">The Catalogue</h2>
            <Link href="/collections" className="hidden font-body text-sm uppercase tracking-[0.2em] text-primary md:block">
              All Series
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
            {COLLECTIONS.slice(0, 4).map((collection, index) => (
              <Link key={collection.href} href={collection.href} className="group flex flex-col items-center gap-6">
                <div className="holographic-border w-full p-1">
                  <div
                    className="aspect-square rounded-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${heroSlides[index]})` }}
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-display text-2xl font-bold text-charcoal group-hover:text-primary">{collection.label}</h3>
                  <p className="mt-1 font-body text-xs uppercase tracking-[0.2em] text-secondary">2026 Series</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
