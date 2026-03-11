import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Gabrielle: The Visionary",
  description: "Discover the journey of Gabrielle, a French trans creator and entrepreneur building a universe of inclusivity and authenticity.",
  path: "/about-gabrielle"
});

export default function Page() {
  const bodyContent = (
    <div className="space-y-12">
      <div className="space-y-8">
        <p className="text-2xl font-light leading-relaxed text-[#111111]">
          A journey shaped by resilience, vision, and a dedication to building a universe where inclusivity and authenticity are foundational.
        </p>
        <p className="text-[#555555]">
          As a French trans creator and entrepreneur living in the United States, Gabrielle brings a unique, international perspective to everything she builds. Her story is one of transformation — not just of self, but of the spaces she inhabits and the brand she leads.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center py-12 border-y border-[#e7e7e7]">
        <div className="space-y-6">
          <h2 className="text-3xl font-light tracking-tight text-[#111111] capitalize">The French Trans Touch™</h2>
          <p className="text-[#555555]">
            This signature identity reflects Gabrielle’s roots and her transition into the American landscape. It combines the effortless elegance of Parisian aesthetics with the bold, innovative spirit of the Phoenix, Arizona culture. It is an invitation to explore a world where boundaries are dissolved and identity is celebrated.
          </p>
        </div>
        <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-luxe">
          <img 
            src="/images/slides/tsgabrielle-Slide3.png" 
            alt="Gabrielle's Vision" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="space-y-8">
        <h2 className="text-3xl font-light tracking-tight text-[#111111] capitalize">Building an Inclusive Ecosystem</h2>
        <p className="text-[#555555]">
          For Gabrielle, entrepreneurship is a tool for social progress. Beyond products, she is building an ecosystem designed to inspire, inform, and connect a global community that values creativity and human dignity. Every initiative under the tsgabrielle® banner is guided by the pursuit of thoughtful, intentional progress.
        </p>
      </div>

      <p className="italic text-center text-black/40 pt-10 border-t border-[#e7e7e7]">
        "Resilience is the stardust from which our most beautiful universes are born."
      </p>
    </div>
  );

  return (
    <ContentPage 
      title="About Gabrielle" 
      subtitle="The Founder's Story"
      heroVideo="/videos/Gabrielle.mp4"
      body={bodyContent} 
    />
  );
}
