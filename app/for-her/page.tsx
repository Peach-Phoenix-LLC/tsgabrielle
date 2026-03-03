import { CategoryPageTemplate } from "@/components/templates/ListingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "For Her | tsgabrielle",
  description: "Shop for her.",
  path: "/for-her"
});

export default function Page() {
  return <CategoryPageTemplate title="For Her 👗" slug="for-her" />;
}

