import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";
import { getPageContent } from "@/lib/content";

export const metadata = buildMetadata({
  title: "The Brand",
  description: "The tsgabrielle brand story.",
  path: "/the-brand"
});

export default async function Page() {
  const content = await getPageContent("/the-brand");

  const title = content.title || "The Brand";
  const subtitle = content.subtitle || "Philosophy & Craft";
  const heroImage = content.hero_image || "/images/slides/tsgabrielle-Slide2.png";

  const brandPhilosophy = (
    <div className="space-y-8">
      {content.body ? (
        <div dangerouslySetInnerHTML={{ __html: content.body }} />
      ) : (
        <>
          <p>
            <strong className="text-xl text-[#111111] block mb-4">Ethereal Craftsmanship</strong>
            At tsgabrielle®, we believe luxury should be an immersive experience. Designed for the modern era, our brand serves as the nexus of art, identity, and avant-garde fashion. 
            Each collection is a curated exploration of form and function.
          </p>
          
          <p>
            Our design philosophy goes beyond aesthetics—it is a movement toward authentic representation. 
            We carefully source materials that speak to sustainability, durability, and unapologetic elegance. The result is a wardrobe that does not discriminate by shape, gender, or background, but instead empowers the wearer's unique individuality.
          </p>

          <div className="py-8 my-8 border-y border-[#e7e7e7] text-center">
            <span className="text-2xl italic tracking-wide text-[#111111]">
              "Liquid luxury, inclusive design, uncompromising quality."
            </span>
          </div>

          <p>
            From the drawing board to the final stitch, a tsgabrielle® piece is intended to be a timeless artifact. 
            This is not fast fashion; this is slow, deliberate artistry crafted for an ethereal dimension.
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
      body={brandPhilosophy} 
    />
  );
}
