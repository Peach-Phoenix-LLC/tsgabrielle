"use client";

import { useState } from "react";
import { useCart } from "@/hooks/useCart";

export default function CheckoutPage() {
  const { items, removeItem, totalCents } = useCart();
  const [loading, setLoading] = useState(false);

  const checkout = async () => {
    if (items.length === 0) return;
    setLoading(true);
    const res = await fetch("/api/paypal/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: items.map((item) => ({ variantId: item.variantId, quantity: item.qty }))
      })
    });
    const data = (await res.json()) as { id: string; approveUrl?: string };
    if (data.approveUrl) window.location.href = data.approveUrl;
    setLoading(false);
  };

  return (
    <section className="container-luxe py-14">
      <h1 className="font-display text-4xl">Checkout</h1>
      <p className="mt-3 text-night/80">Pay securely with PayPal.</p>
      <div className="mt-6 space-y-3">
        {items.length === 0 && <p className="text-sm text-night/70">Your cart is empty.</p>}
        {items.map((item) => (
          <div key={item.variantId} className="flex items-center justify-between rounded border border-peach p-3">
            <div>
              <p className="text-sm font-semibold">{item.title}</p>
              <p className="text-xs text-night/70">Qty {item.qty}</p>
            </div>
            <div className="text-right">
              <p className="text-sm">${((item.priceCents * item.qty) / 100).toFixed(2)}</p>
              <button className="text-xs text-phoenix" onClick={() => removeItem(item.variantId)}>
                Remove
              </button>
            </div>
          </div>
        ))}
        <p className="text-sm font-semibold">Total: ${(totalCents / 100).toFixed(2)}</p>
      </div>
      <button
        onClick={checkout}
        disabled={loading || items.length === 0}
        className="mt-8 rounded-full bg-phoenix px-6 py-3 text-sm font-semibold text-white disabled:opacity-60"
      >
        {loading ? "Redirecting..." : "Proceed to PayPal"}
      </button>
    </section>
  );
}
