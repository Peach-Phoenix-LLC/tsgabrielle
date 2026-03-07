import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";
import { getPageContent } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Refund Policy",
  description: "Information about returns and refunds.",
  path: "/refund-policy"
});

export default async function Page() {
  const content = await getPageContent("/refund-policy");
  const title = content.title || "Refund Policy";
  const body = content.body || "We stand behind our quality. If you are not satisfied, our refund policy outlines how we make it right.";
  
  return <ContentPage title={title} body={body} />;
}
