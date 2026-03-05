import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";
import { getPageContent } from "@/lib/content";

export const metadata = buildMetadata({
  title: "FAQ",
  description: "Frequently asked questions.",
  path: "/faq"
});

export default async function Page() {
  const content = await getPageContent("/faq");
  const title = content.title || "FAQ";
  const body = content.body || "Shipping, sizing, returns, and order status guidance.";
  
  return <ContentPage title={title} body={body} />;
}

