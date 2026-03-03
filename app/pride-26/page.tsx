import { CollectionPageTemplate } from "@/components/templates/ListingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Pride 26 | tsgabrielle",
  description: "Shop Pride 26 collection.",
  path: "/pride-26"
});

export default function Page() {
  return <CollectionPageTemplate title="🌈 Pride 26" slug="pride-26" />;
}

