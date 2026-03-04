"use client";

import { useState } from "react";
import { useCart } from "@/hooks/useCart";

export default function CheckoutPage() {
  const { items, removeItem, totalCents } = useCart();
  const [loading, setLoading] = useState(false);

  const checkout = async () => {
    if (items.length === 0) return;
    setLoading(true);
    try {
      const res = await fetch("/api/paypal/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({ variantId: item.variantId, quantity: item.qty }))
        })
      });
      const data = (await res.json()) as { approveUrl?: string };
      if (data.approveUrl) window.location.href = data.approveUrl;
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative mx-auto min-h-[80vh] w-full max-w-[520px] overflow-hidden rounded-2xl border border-white/50 bg-white/70 shadow-xl backdrop-blur-xl">
      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />

      <div className="relative z-10 flex items-center justify-between border-b border-white/60 bg-white/60 px-5 py-4">
        <h1 className="text-lg font-bold text-charcoal">Checkout</h1>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Step 1/3</span>
      </div>

      <div className="relative z-10 p-5">
        <details className="group rounded-xl border border-white/70 bg-white/70 p-4 shadow-sm" open>
          <summary className="cursor-pointer list-none text-sm font-bold text-charcoal">
            Order Summary <span className="ml-1 text-primary">(${(totalCents / 100).toFixed(2)})</span>
          </summary>
          <div className="mt-4 space-y-3">
            {items.length === 0 && <p className="text-sm text-slate-500">Your cart is empty.</p>}
            {items.map((item) => (
              <div key={item.variantId} className="flex items-center justify-between rounded-lg bg-white p-3">
                <div>
                  <p className="text-sm font-bold text-charcoal">{item.title}</p>
                  <p className="text-xs text-slate-500">Qty: {item.qty}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-primary">${((item.priceCents * item.qty) / 100).toFixed(2)}</p>
                  <button className="text-xs text-slate-500 hover:text-primary" onClick={() => removeItem(item.variantId)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </details>

        <div className="mt-5 space-y-3">
          <div className="rounded-lg border border-slate-200 bg-white p-3">
            <label className="text-xs font-semibold text-slate-500">Email</label>
            <input className="mt-1 w-full border-none p-0 text-sm font-medium text-charcoal focus:ring-0" defaultValue="" />
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-3">
            <label className="text-xs font-semibold text-slate-500">Address</label>
            <input className="mt-1 w-full border-none p-0 text-sm font-medium text-charcoal focus:ring-0" defaultValue="" />
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 z-20 border-t border-white/60 bg-white/80 p-4 backdrop-blur">
        <button
          onClick={checkout}
          disabled={loading || items.length === 0}
          className="w-full rounded-xl bg-primary px-5 py-4 text-base font-bold text-white shadow-lg shadow-primary/30 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Redirecting..." : "Continue to Payment"}
        </button>
      </div>
    </section>
  );
}
