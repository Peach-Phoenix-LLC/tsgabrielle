"use client";

import { useState, useMemo } from "react";
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
  initialProducts: Product[];
  categories: Category[];
  gridTheme?: {
    backgroundColor?: string;
    textColor?: string;
    accentColor?: string;
  };
};

export default function CollectionPageClient({ initialProducts, categories, gridTheme }: Props) {
  const [sort, setSort] = useState("title");
  const [filter, setFilter] = useState("");

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

  return (
    <>
      <SortFilterBar
        categories={categories}
        onSortChange={setSort}
        onFilterChange={setFilter}
      />
      <ProductGrid products={filtered} theme={gridTheme} />
    </>
  );
}
