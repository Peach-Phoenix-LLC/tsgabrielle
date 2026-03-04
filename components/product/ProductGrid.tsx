import Link from "next/link";
import type { Product } from "@/lib/types";

export function ProductGrid({ products }: { products: any[] }) {
  if (products.length === 0) {
    return (
      <div className="py-32 text-center border border-dashed border-[#e7e7e7]">
        <p className="text-xs font-light text-[#555555] tracking-[0.3em] uppercase">No products available in this series yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-12">
      {products.map((product) => {
        const imageUrl = product.product_images?.[0]?.url || product.images?.[0]?.url || "/images/logo-icon.png";
        
        return (
          <Link key={product.id} href={`/product/${product.slug}`} className="group flex flex-col gap-6">
            <div className="aspect-[3/4] w-full overflow-hidden bg-[#f9f9f9]">
              <img
                src={imageUrl}
                alt={product.title}
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            </div>
            <div className="space-y-2 text-center">
              <h3 className="text-lg font-light text-[#111111] transition-colors duration-500 group-hover:text-[#a932bd]">{product.title}</h3>
              <p className="text-sm font-light text-[#555555] tracking-wide">
                ${(product.price_cents / 100).toFixed(2)}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
