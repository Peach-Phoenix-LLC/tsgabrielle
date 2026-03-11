import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "The Collabs: Visionary Partnerships",
  description: "Explore the limited-edition collaboration lines at tsgabrielle®. Creative partnerships that push the boundaries of design.",
  path: "/the-collabs"
});

export default function Page() {
  const bodyContent = (
    <div className="space-y-16">
      <div className="space-y-8">
        <p className="text-2xl font-light leading-relaxed text-[#111111]">
          Creative partnerships that push the boundaries of design. Explore the limited-edition collaboration lines at the intersection of our universe and visionary peers.
        </p>
        <p className="text-[#555555]">
          At tsgabrielle®, we believe in the power of collective imagination. Our collaborations are carefully curated to bring new perspectives into the brand, blending our French Trans Touch™ with the unique aesthetics of our partners.
        </p>
      </div>

      <div className="grid gap-12">
        <div className="group p-10 bg-white border border-black/5 rounded-[2rem] hover:border-[#a932bd]/20 transition-all duration-700 shadow-sm">
          <h3 className="text-2xl font-light text-[#a932bd] mb-4 capitalize">Legacy & Innovation</h3>
          <p className="text-[#555555] leading-relaxed">
            By partnering with established brands and emerging creators, we create dialogue between tradition and forward-thinking design. These limited series represent the pinnacle of our creative exploration.
          </p>
        </div>
      </div>

      <p className="text-center text-[#555555] opacity-60 py-12 border-t border-[#e7e7e7]">
        Stay connected for upcoming announcements regarding our 2026 collaboration series.
      </p>
    </div>
  );

  return (
    <ContentPage 
      title="The Collabs" 
      subtitle="Visionary Partnerships"
      heroImage="/images/slides/tsgabrielle-Slide2.png"
      body={bodyContent} 
    />
  );
}
