import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";
import { getPageContent } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Copyright and Trademark Notice",
  description: "Formal legally binding declaration of intellectual property rights.",
  path: "/copyright-trademark"
});

export default async function Page() {
  const content = await getPageContent("/copyright-trademark");
  const title = content.title || "Copyright and Trademark Notice";
  const body = content.body || "This notice serves as a formal declaration of the intellectual property rights exclusively held by Peach Phoenix, LLC.";
  
  return <ContentPage title={title} body={body} />;
}
