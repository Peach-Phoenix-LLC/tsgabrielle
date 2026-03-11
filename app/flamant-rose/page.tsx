import { CollectionPageTemplate } from "@/components/templates/ListingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Flamant 🦩 Rose | tsgabrielle",
  description: "Shop Flamant Rose collection.",
  path: "/flamant-rose"
});

export default function Page() {
  return <CollectionPageTemplate title="Flamant 🦩 Rose" slug="flamant-rose" />;
}

