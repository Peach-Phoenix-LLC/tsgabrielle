import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact tsgabrielle®",
  description: "Contact details for tsgabrielle.",
  path: "/contact-tsgabrielle"
});

export default function Page() {
  return <ContentPage title="Contact tsgabrielle®" body="Reach support and collaboration teams." />;
}

