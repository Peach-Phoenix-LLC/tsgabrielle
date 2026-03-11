import { CollectionPageTemplate } from "@/components/templates/ListingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Paris | tsgabrielle",
  description: "Shop Paris collection.",
  path: "/paris"
});

export default function Page() {
  return <CollectionPageTemplate title="Paris" slug="paris" />;
}

