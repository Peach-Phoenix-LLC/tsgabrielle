import Link from "next/link";
import { CATEGORIES } from "@/lib/menu";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Categories | tsgabrielle",
  description: "Shop all product categories at tsgabrielle.",
  path: "/categories"
});

export default function CategoriesIndexPage() {
  return (
    <section className="container-luxe py-14">
      <h1 className="font-display text-4xl">Categories</h1>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {CATEGORIES.map((category) => (
          <li key={category.href}>
            <Link href={category.href} className="text-phoenix">
              {category.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
