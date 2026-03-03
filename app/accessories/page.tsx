import { CategoryPageTemplate } from "@/components/templates/ListingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Accessories | tsgabrielle",
  description: "Shop accessories.",
  path: "/accessories"
});

export default function Page() {
  return <CategoryPageTemplate title="Accessories" slug="accessories" />;
}
