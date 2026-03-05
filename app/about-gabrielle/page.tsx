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
  
  const brandStory = (
    <div className="space-y-8">
      {content.body ? (
        <div dangerouslySetInnerHTML={{ __html: content.body }} />
      ) : (
        <>
          <p>
            <strong className="text-xl text-[#111111] block mb-4">A Vision of Inclusivity</strong>
            Born from the belief that true luxury must be radically inclusive, tsgabrielle® was founded to redefine the landscape of high-end aesthetics. The journey began not just as a design endeavor, but as a commitment to creating an ethereal dimension where identity, expression, and liquid aesthetics seamlessly merge.
          </p>
          
          <div className="py-8 my-8 border-y border-[#e7e7e7] text-center">
            <span className="text-2xl italic tracking-wide text-[#111111]">
              "Elegance is not confined by boundaries; it is the universal language of self-expression."
            </span>
          </div>

          <p>
            Every piece within the tsgabrielle® universe is meticulously crafted, focusing on material innovation and a fluid design vernacular. From our "Peach Phoenix™" creations to the "Edition Spatiale", the brand challenges traditional conventions by elevating the concept of 'inclusive luxury'—putting contemporary global citizens at the absolute center of our ethos.
          </p>
          <p>
            Gabrielle’s vision is simple yet profound: to design clothing, accessories, and experiences that are not merely worn, but inhabited. Welcome to the new era.
          </p>
        </>
      )}
    </div>
  );

  return (
    <ContentPage 
      title={title}
      subtitle={subtitle}
      heroImage={heroImage}
      body={brandStory} 
    />
  );
}
