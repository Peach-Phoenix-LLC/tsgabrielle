import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";
import { getPageContent } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How we handle your personal data.",
  path: "/privacy-policy"
});

export default async function Page() {
  const content = await getPageContent("/privacy-policy");
  const title = content.title || "Privacy Policy";
  const body = content.body || "Your privacy is our priority. We handle your data with the utmost care and transparency.";
  
  return <ContentPage title={title} body={body} />;
}
