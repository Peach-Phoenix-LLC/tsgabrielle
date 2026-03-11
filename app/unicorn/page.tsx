import { CollectionPageTemplate } from "@/components/templates/ListingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Unicorn 🦄 | tsgabrielle",
  description: "Shop Unicorn collection.",
  path: "/unicorn"
});

export default function Page() {
  return <CollectionPageTemplate title="Unicorn 🦄" slug="unicorn" />;
}

