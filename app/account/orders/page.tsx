import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "My Orders | tsgabrielle",
  description: "Orders dashboard.",
  path: "/account/orders"
});

export default function OrdersPage() {
  return (
    <section className="container-luxe py-14">
      <h1 className="font-display text-4xl">My Orders</h1>
      <p className="mt-3 text-night/80">Track and review your purchase history.</p>
      <Link href="/account/orders/sample-id" className="mt-4 inline-block text-phoenix">
        View Sample Order
      </Link>
    </section>
  );
}

