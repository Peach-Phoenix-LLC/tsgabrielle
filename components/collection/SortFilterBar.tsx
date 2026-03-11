"use client";

import { useState, useEffect } from "react";

type Category = { id: string; name: string };
type Props = {
  categories: Category[];
  onSortChange: (value: string) => void;
  onFilterChange: (categoryId: string) => void;
};

export default function SortFilterBar({
  categories,
  onSortChange,
  onFilterChange,
}: Props) {
  const [sort, setSort] = useState("title");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    onSortChange(sort);
  }, [sort, onSortChange]);

  useEffect(() => {
    onFilterChange(filter);
  }, [filter, onFilterChange]);

  return (
    <div className="container-luxe">
      <div className="flex flex-col sm:flex-row justify-end items-center gap-4 py-6 border-b border-[#e7e7e7]">
        <div className="flex gap-4 w-full sm:w-auto">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full sm:w-auto border border-[#e7e7e7] p-3 rounded-md bg-white text-[#555555] font-light text-sm focus:border-[#a932bd] focus:outline-none"
          >
            <option value="">All Elements</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full sm:w-auto border border-[#e7e7e7] p-3 rounded-md bg-white text-[#555555] font-light text-sm focus:border-[#a932bd] focus:outline-none"
          >
            <option value="title">Alphabetical</option>
            <option value="price_asc">Price – Low to High</option>
            <option value="price_desc">Price – High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>
    </div>
  );
}
