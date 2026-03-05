import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";
import { getPageContent } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Legal Hub",
  description: "Policies and legal resources.",
  path: "/legal-hub"
});

export default async function Page() {
  const content = await getPageContent("/legal-hub");
  const title = content.title || "Legal Hub";
  const body = content.body || "Terms, privacy, and policy documentation.";

  return <ContentPage title={title} body={body} />;
}

