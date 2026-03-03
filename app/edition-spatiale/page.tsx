import { CollectionPageTemplate } from "@/components/templates/ListingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Édition Spatiale | tsgabrielle",
  description: "Shop Édition Spatiale collection.",
  path: "/edition-spatiale"
});

export default function Page() {
  return <CollectionPageTemplate title="🌌✨ Édition Spatiale" slug="edition-spatiale" />;
}

