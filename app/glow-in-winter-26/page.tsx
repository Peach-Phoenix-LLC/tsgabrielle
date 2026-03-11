import { CollectionPageTemplate } from "@/components/templates/ListingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Glow in Winter 26 | tsgabrielle",
  description: "Shop Glow in Winter 26 collection.",
  path: "/glow-in-winter-26"
});

export default function Page() {
  return <CollectionPageTemplate title="❄️ Glow in Winter 26" slug="glow-in-winter-26" />;
}

