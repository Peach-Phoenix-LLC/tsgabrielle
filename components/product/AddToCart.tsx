"use client";

import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import type { ProductVariant } from "@/lib/types";

export function AddToCart({
  variants
}: {
  variants: ProductVariant[];
}) {
  const { addItem } = useCart();
  const [selected, setSelected] = useState(variants[0]?.id ?? "");

  if (variants.length === 0) return <p className="text-sm text-night/70">No variants available.</p>;

  const variant = variants.find((v) => v.id === selected) ?? variants[0];

  return (
    <div className="mt-6 space-y-3">
      <label className="block text-sm font-medium" htmlFor="variant">
        Variant
      </label>
      <select
        id="variant"
        className="w-full max-w-sm rounded border border-peach bg-white px-3 py-2 text-sm"
        value={variant.id}
        onChange={(e) => setSelected(e.target.value)}
      >
        {variants.map((v) => (
          <option key={v.id} value={v.id}>
            {v.title} - ${(v.price_cents / 100).toFixed(2)}
          </option>
        ))}
      </select>
      <button
        type="button"
        className="rounded-full bg-phoenix px-6 py-3 text-sm font-semibold text-white"
        onClick={() =>
          addItem({
            variantId: variant.id,
            title: variant.title,
            qty: 1,
            priceCents: variant.price_cents
          })
        }
      >
        Add to Cart
      </button>
    </div>
  );
}
