"use client";

import Image from "next/image";
import Link from "next/link";

type Product = {
  id: string;
  slug: string;
  title: string;
  price_cents: number;
  product_images?: { url: string }[];
};

export default function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <section className="container-luxe py-20 text-center">
        <h2 className="text-2xl font-light text-[#111111]">No creations found</h2>
        <p className="mt-4 text-[#555555]">We couldn't find any items matching your filters.</p>
      </section>
    );
  }

  return (
    <section className="container-luxe py-12">
      <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {products.map((p) => {
          const defaultImage = p.product_images?.[0]?.url || "/images/placeholder.jpg";
          
          return (
            <li
              key={p.id}
              className="group border border-[#e7e7e7] bg-white rounded-md overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <Link href={`/product/${p.slug}`} className="block h-full flex flex-col">
                <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-[#f9f9f9]">
                  <Image
                    src={defaultImage}
                    alt={p.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>
                <div className="p-6 text-center flex-grow flex flex-col justify-between">
                  <div>
                    <h2 className="font-light text-lg text-[#111111]">{p.title}</h2>
                    <p className="mt-2 text-[#a932bd] font-light">
                      ${(p.price_cents / 100).toFixed(2)}
                    </p>
                  </div>
                  <button className="mt-6 w-full bg-[#a932bd] text-white py-3 text-sm uppercase tracking-widest font-light hover:bg-[#921fa6] transition-colors rounded">
                    Discover
                  </button>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
