import { CollectionPageTemplate } from "@/components/templates/ListingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Good Vibes Only | tsgabrielle",
  description: "Shop Good Vibes Only collection.",
  path: "/good-vibes-only"
});

export default function Page() {
  return <CollectionPageTemplate title="Good Vibes Only." slug="good-vibes-only" />;
}
