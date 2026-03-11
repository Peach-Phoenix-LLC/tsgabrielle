import { CollectionPageTemplate } from "@/components/templates/ListingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Crystal Skies | tsgabrielle",
  description: "Shop Crystal Skies collection.",
  path: "/crystal-skies"
});

export default function Page() {
  return <CollectionPageTemplate title="Crystal Skies." slug="crystal-skies" />;
}

