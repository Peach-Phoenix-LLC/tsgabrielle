import { ProductGrid } from "@/components/product/ProductGrid";
import { getProductsByCategorySlug, getProductsByCollectionSlug } from "@/lib/store";

export async function CategoryPageTemplate({
  title,
  slug
}: {
  title: string;
  slug: string;
}) {
  const products = await getProductsByCategorySlug(slug);
  return (
    <section className="container-luxe py-14">
      <h1 className="font-display text-4xl">{title}</h1>
      <div className="mt-8">
        <ProductGrid products={products} />
      </div>
    </section>
  );
}

export async function CollectionPageTemplate({
  title,
  slug
}: {
  title: string;
  slug: string;
}) {
  const products = await getProductsByCollectionSlug(slug);
  return (
    <section className="container-luxe py-14">
      <h1 className="font-display text-4xl">{title}</h1>
      <div className="mt-8">
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
