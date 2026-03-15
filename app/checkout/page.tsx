"use client";

import { useState, useEffect } from "react";
import { usePostHog } from "posthog-js/react";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export default function CheckoutPage() {
  const { items, removeItem, totalCents } = useCart();
  const posthog = usePostHog();
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    supabase.auth.getUser().then(({ data }) => {
      if (data.user?.email) {
        setUserEmail(data.user.email);
        posthog?.identify(data.user.id, { email: data.user.email });

        // Track "Started Checkout" event
        if (items.length > 0) {
          posthog?.capture("checkout_started", {
            total_value: totalCents / 100,
            item_count: items.length,
            product_names: items.map(item => item.title),
            currency: "USD",
          });
          fetch("/api/klaviyo/track-event", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: data.user.email,
              eventName: "Started Checkout",
              properties: {
                "Total Value": totalCents / 100,
                "Item Count": items.length,
                "Product Names": items.map(item => item.title),
              },
            }),
          }).catch(err => console.error("Klaviyo tracking error:", err));
        }
      }
    });
  }, [items.length]);

  const checkout = async () => {
    if (items.length === 0) return;
    setLoading(true);

    const checkoutData = {
      items: items.map((item) => ({ variantId: item.variantId, quantity: item.qty })),
      total: totalCents / 100,
      email: userEmail
    };

    try {
      const res = await fetch("/api/paypal/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: checkoutData.items
        })
      });

      if (!res.ok) {
        throw new Error(`Checkout failed: ${res.statusText}`);
      }

      const data = (await res.json()) as { approveUrl?: string; error?: string };
      
      if (data.error) throw new Error(data.error);

      if (data.approveUrl) {
        posthog?.capture("checkout_redirected_to_paypal", {
          total: totalCents / 100,
          item_count: items.length,
        });
        window.location.href = data.approveUrl;
      } else {
        throw new Error("No approval URL provided");
      }
    } catch (err: any) {
      console.error("Checkout error:", err);
      posthog?.capture("checkout_error", { error: err.message });

      // Real-time monitoring trigger
      fetch("/api/monitor/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "checkout_error",
          error: err.message,
          data: checkoutData
        })
      }).catch(() => {});

      alert("We encountered an issue processing your selection. Please try again or contact support.");
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
          
          <div className="flex-1 space-y-10">
            <header className="space-y-2">
              <p className="text-[10px] tracking-widest text-[#a932bd] uppercase font-light">Shopping Bag</p>
              <h1 className="text-4xl font-light tracking-wide text-[#111111]">Your Selection</h1>
            </header>

            <div className="divide-y divide-[#e7e7e7] border-t border-[#e7e7e7]">
              {items.map((item) => (
                <div key={item.variantId} className="flex gap-6 py-8">
                  <div className="h-32 w-24 flex-shrink-0 bg-[#f9f9f9] overflow-hidden">
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
