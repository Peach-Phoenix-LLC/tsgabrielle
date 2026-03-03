import Link from "next/link";

export default function AdminProductsPage() {
  return (
    <section className="container-luxe py-14">
      <h1 className="font-display text-4xl">Admin Products</h1>
      <Link href="/admin/products/new" className="mt-4 inline-block text-phoenix">
        Add New Product
      </Link>
    </section>
  );
}

