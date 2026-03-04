import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Merci | tsgabrielle",
  description: "Thank you celebration page after successful checkout.",
  path: "/checkout/success"
});

export default function SuccessPage() {
  return (
    <section className="relative mx-auto min-h-[80vh] w-full max-w-[520px] overflow-hidden rounded-2xl border border-white/50 bg-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[12%] top-[15%] h-3 w-3 animate-float rounded-full bg-primary/25" />
        <div className="absolute left-[78%] top-[25%] h-4 w-4 animate-float rounded-full bg-cyan-300/30" />
        <div className="absolute left-[24%] top-[58%] h-2 w-2 animate-float rounded-full bg-pink-300/35" />
        <div className="absolute left-[72%] top-[72%] h-3 w-3 animate-float rounded-full bg-primary/20" />
      </div>
      <div className="relative z-10 flex h-full flex-col items-center px-6 py-12 text-center">
        <h1 className="holographic-text text-7xl font-extrabold tracking-tight">Merci</h1>
        <p className="mt-2 text-lg font-medium text-slate-500">Thank you for your order.</p>

        <div className="mt-10 w-full rounded-xl border border-white/70 bg-white/80 p-6 shadow-lg backdrop-blur">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <span className="text-3xl text-primary">✓</span>
          </div>
          <h2 className="text-2xl font-bold text-charcoal">Order Confirmed</h2>
          <p className="mt-1 text-sm text-slate-500">Your order is being prepared with love.</p>
          <div className="mt-6 rounded-lg bg-background-light p-4 text-left">
            <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
              <span>Order ID</span>
              <span className="font-bold text-charcoal">TSG-88294</span>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>Status</span>
              <span className="font-bold text-primary">Processing</span>
            </div>
          </div>
        </div>

        <Link
          href="/"
          className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-primary px-6 py-4 text-lg font-bold text-white shadow-lg shadow-primary/30"
        >
          Return to home
        </Link>
      </div>
    </section>
  );
}
