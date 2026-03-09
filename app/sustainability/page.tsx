import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";
import { Check, Leaf, Heart, Globe, Recycle, Sparkles, MapPin } from "lucide-react";

export const metadata = buildMetadata({
  title: "Sustainability: Conscious Creation",
  description: "At tsgabrielle®, sustainability is a gravitational force. Discover our commitment to ethical, intentional, and planetary care.",
  path: "/sustainability"
});

export default function Page() {
  const sections = [
    {
      title: "Corporate Sustainability Statement",
      emoji: "🌱",
      content: (
        <div className="space-y-6">
          <p>
            tsgabrielle® is committed to building a responsible, transparent, and future‑focused ecosystem where creativity and sustainability coexist in harmony. Our mission is to reduce environmental impact through conscious material choices, ethical production practices, and a long‑term commitment to circular thinking.
          </p>
          <div className="bg-[#f9f9f9] p-8 rounded-3xl space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#a932bd]">Our Pledge</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Prioritize organic, certified, and vegan materials",
                "Partner only with ethical manufacturers",
                "Reduce waste through on‑demand production",
                "Explore low‑impact technologies",
                "Operate with transparency and integrity",
                "Build for long-term planetary care"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <Check size={16} className="text-[#a932bd] mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="italic text-base opacity-70">
            This statement represents our ongoing promise: to create a universe where luxury uplifts, design endures, and sustainability is woven into every fiber of our identity.
          </p>
        </div>
      )
    },
    {
      title: "Our Philosophy: Precision Over Excess",
      emoji: "🌿",
      content: (
        <div className="space-y-6">
          <p>
            The fashion industry is known for overproduction — mountains of unused inventory, wasted materials, and unnecessary environmental strain. tsgabrielle® rejects this model entirely.
          </p>
          <p>
            We embrace an <strong>on‑demand production system</strong>, ensuring no overstock, no unnecessary waste, and no mass‑produced excess. Every piece is created with intention, dramatically reducing environmental impact while honoring the value of thoughtful creation.
          </p>
        </div>
      )
    },
    {
      title: "Ethical Materials & Certifications",
      emoji: "♻️",
      content: (
        <div className="grid gap-8">
          <div className="space-y-4">
            <h4 className="text-xl font-medium text-[#111111]">Organic Cotton</h4>
            <p className="text-sm">
              Many of our textile partners use organic cotton, grown without toxic chemicals or harmful pesticides. This supports healthier soil, safer working conditions, and a reduced ecological footprint.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-xl font-medium text-[#111111]">GOTS‑Certified Standards</h4>
            <p className="text-sm">
              We prioritize materials that meet GOTS (Global Organic Textile Standard) — ensuring environmentally responsible harvesting, non‑toxic processing, and ethical labor practices from seed to final product.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-xl font-medium text-[#111111]">PETA‑Approved Vegan</h4>
            <p className="text-sm">
              Our printing processes use PETA‑Approved Vegan, water‑based inks, ensuring no animal‑derived ingredients and cleaner, safer, cruelty‑free production.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Responsible Manufacturing & Fair Labor",
      emoji: "🌍",
      content: (
        <div className="space-y-6">
          <p>
            We partner only with manufacturers who uphold fair wages, safe working environments, and transparent supply chains. Every partner is carefully vetted to ensure that the people behind our products are treated with dignity and respect.
          </p>
        </div>
      )
    },
    {
      title: "A Universe Designed for Longevity",
      emoji: "🌌",
      content: (
        <div className="space-y-6">
          <p>
            Sustainability extends beyond materials — it is a philosophy of timelessness. We design with durability, timeless aesthetics, and intentional collections. Luxury should uplift, inspire, and evolve, not deplete or harm.
          </p>
        </div>
      )
    }
  ];

  const infographic = (
    <div className="bg-[#111111] text-white p-12 md:p-20 rounded-[3rem] space-y-16">
      <div className="text-center space-y-4">
        <h3 className="text-[10px] uppercase tracking-[0.5em] text-[#a932bd] font-bold">At a Glance</h3>
        <h2 className="text-3xl md:text-5xl font-light tracking-tight">The Sustainability Map</h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 text-center">
        <div className="space-y-4">
          <div className="mx-auto w-12 h-12 flex items-center justify-center bg-white/5 rounded-full ring-1 ring-white/10">
            <Leaf size={20} className="text-[#a932bd]" />
          </div>
          <h4 className="text-[10px] uppercase tracking-widest font-bold">Materials</h4>
          <p className="text-[10px] opacity-60 leading-relaxed">Organic & Vegan</p>
        </div>
        <div className="space-y-4">
          <div className="mx-auto w-12 h-12 flex items-center justify-center bg-white/5 rounded-full ring-1 ring-white/10">
            <Recycle size={20} className="text-[#a932bd]" />
          </div>
          <h4 className="text-[10px] uppercase tracking-widest font-bold">Production</h4>
          <p className="text-[10px] opacity-60 leading-relaxed">On-Demand Focus</p>
        </div>
        <div className="space-y-4">
          <div className="mx-auto w-12 h-12 flex items-center justify-center bg-white/5 rounded-full ring-1 ring-white/10">
            <Globe size={20} className="text-[#a932bd]" />
          </div>
          <h4 className="text-[10px] uppercase tracking-widest font-bold">Ethics</h4>
          <p className="text-[10px] opacity-60 leading-relaxed">Fair & Safe Labor</p>
        </div>
        <div className="space-y-4">
          <div className="mx-auto w-12 h-12 flex items-center justify-center bg-white/5 rounded-full ring-1 ring-white/10">
            <Sparkles size={20} className="text-[#a932bd]" />
          </div>
          <h4 className="text-[10px] uppercase tracking-widest font-bold">Values</h4>
          <p className="text-[10px] opacity-60 leading-relaxed">Inclusive Luxury</p>
        </div>
        <div className="space-y-4">
          <div className="mx-auto w-12 h-12 flex items-center justify-center bg-white/5 rounded-full ring-1 ring-white/10">
            <MapPin size={20} className="text-[#a932bd]" />
          </div>
          <h4 className="text-[10px] uppercase tracking-widest font-bold">Future</h4>
          <p className="text-[10px] opacity-60 leading-relaxed">Circular Innovation</p>
        </div>
      </div>
    </div>
  );

  const bodyContent = (
    <div className="space-y-24">
      <div className="space-y-12">
        <p className="text-2xl font-light leading-relaxed text-[#111111]">
          At tsgabrielle®, sustainability is not a feature — it is a philosophy. It is the gravitational force that shapes every decision, every material, and every partnership. 
        </p>
        <p className="text-xl font-light text-[#555555]">
          We believe that modern luxury must be ethical, intentional, and deeply aligned with the well‑being of both people and planet.
        </p>
        <div className="grid gap-6 text-sm font-medium tracking-wide text-[#a932bd] border-l-2 border-[#a932bd]/20 pl-8 lg:text-base">
          <p>We create with purpose, not excess.</p>
          <p>We innovate with conscience, not compromise.</p>
          <p>We design with the understanding that true beauty honors the world that inspires it.</p>
        </div>
      </div>

      <div className="space-y-32">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-12">
            <div className="flex items-center gap-6 pb-6 border-b border-[#a932bd]/10">
              <span className="text-4xl">{section.emoji}</span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-[#111111] capitalize">
                {section.title}
              </h2>
            </div>
            <div className="text-[#555555] leading-loose pl-12">
              {section.content}
            </div>
          </div>
        ))}
      </div>

      {infographic}

      <div className="bg-[#f9f9f9] p-12 md:p-20 rounded-[3rem] text-center space-y-10">
        <h2 className="text-4xl font-light tracking-tight text-[#111111] capitalize">Join the Movement</h2>
        <p className="max-w-2xl mx-auto text-[#555555]">
          By choosing tsgabrielle®, you support ethical production, organic and vegan materials, fair labor, and a proudly LGBTQ+ owned brand. Together, we are shaping a future where fashion is conscious, expressive, and aligned with the values that matter.
        </p>
      </div>

      <p className="italic text-center text-black/40 pt-10 border-t border-[#e7e7e7]">
        "Sustainability is not a destination — it is a practice, a commitment, and a promise."
      </p>
    </div>
  );

  return (
    <ContentPage 
      title="Sustainability" 
      subtitle="Conscious Creation" 
      heroImage="/images/slides/tsgabrielle-Slide1.png"
      body={bodyContent} 
    />
  );
}
