import { CollectionPageTemplate } from "@/components/templates/ListingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Arizona 🌵 | tsgabrielle",
  description: "Shop Arizona collection.",
  path: "/arizona"
});

export default function Page() {
  return <CollectionPageTemplate title="Arizona 🌵" slug="arizona" />;
}

