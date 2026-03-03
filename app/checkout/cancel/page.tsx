import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Payment Cancelled | tsgabrielle",
  description: "Your payment was cancelled.",
  path: "/checkout/cancel"
});

export default function CancelPage() {
  return (
    <section className="container-luxe py-14">
      <h1 className="font-display text-4xl">Payment Cancelled</h1>
      <p className="mt-3 text-night/80">No charge was made. You can return to checkout anytime.</p>
    </section>
  );
}
