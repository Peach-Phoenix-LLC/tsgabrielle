import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Stores Directory",
  description: "Stores directory listing.",
  path: "/stores-directory"
});

export default function Page() {
  return <ContentPage title="Stores Directory" body="Alternative stores directory index." />;
}

