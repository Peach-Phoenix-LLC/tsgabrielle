"use client";

import { useState } from "react";
import { usePostHog } from "posthog-js/react";
import { useCart } from "@/hooks/useCart";
import type { ProductVariant } from "@/lib/types";

export function AddToCart({
  variants
}: {
  variants: ProductVariant[];
}) {
  const { addItem } = useCart();
  const posthog = usePostHog();
  const [selected, setSelected] = useState(variants[0]?.id ?? "");

  if (variants.length === 0) {
    return (
      <p className="text-base font-light text-[#555555]">
        This product is currently unavailable.
      </p>
    );
  }

  const variant = variants.find((v) => v.id === selected) ?? variants[0];

  return (
    <div className="mt-8 space-y-6">
      <div className="space-y-3">
        <label className="block text-sm font-light tracking-wide text-[#555555] uppercase" htmlFor="variant">
          Select Option
        </label>
        <div className="relative">
          <select
            id="variant"
            className="w-full max-w-md appearance-none border border-[#e7e7e7] bg-white px-5 py-4 text-base font-light text-[#111111] focus:border-[#a932bd] focus:outline-none transition-colors"
            value={variant.id}
            onChange={(e) => setSelected(e.target.value)}
          >
            {variants.map((v) => (
              <option key={v.id} value={v.id}>
                {v.title}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#555555]">
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor">
              <path d="M1 1L6 6L11 1" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="w-full max-w-md bg-[#a932bd] px-8 py-5 text-base font-light tracking-widest text-white transition-all hover:bg-[#921fa6] active:scale-[0.98]"
        onClick={() => {
          addItem({
            variantId: variant.id,
            title: variant.title,
            qty: 1,
            priceCents: variant.price_cents
          });
          posthog?.capture("product_added_to_cart", {
            variant_id: variant.id,
            product_title: variant.title,
            price: variant.price_cents / 100,
            currency: "USD",
          });
        }}
      >
        ADD TO BAG — ${(variant.price_cents / 100).toFixed(2)}
      </button>
      
      <p className="text-xs font-light text-[#555555] tracking-wide">
        Free worldwide shipping on all luxury orders.
      </p>
    </div>
  );
}
