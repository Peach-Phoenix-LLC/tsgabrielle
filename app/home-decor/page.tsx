import { CategoryPageTemplate } from "@/components/templates/ListingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Home & Décor | tsgabrielle",
  description: "Shop home and decor products.",
  path: "/home-decor"
});

export default function Page() {
  return <CategoryPageTemplate title="🏡 Home & Décor" slug="home-decor" />;
}
