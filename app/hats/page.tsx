export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { CategoryPageTemplate } from "@/components/templates/ListingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Hats | tsgabrielle",
  description: "Shop hats.",
  path: "/hats"
});

export default function Page() {
  return <CategoryPageTemplate title="Hats" slug="hats" />;
}

