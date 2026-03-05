"use client";

import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";

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

  if (items.length === 0 && !loading) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center space-y-8 px-4 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-light text-[#111111]">Your bag is empty</h1>
          <p className="text-base font-light text-[#555555]">Discover the latest additions to our 2026 catalogue.</p>
        </div>
        <Link
          href="/"
          className="btn-holographic-outline !px-12 !py-5"
        >
          Explore Catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white pb-24">
      <section className="container-luxe py-12 md:py-24">
        <div className="flex flex-col lg:flex-row lg:items-start gap-16">
          
          {/* Left: Bag Items */}
          <div className="flex-1 space-y-10">
            <header className="space-y-2">
              <p className="text-[10px] tracking-widest text-[#a932bd] uppercase font-light">Shopping Bag</p>
              <h1 className="text-4xl font-light tracking-wide text-[#111111]">Your Selection</h1>
            </header>

            <div className="divide-y divide-[#e7e7e7] border-t border-[#e7e7e7]">
              {items.map((item) => (
                <div key={item.variantId} className="flex gap-6 py-8">
                  <div className="h-32 w-24 flex-shrink-0 bg-[#f9f9f9] overflow-hidden">
                    {/* Image placeholder or fetch if we had product images in the cart object */}
                    <div className="h-full w-full border border-[#e7e7e7] flex items-center justify-center">
                         <span className="text-[8px] uppercase tracking-tighter text-[#555555]">tsgabrielle®</span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-light text-[#111111]">{item.title}</h3>
                        <p className="text-base font-light text-[#111111]">
                          ${((item.priceCents * item.qty) / 100).toFixed(2)}
                        </p>
                      </div>
                      <p className="text-xs font-light text-[#555555] uppercase tracking-widest">
                        Quantity: {item.qty}
                      </p>
                    </div>
                    <div>
                      <button 
                        onClick={() => removeItem(item.variantId)}
                        className="text-[10px] font-light text-[#555555] uppercase tracking-widest underline underline-offset-4 hover:text-[#a932bd] transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Summary */}
          <div className="w-full lg:w-[400px] sticky top-32">
            <div className="bg-[#f9f9f9] p-8 space-y-8 border border-[#e7e7e7]">
              <h2 className="text-xs font-light tracking-widest text-[#111111] uppercase">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm font-light text-[#555555]">
                  <span>Subtotal</span>
                  <span>${(totalCents / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-light text-[#555555]">
                  <span>Shipping</span>
                  <span className="text-[#a932bd] uppercase text-[10px] tracking-widest">Complimentary</span>
                </div>
                <div className="h-px bg-[#e7e7e7] w-full" />
                <div className="flex justify-between text-lg font-light text-[#111111]">
                  <span>Total</span>
                  <span>USD ${(totalCents / 100).toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={checkout}
                  disabled={loading}
                  className="w-full btn-holographic-outline !py-5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Processing..." : "Secure Checkout"}
                </button>
                <p className="text-[10px] font-light text-[#555555] text-center uppercase tracking-widest">
                  Processed securely by PayPal
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-4 px-2">
                 <div className="flex items-center gap-4">
                    <div className="h-px flex-1 bg-[#e7e7e7]" />
                    <span className="text-[10px] font-light text-[#555555] uppercase tracking-widest">Assistance</span>
                    <div className="h-px flex-1 bg-[#e7e7e7]" />
                 </div>
                 <p className="text-[10px] font-light text-[#555555] leading-relaxed text-center italic">
                    For inquiries regarding inclusive tailoring or bespoke dimensioning, please contact our global concierge.
                 </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
