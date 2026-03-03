import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Peaches",
  description: "Peaches community.",
  path: "/peaches"
});

export default function Page() {
  return <ContentPage title="Peaches" body="Community stories and customer spotlights." />;
}

