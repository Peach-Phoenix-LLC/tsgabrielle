import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";
import { getPageContent } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Shipping Policy",
  description: "Worldwide shipping information.",
  path: "/shipping-policy"
});

export default async function Page() {
  const content = await getPageContent("/shipping-policy");
  const title = content.title || "Shipping Policy";
  const body = content.body || "Transcendent delivery across the globe. We ensure your items arrive with the care they deserve.";
  
  return <ContentPage title={title} body={body} />;
}
