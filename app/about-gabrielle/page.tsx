import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";
import { getPageContent } from "@/lib/content";

export const metadata = buildMetadata({
  title: "About Gabrielle",
  description: "About Gabrielle.",
  path: "/about-gabrielle"
});

export default async function Page() {
  const content = await getPageContent("/about-gabrielle");

  const title = content.title || "About Gabrielle";
  const subtitle = content.subtitle || "The Founder's Story";
  const heroImage = content.hero_image || "/images/slides/tsgabrielle-Slide3.png";
  const heroVideo = content.hero_video || "/videos/Gabrielle.mp4";
  const body = content.body || "The visionary behind tsgabrielle®...";

  return (
    <ContentPage 
      title={title}
      subtitle={subtitle}
      heroImage={heroImage}
      heroVideo={heroVideo}
      body={body} 
    />
  );
}
