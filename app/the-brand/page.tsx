import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";
import { getPageContent } from "@/lib/content";
import { sanitizeHtml } from "@/lib/sanitize";

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
        <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(content.body) }} />
      ) : (
        <>
          <p>
            tsgabrielle&reg; is a modern fashion brand created to celebrate freedom, elegance, and self-expression.
          </p>
          
          <p>
            Founded by Peach Phoenix, LLC, the brand blends contemporary design with a spirit of inclusivity, creating clothing and accessories that empower individuals to express who they are without limits.
          </p>

          <p>
            At the heart of tsgabrielle&reg; lies a simple but powerful idea: style is identity. Fashion is not just about appearance&mdash;it is a language. Through color, texture, and form, every piece becomes a way to communicate confidence, individuality, and pride.
          </p>

          <p>
            Inspired by global culture&mdash;from the elegance of Parisian fashion to the vibrant energy of Arizona&mdash;tsgabrielle&reg; creates collections that feel both modern and timeless. Clean silhouettes, minimalist aesthetics, and symbolic elements such as the peach and phoenix reflect renewal, authenticity, and transformation.
          </p>

          <p>
            The brand&rsquo;s philosophy centers on respect, dignity, solidarity, and inclusion. While proudly connected to the spirit of the transgender community, tsgabrielle&reg; is designed for everyone&mdash;women, men, and anyone who believes fashion should be a space of freedom.
          </p>

          <p>
            Each product is developed with attention to quality, comfort, and design harmony. The goal is simple: create pieces that feel good to wear, look refined, and carry a deeper message of positivity.
          </p>

          <div className="py-8 my-8 border-y border-[#e7e7e7] text-center">
            <span className="text-2xl italic tracking-wide text-[#111111]">
              "tsgabrielle&reg; is more than apparel.<br/>
              It is a movement of style, confidence, and good energy."
            </span>
          </div>

          <p className="text-center">
            <strong>tsgabrielle&reg;</strong><br/>
            The French Trans Touch&trade;
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
