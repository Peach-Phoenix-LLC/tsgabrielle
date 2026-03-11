import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Champion® Heritage",
  description: "Champion heritage collection.",
  path: "/champion-heritage"
});

export default function Page() {
  return <ContentPage title="Champion® Heritage" body="Streetwear classics with inclusive sizing." />;
}

