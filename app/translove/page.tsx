import { CollectionPageTemplate } from "@/components/templates/ListingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "TransLove™ | tsgabrielle",
  description: "Shop TransLove™ collection.",
  path: "/translove"
});

export default function Page() {
  return <CollectionPageTemplate title="TransLove™" slug="translove" />;
}

