export default async function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <section className="container-luxe py-14">
      <h1 className="font-display text-4xl">Admin Order #{id}</h1>
      <p className="mt-3 text-night/80">Internal payment, fulfillment, and customer event logs.</p>
    </section>
  );
}

