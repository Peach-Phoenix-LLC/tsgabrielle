import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";
import { getPageContent } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Community Guidelines",
  description: "Standards of respect, decorum, and content integrity for our community.",
  path: "/community-guidelines"
});

export default async function Page() {
  const content = await getPageContent("/community-guidelines");
  const title = content.title || "Community Guidelines";
  const body = content.body || "Our community is built on respect and inclusion. These guidelines ensure a safe space for everyone.";
  
  return <ContentPage title={title} body={body} />;
}
