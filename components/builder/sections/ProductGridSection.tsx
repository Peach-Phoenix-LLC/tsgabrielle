"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  title: string;
  subtitle: string;
  base_sku: string;
  msrp_display: string;
  media_primary_url: string | null;
  media_primary_alt: string | null;
  catalogue_category: string;
  catalogue_collection: string;
}

interface ProductGridSectionProps {
  title: string;
  subtitle?: string;
  collection?: string;
  category?: string;
  columns?: number;
  limit?: number;
  showPrice?: boolean;
}

export default function ProductGridSection({
  title,
  subtitle,
  columns = 4,
  limit = 8,
  showPrice = true,
}: ProductGridSectionProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/admin/products?limit=${limit}`);
        if (res.ok) {
          const data = await res.json();
          setProducts(Array.isArray(data) ? data.slice(0, limit) : (data.products || []).slice(0, limit));
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    })();
  }, [limit]);

  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {title && (
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold font-[family-name:var(--font-space-grotesk)]">
              {title}
            </h2>
            {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
          </div>
        )}
        {loading ? (
          <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
            {Array.from({ length: limit }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 aspect-square rounded-xl mb-3" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${Math.min(columns, 4)}, 1fr)` }}>
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/${product.base_sku}`}
                className="group block"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden mb-3 bg-gray-100">
                  {product.media_primary_url ? (
                    <Image
                      src={product.media_primary_url}
                      alt={product.media_primary_alt || product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                      No Image
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-sm">{product.title}</h3>
                <p className="text-xs text-gray-500">{product.subtitle}</p>
                {showPrice && (
                  <p className="text-sm font-bold mt-1">{product.msrp_display}</p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
