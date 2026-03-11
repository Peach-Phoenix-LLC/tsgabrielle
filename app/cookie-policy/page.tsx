import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";
import { getPageContent } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Cookie Policy",
  description: "Information about how we use cookies.",
  path: "/cookie-policy"
});

export default async function Page() {
  const content = await getPageContent("/cookie-policy");
  const title = content.title || "Cookie Policy";
  const body = content.body || "We use cookies to enhance your journey through our universe. Learn how we personalize your experience.";
  
  return <ContentPage title={title} body={body} />;
}
