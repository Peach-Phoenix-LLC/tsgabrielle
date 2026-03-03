import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "The Collabs | tsgabrielle",
  description: "Explore collaboration partners.",
  path: "/the-collabs"
});

export default function Page() {
  return <ContentPage title="The Collabs" body="Explore limited-edition collaboration lines." />;
}

