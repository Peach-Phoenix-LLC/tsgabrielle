import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Store Directory.",
  description: "Store directory listing.",
  path: "/store-directory"
});

export default function Page() {
  return <ContentPage title="Store Directory." body="Store directory by region and country." />;
}

