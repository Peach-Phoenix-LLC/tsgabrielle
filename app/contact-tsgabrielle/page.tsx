import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";
import { getPageContent } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Contact tsgabrielle®",
  description: "Contact details for tsgabrielle.",
  path: "/contact-tsgabrielle"
});

export default async function Page() {
  const content = await getPageContent("/contact-tsgabrielle");
  const title = content.title || "Contact tsgabrielle®";
  const body = content.body || "Reach support and collaboration teams.";

  return <ContentPage title={title} body={body} />;
}

