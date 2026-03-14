"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Collection {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  image_alt: string | null;
}

interface CollectionGridSectionProps {
  title: string;
  subtitle?: string;
  columns?: number;
  showFeaturedOnly?: boolean;
}

export default function CollectionGridSection({
  title,
  subtitle,
  columns = 3,
  showFeaturedOnly = false,
}: CollectionGridSectionProps) {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const url = showFeaturedOnly
          ? "/api/admin/collections?featured=true"
          : "/api/admin/collections";
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setCollections(Array.isArray(data) ? data : []);
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    })();
  }, [showFeaturedOnly]);

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
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 aspect-[3/2] rounded-xl" />
                <div className="h-4 bg-gray-200 rounded w-1/2 mt-3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${Math.min(columns, 4)}, 1fr)` }}>
            {collections.map((col) => (
              <Link
                key={col.id}
                href={`/collections/${col.slug}`}
                className="group block"
              >
                <div className="relative aspect-[3/2] rounded-xl overflow-hidden bg-gray-100">
                  {col.image_url ? (
                    <Image
                      src={col.image_url}
                      alt={col.image_alt || col.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#a932bd]/20 to-[#cb5c31]/20">
                      <span className="text-gray-500 text-sm">{col.name}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white font-bold text-lg">{col.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
