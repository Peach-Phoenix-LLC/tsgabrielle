import { CollectionPageTemplate } from "@/components/templates/ListingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "TransFLOWer™ | tsgabrielle",
  description: "Shop TransFLOWer™ collection.",
  path: "/transflower"
});

export default function Page() {
  return <CollectionPageTemplate title="TransFLOWer™" slug="transflower" />;
}

