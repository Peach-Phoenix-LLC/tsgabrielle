import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Payment Success | tsgabrielle",
  description: "Your payment was successful.",
  path: "/checkout/success"
});

export default function SuccessPage() {
  return (
    <section className="container-luxe py-14">
      <h1 className="font-display text-4xl">Payment Success</h1>
      <p className="mt-3 text-night/80">Thank you. Your order is being processed.</p>
    </section>
  );
}

