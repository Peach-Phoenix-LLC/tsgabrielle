import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";
import { getPageContent } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Sustainability",
  description: "Sustainability commitments.",
  path: "/sustainability"
});

export default async function Page() {
  const content = await getPageContent("/sustainability");

  const title = content.title || "Sustainability";
  const subtitle = content.subtitle || "Our Commitment";
  const heroImage = content.hero_image || "/images/slides/tsgabrielle-Slide1.png";

  const sustainabilityContent = (
    <div className="space-y-8">
      {content.body ? (
        <div dangerouslySetInnerHTML={{ __html: content.body }} />
      ) : (
        <>
          <p>
            <strong className="text-xl text-[#111111] block mb-4">Conscious Creation</strong>
            At tsgabrielle®, we understand that true luxury must be responsible. 
            Our commitment to the Earth is woven into our business model and the very fabric of our pieces. We do not believe in excess; we believe in precision.
          </p>
          
          <p>
            By utilizing an agile, on-demand production philosophy, we eliminate the immense waste traditionally associated with high-end fashion lines. 
            Each piece of the tsgabrielle® dimension is created specifically when requested, ensuring that energy and materials are utilized only to fulfill a purpose.
          </p>

          <div className="py-8 my-8 border-y border-[#e7e7e7] text-center">
            <span className="text-2xl italic tracking-wide text-[#111111]">
              "Sustainability is not an afterthought; it is the foundation of modern luxury."
            </span>
          </div>

          <p>
            Our partners are carefully selected to ensure ethical sourcing, fair labor practices, and materials that meet stringent ecological guidelines. 
            From water-based vegan inks to responsibly sourced premium textiles, our focus is continuously on elevating quality while minimizing footprint.
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
      body={sustainabilityContent} 
    />
  );
}
