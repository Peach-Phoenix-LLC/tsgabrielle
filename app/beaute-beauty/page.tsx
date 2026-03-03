import { CategoryPageTemplate } from "@/components/templates/ListingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Beauté Beauty | tsgabrielle",
  description: "Shop Beauté Beauty products.",
  path: "/beaute-beauty"
});

export default function Page() {
  return <CategoryPageTemplate title="Beauté Beauty" slug="beaute-beauty" />;
}
