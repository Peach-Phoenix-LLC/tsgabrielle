import Link from "next/link";
import type { Product } from "@/lib/types";

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return <p className="text-sm text-night/70">No products available yet.</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <article key={product.id} className="rounded-xl border border-peach bg-white p-4 shadow-sm">
          <h3 className="font-display text-xl">{product.title}</h3>
          <p className="mt-1 text-sm text-night/70">{product.description}</p>
          <p className="mt-3 text-sm font-semibold">${(product.price_cents / 100).toFixed(2)}</p>
          <Link href={`/product/${product.slug}`} className="mt-4 inline-block text-sm text-phoenix">
            View Product
          </Link>
        </article>
      ))}
    </div>
  );
}
