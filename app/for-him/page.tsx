import { CategoryPageTemplate } from "@/components/templates/ListingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "For Him | tsgabrielle",
  description: "Shop for him.",
  path: "/for-him"
});

export default function Page() {
  return <CategoryPageTemplate title="For Him 👔" slug="for-him" />;
}

