import { ProductGrid } from "@/components/product/ProductGrid";
import Image from "next/image";
import { getProductsByCategorySlug, getProductsByCollectionSlug } from "@/lib/store";
import { CATEGORIES, COLLECTIONS } from "@/lib/menu";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

export async function CategoryPageTemplate({
  title,
  slug,
  description,
}: {
  title: string;
  slug: string;
  description?: string;
}) {
  const products = await getProductsByCategorySlug(slug);
  const categoryData = CATEGORIES.find(c => c.href.includes(slug));
  const heroImage = categoryData?.image || "/images/slides/tsgabrielle-Slide3.png";

  return (
    <div className="bg-white pb-32">
      <section className="relative flex h-[100svh] items-center justify-center overflow-hidden -mt-[100px] lg:-mt-[112px]">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt={title}
            fill
            className="h-full w-full object-cover"
            priority
          />
        </div>
      </section>

      <section className="container-luxe pt-8 space-y-10">
        <Breadcrumbs textColor="#111111" />
        
        <header className="text-center space-y-6 max-w-4xl mx-auto mt-8">
           <p className="text-[10px] uppercase tracking-[0.4em] font-light text-[#555555]">Official Catalogue</p>
           <h1 className="text-4xl md:text-6xl font-light tracking-wide uppercase text-[#111111]">{title}</h1>
           {description && <p className="text-lg md:text-xl font-light text-[#111111]">{description}</p>}
        </header>

        <div className="pt-16 border-t border-[#e7e7e7]">
          <header className="flex flex-col md:flex-row items-center justify-between pb-8 gap-6">
             <div className="text-xs font-light text-[#555555] tracking-widest uppercase">
                {products.length} {products.length === 1 ? 'Piece' : 'Pieces'}
             </div>
             <div className="flex gap-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#111111] pb-1 border-b border-[#111111] cursor-pointer">All</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#555555] hover:text-[#111111] transition-colors cursor-pointer">Newest</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#555555] hover:text-[#111111] transition-colors cursor-pointer">Price</span>
             </div>
          </header>
          <ProductGrid products={products} />
        </div>
      </section>
    </div>
  );
}

export async function CollectionPageTemplate({
  title,
  slug,
  description,
  longDescription,
  slogans
}: {
  title: string;
  slug: string;
  description?: string;
  longDescription?: string;
  slogans?: string[];
}) {
  const products = await getProductsByCollectionSlug(slug);
  const collectionData = COLLECTIONS.find(c => c.href.includes(slug));
  const heroImage = collectionData?.image || "/images/slides/tsgabrielle-Slide2.png";

  return (
    <div className="bg-white pb-32">
      <section className="relative flex h-[100svh] items-center justify-center overflow-hidden -mt-[100px] lg:-mt-[112px]">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt={title}
            fill
            className="h-full w-full object-cover object-center"
            priority
          />
        </div>
      </section>

      <section className="container-luxe pt-8 space-y-10">
        <Breadcrumbs textColor="#111111" />
        
        <header className="text-center space-y-6 max-w-4xl mx-auto mt-8">
           <p className="text-[10px] uppercase tracking-[0.4em] font-light text-[#555555]">Curated Series</p>
           <h1 className="text-4xl md:text-6xl font-light tracking-wide uppercase text-[#111111]">{title}</h1>
           {description && <p className="text-lg md:text-xl font-light text-[#111111]">{description}</p>}
           {longDescription && <p className="text-sm md:text-base text-[#555555] leading-relaxed text-justify md:text-center mt-4">{longDescription}</p>}
           {slogans && slogans.length > 0 && (
             <div className="mt-8 flex flex-wrap justify-center gap-3">
               {slogans.map((slogan, idx) => (
                 <span key={idx} className="text-xs uppercase tracking-widest border border-black/10 px-4 py-2 bg-black/5 text-[#111111] rounded-sm">
                   {slogan}
                 </span>
               ))}
             </div>
           )}
        </header>

        <div className="pt-16 border-t border-[#e7e7e7]">
          <header className="flex flex-col md:flex-row items-center justify-between pb-8 gap-6">
             <div className="text-xs font-light text-[#555555] tracking-widest uppercase">
                {products.length} {products.length === 1 ? 'Piece' : 'Pieces'}
             </div>
             <div className="flex gap-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#111111] pb-1 border-b border-[#111111] cursor-pointer">Series Overview</span>
             </div>
          </header>
          <ProductGrid products={products} />
        </div>
      </section>
    </div>
  );
}
