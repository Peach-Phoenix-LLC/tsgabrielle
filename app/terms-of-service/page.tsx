import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";
import { getPageContent } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description: "Terms and conditions for using our services.",
  path: "/terms-of-service"
});

export default async function Page() {
  const content = await getPageContent("/terms-of-service");
  const title = content.title || "Terms of Service";
  const body = content.body || "By using our website, you agree to our terms and conditions designed to ensure a premium experience for all.";
  
  return <ContentPage title={title} body={body} />;
}
