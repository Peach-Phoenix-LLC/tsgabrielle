import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";
import { getPageContent } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Accessibility Statement",
  description: "Our commitment to digital inclusion and accessibility for all.",
  path: "/accessibility-statement"
});

export default async function Page() {
  const content = await getPageContent("/accessibility-statement");
  const title = content.title || "Accessibility Statement";
  const body = content.body || "We are committed to ensuring digital accessibility for people with disabilities.";
  
  return <ContentPage title={title} body={body} />;
}
