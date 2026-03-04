"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";

function SuccessContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { clearCart } = useCart();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    if (!token) {
      setStatus("success"); // Might be a direct visit or already processed
      return;
    }

    const captureOrder = async () => {
      try {
        const res = await fetch("/api/paypal/capture-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId: token })
        });
        
        if (res.ok) {
          clearCart();
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch (err) {
        console.error("Capture error:", err);
        setStatus("error");
      }
    };

    captureOrder();
  }, [token, clearCart]);

  if (status === "loading") {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4">
        <div className="h-8 w-8 animate-spin border-2 border-[#a932bd] border-t-transparent rounded-full" />
        <p className="text-sm font-light tracking-widest text-[#555555] uppercase">Finalizing Your Order...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-8 text-center px-4">
        <div className="space-y-4">
            <h1 className="text-4xl font-light text-[#111111]">Order Issue</h1>
            <p className="max-w-md text-base font-light text-[#555555]">
                We encountered a small issue finalizing your payment. If you received a confirmation from PayPal, your order is likely safe, otherwise please contact us.
            </p>
        </div>
        <Link
          href="/contact-tsgabrielle"
          className="inline-flex border border-[#111111] px-10 py-4 text-xs font-light uppercase tracking-widest text-[#111111] transition-all hover:bg-[#111111] hover:text-white"
        >
          Contact Concierge
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center py-20 px-4">
      <div className="max-w-xl w-full text-center space-y-12">
        <header className="space-y-4">
            <p className="text-[10px] tracking-widest text-[#a932bd] uppercase font-light">Order Successful</p>
            <h1 className="text-6xl md:text-8xl font-light tracking-tight text-[#111111]">Merci</h1>
            <div className="h-px w-24 bg-[#a932bd] mx-auto mt-6" />
        </header>

        <div className="space-y-6">
            <p className="text-lg font-light text-[#555555] leading-relaxed">
                Thank you for your trust in tsgabrielle®. Your order has been confirmed and is now being meticulously prepared for its ethereal journey to you.
            </p>
            <p className="text-sm font-light text-[#555555] tracking-wide italic">
                A confirmation email has been dispatched to your inbox.
            </p>
        </div>

        <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
                href="/"
                className="inline-flex items-center justify-center bg-[#a932bd] px-8 py-5 text-xs font-light uppercase tracking-widest text-white transition-all hover:opacity-90"
            >
                Return to Catalogue
            </Link>
            <Link
                href="/account/orders"
                className="inline-flex items-center justify-center border border-[#e7e7e7] px-8 py-5 text-xs font-light uppercase tracking-widest text-[#555555] transition-all hover:bg-[#f9f9f9]"
            >
                View Order Status
            </Link>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
        <div className="flex min-h-[60vh] flex-col items-center justify-center">
            <div className="h-8 w-8 animate-spin border-2 border-[#a932bd] border-t-transparent rounded-full" />
        </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
