import Link from "next/link";
import Image from "next/image";
import { COLLECTIONS } from "@/lib/menu";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Collections | tsgabrielle",
  description: "Explore all luxury collections at tsgabrielle.",
  path: "/collections"
});

export default function CollectionsIndexPage() {
  return (
    <div className="bg-white pb-32 pt-32 lg:pt-48">
      <section className="container-luxe border-t border-[#e7e7e7] pt-20">
        <div className="mb-24 text-center space-y-4">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#a932bd] font-medium">Curated Series</p>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-[#111111]">All Collections</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {COLLECTIONS.map((collection, idx) => {
            const displayImg = collection.image || `/images/slides/tsgabrielle-Slide${(idx % 4) + 1}.png`;
            return (
              <div key={idx} className="group flex flex-col gap-6">
                <div className="holographic-card-border aspect-[3/4] overflow-hidden bg-[#f9f9f9] border border-[#e7e7e7] rounded-[3rem] transition-all duration-700 group-hover:shadow-xl group-hover:border-[#a932bd]/20">
                  <Image
                    src={displayImg}
                    alt={collection.label}
                    fill
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-col items-center gap-4 text-center">
                  <h3 className="text-xl font-light tracking-wide text-[#111111] capitalize">{collection.label}</h3>
                  <div className="h-px w-8 bg-[#a932bd]/30 transition-all duration-500 group-hover:w-16 group-hover:bg-[#a932bd]" />
                  <Link
                    href={collection.href}
                    className="btn-holographic-outline"
                  >
                    Discover Series
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
