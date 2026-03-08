import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";
import { getPageContent } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Legal Disclaimer",
  description: "General information and absolute limitation of liability.",
  path: "/legal-disclaimer"
});

export default async function Page() {
  const content = await getPageContent("/legal-disclaimer");
  const title = content.title || "Legal Disclaimer";
  const body = content.body || "This disclaimer governs your use of our website. By using our website, you accept this disclaimer in full.";
  
  return <ContentPage title={title} body={body} />;
}
