import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Sustainability",
  description: "Sustainability commitments.",
  path: "/sustainability"
});

export default function Page() {
  return <ContentPage title="Sustainability" body="Responsible sourcing and print-on-demand production." />;
}

