import Link from "next/link";
import { COLLECTIONS } from "@/lib/menu";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Collections | tsgabrielle",
  description: "Explore all luxury collections at tsgabrielle.",
  path: "/collections"
});

export default function CollectionsIndexPage() {
  return (
    <section className="container-luxe py-14">
      <h1 className="font-display text-4xl">Collections</h1>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {COLLECTIONS.map((collection) => (
          <li key={collection.href}>
            <Link href={collection.href} className="text-phoenix">
              {collection.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
