import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Order Detail | tsgabrielle",
  description: "Order details page.",
  path: "/account/orders/[id]"
});

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <section className="container-luxe py-14">
      <h1 className="font-display text-4xl">Order #{id}</h1>
      <p className="mt-3 text-night/80">Detailed timeline, items, and tracking appear here.</p>
    </section>
  );
}

