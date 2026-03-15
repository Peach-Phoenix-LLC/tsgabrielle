"use client";

import { useState, useMemo, useEffect } from "react";
import { usePostHog } from "posthog-js/react";
import { trackCollectionViewed } from "@/lib/posthog-events";
import SortFilterBar from "./SortFilterBar";
import ProductGrid from "./ProductGrid";

type Product = {
  id: string;
  slug: string;
  title: string;
  price_cents: number;
  category_id: string | null;
  product_images?: { url: string }[];
  created_at?: string;
};

type Category = { id: string; name: string };

type Props = {
  collectionSlug?: string;
  collectionName?: string;
  initialProducts: Product[];
  categories: Category[];
  gridTheme?: {
    backgroundColor?: string;
    textColor?: string;
    accentColor?: string;
  };
};

export default function CollectionPageClient({ collectionSlug, collectionName, initialProducts, categories, gridTheme }: Props) {
  const posthog = usePostHog();
  const [sort, setSort] = useState("title");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    // Track collection view on mount
    if (collectionSlug && collectionName) {
      trackCollectionViewed({
        slug: collectionSlug,
        name: collectionName,
        product_count: initialProducts.length,
      });
    }
  }, [collectionSlug, collectionName, initialProducts.length]);

  const filtered = useMemo(() => {
    let list = [...initialProducts];
    
    // Filter
    if (filter) {
      list = list.filter((p) => p.category_id === filter);
    }
    
    // Sort
    switch (sort) {
      case "price_asc":
        return list.sort((a, b) => a.price_cents - b.price_cents);
      case "price_desc":
        return list.sort((a, b) => b.price_cents - a.price_cents);
      case "newest":
        return list.sort((a, b) => {
          const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
          const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
          return dateB - dateA;
        });
      default: // title
        return list.sort((a, b) => a.title.localeCompare(b.title));
    }
  }, [initialProducts, sort, filter]);

  const handleSortChange = (newSort: string) => {
    setSort(newSort);
    posthog?.capture("collection_sort_changed", {
      collection_slug: collectionSlug,
      sort_type: newSort,
    });
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    const categoryName = newFilter ? categories.find(c => c.id === newFilter)?.name : null;
    posthog?.capture("collection_filter_changed", {
      collection_slug: collectionSlug,
      category_id: newFilter || null,
      category_name: categoryName,
    });
  };

  return (
    <>
      <SortFilterBar
        categories={categories}
        onSortChange={handleSortChange}
        onFilterChange={handleFilterChange}
      />
      <ProductGrid products={filtered} theme={gridTheme} collectionSlug={collectionSlug} />
    </>
  );
}
