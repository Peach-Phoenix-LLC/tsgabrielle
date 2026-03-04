import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "The Brand",
  description: "The tsgabrielle brand story.",
  path: "/the-brand"
});

export default function Page() {
  const brandPhilosophy = (
    <div className="space-y-8">
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
    </div>
  );

  return (
    <ContentPage 
      title="The Brand" 
      subtitle="Philosophy & Craft"
      heroImage="/images/slides/tsgabrielle-Slide2.png"
      body={brandPhilosophy} 
    />
  );
}
