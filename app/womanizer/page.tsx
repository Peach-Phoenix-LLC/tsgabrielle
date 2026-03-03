import { CollectionPageTemplate } from "@/components/templates/ListingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Womanizer | tsgabrielle",
  description: "Shop Womanizer collection.",
  path: "/womanizer"
});

export default function Page() {
  return <CollectionPageTemplate title="Womanizer" slug="womanizer" />;
}

