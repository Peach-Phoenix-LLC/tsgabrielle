import { CollectionPageTemplate } from "@/components/templates/ListingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Peach Phoenix™ | tsgabrielle",
  description: "Shop Peach Phoenix™ collection.",
  path: "/peach-phoenix"
});

export default function Page() {
  return <CollectionPageTemplate title="Peach Phoenix™" slug="peach-phoenix" />;
}

