import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Payment Cancelled | tsgabrielle",
  description: "Your payment was cancelled.",
  path: "/checkout/cancel"
});

export default function CancelPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center space-y-12 px-4 text-center">
      <div className="max-w-md space-y-4">
        <p className="text-[10px] tracking-widest text-[#a932bd] uppercase font-light">Transaction Cancelled</p>
        <h1 className="text-4xl font-light text-[#111111]">No charge was made</h1>
        <p className="text-base font-light text-[#555555]">
          Your selection remains saved in your bag. You can return to finalize your order whenever you are ready.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/checkout"
          className="btn-holographic-outline"
        >
          Return to Bag
        </Link>
        <Link
          href="/"
          className="btn-holographic-outline border-[#e7e7e7] text-[#555555]"
        >
          Explore Catalogue
        </Link>
      </div>
    </div>
  );
}
