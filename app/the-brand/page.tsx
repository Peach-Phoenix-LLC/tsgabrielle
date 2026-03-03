import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "The Brand",
  description: "The tsgabrielle brand story.",
  path: "/the-brand"
});

export default function Page() {
  return <ContentPage title="The Brand" body="Luxury positioning with inclusion at the center." />;
}

