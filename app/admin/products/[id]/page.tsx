export default async function AdminProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <section className="container-luxe py-14">
      <h1 className="font-display text-4xl">Product #{id}</h1>
      <p className="mt-3 text-night/80">Edit product, variants, and media records.</p>
    </section>
  );
}

