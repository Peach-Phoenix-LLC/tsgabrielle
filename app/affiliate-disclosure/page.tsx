import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";
import { getPageContent } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Affiliate Disclosure",
  description: "Transparency regarding our financial relationships with third-party vendors.",
  path: "/affiliate-disclosure"
});

export default async function Page() {
  const content = await getPageContent("/affiliate-disclosure");
  const title = content.title || "Affiliate Disclosure";
  const body = content.body || "In the interest of transparency, we disclose our participation in affiliate marketing programs.";
  
  return <ContentPage title={title} body={body} />;
}
