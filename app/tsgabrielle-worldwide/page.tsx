import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "tsgabrielle® Worldwide",
  description: "Explore the global reach of tsgabrielle®. Access our international stores and market directories.",
  path: "/tsgabrielle-worldwide"
});

export default function Page() {
  const bodyContent = (
    <div className="space-y-16">
      <div className="space-y-8">
        <p className="text-2xl font-light leading-relaxed text-[#111111]">
          A global ecosystem of creativity and inclusivity. Navigate our international presence and discover how tsgabrielle® connects with the world.
        </p>
        <p className="text-[#555555]">
          tsgabrielle® is more than a local brand — it is a boundless realm spanning continents. Whether you are in the United States, Europe, or beyond, our mission remains the same: to provide a space where everyone can find their own stellar alignment through intentional design.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="p-10 bg-[#f9f9f9] rounded-[2rem] space-y-6">
          <h3 className="text-2xl font-light text-[#111111] capitalize">United States</h3>
          <p className="text-sm text-[#555555] leading-relaxed">
            Our primary hub, based in Phoenix, Arizona. From this nexus, we coordinate our global logistics and creative initiatives, serving the American market with pride and precision.
          </p>
        </div>
        <div className="p-10 bg-[#f9f9f9] rounded-[2rem] space-y-6 border border-[#a932bd]/10">
          <h3 className="text-2xl font-light text-[#111111] capitalize">International Reach</h3>
          <p className="text-sm text-[#555555] leading-relaxed">
            Shipping to the far reaches of the cosmos. Our logistics network ensures that tsgabrielle® products are accessible to international clients, bringing the French Trans Touch™ to a global audience.
          </p>
        </div>
      </div>

      <p className="italic text-center text-black/40 pt-10 border-t border-[#e7e7e7]">
        "A universe without borders, built on shared values and global connection."
      </p>
    </div>
  );

  return (
    <ContentPage 
      title="tsgabrielle® Worldwide" 
      subtitle="Global Ecosystem"
      heroImage="/images/slides/tsgabrielle-Slide1.png"
      body={bodyContent} 
    />
  );
}
