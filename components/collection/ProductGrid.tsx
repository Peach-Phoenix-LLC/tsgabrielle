"use client";

import Image from "next/image";
import Link from "next/link";
import { usePostHog } from "posthog-js/react";

type Product = {
  id: string;
  slug: string;
  title: string;
  price_cents: number;
  product_images?: { url: string }[];
};

type Theme = {
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
};

export default function ProductGrid({
  products,
  theme = {},
  collectionSlug,
}: {
  products: Product[];
  theme?: Theme;
  collectionSlug?: string;
}) {
  const posthog = usePostHog();
  const bg = theme.backgroundColor || "#ffffff";
  const text = theme.textColor || "#111111";
  const accent = theme.accentColor || "#a932bd";

  if (products.length === 0) {
    return (
      <section className="container-luxe py-20 text-center">
        <h2 className="text-2xl font-light" style={{ color: text }}>No creations found</h2>
        <p className="mt-4" style={{ color: text }}>We couldn't find any items matching your filters.</p>
      </section>
    );
  }

  return (
    <section className="container-luxe py-12" style={{ backgroundColor: bg }}>
      <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {products.map((p) => {
          const defaultImage = p.product_images?.[0]?.url || "/images/placeholder.jpg";
          
          return (
            <li
              key={p.id}
              className="group border border-[#e7e7e7] bg-white rounded-md overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <Link
                href={`/product/${p.slug}`}
                className="block h-full flex flex-col"
                onClick={() => {
                  posthog?.capture("product_clicked", {
                    product_id: p.id,
                    product_title: p.title,
                    product_price: p.price_cents / 100,
                    collection_slug: collectionSlug,
                    source: "collection_grid",
                  });
                }}
              >
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
                    <h2 className="font-light text-lg" style={{ color: text }}>{p.title}</h2>
                    <p className="mt-2 font-light" style={{ color: accent }}>
                      ${(p.price_cents / 100).toFixed(2)}
                    </p>
                  </div>
                  <button className="mt-6 w-full text-white py-3 text-sm uppercase tracking-widest font-light transition-colors rounded" style={{ backgroundColor: accent }}>
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
