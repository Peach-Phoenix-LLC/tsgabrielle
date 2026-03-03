import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "USA",
  description: "USA store availability.",
  path: "/usa"
});

export default function Page() {
  return <ContentPage title="USA" body="United States store and shipping coverage." />;
}
