import { CollectionPageTemplate } from "@/components/templates/ListingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Made In USA | tsgabrielle",
  description: "Shop Made In USA collection.",
  path: "/made-in-usa"
});

export default function Page() {
  return <CollectionPageTemplate title="Made In USA" slug="made-in-usa" />;
}

