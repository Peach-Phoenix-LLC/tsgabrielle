import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Your Inclusive Store: The Nexus of Creation",
  description: "Welcome to the commercial heart of the tsgabrielle® universe — a nexus where visionary ideas and intentional products converge.",
  path: "/your-inclusive-store"
});

export default function Page() {
  const bodyContent = (
    <div className="space-y-24">
      {/* Intro section */}
      <div className="space-y-8">
        <p className="text-2xl font-light leading-relaxed text-[#111111]">
          Welcome to <strong>Your Store Inclusive</strong>, the commercial heart of the tsgabrielle® universe. 
          This is more than a marketplace — it is a radiant nexus where visionary ideas and intentional products 
          converge to form new constellations.
        </p>
        <p>
          Every piece in our collection is a reflection of our core philosophy: 
          a harmony of creativity, accessible design, and purposeful craftsmanship.
        </p>
      </div>

      {/* Mission Section */}
      <div className="group grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-square overflow-hidden rounded-[2rem] shadow-luxe">
          <img 
            src="/images/tsgabrielle2.png" 
            alt="The Nexus of Creation" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-4xl font-light tracking-tight text-[#111111] uppercase">Our Mission Statement</h2>
          <div className="space-y-4 text-[#555555]">
            <p>
              At tsgabrielle®, our mission is to illuminate the meeting point between bold innovation and conscious living. 
              We are building a boundless realm where creativity flows freely and every individual can find their own stellar alignment.
            </p>
            <p>
              Guided by intentionality and fearless curiosity, we craft products that resonate with meaning — 
              proving that excellence is never accidental, but the result of deliberate, cosmic design.
            </p>
          </div>
        </div>
      </div>

      {/* Transitional text */}
      <p className="text-center text-2xl font-light italic py-12 border-y border-[#e7e7e7]">
        Your Store Inclusive is an ever‑expanding ecosystem, created to empower our community to dream without limits 
        and to explore the infinite possibilities of self‑expression.
      </p>

      {/* LGBTQ+ Section */}
      <div className="group grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 md:order-1">
          <h2 className="text-4xl font-light tracking-tight text-[#111111] uppercase">Proudly LGBTQ+ Business Owned</h2>
          <div className="space-y-4 text-[#555555]">
            <p>
              Inclusion is not an accessory at tsgabrielle® — it is our origin, our compass, and our commitment. 
              As a proudly LGBTQ+ owned and operated business, we understand that diversity is the spark that ignites true innovation.
            </p>
            <p>
              Our perspective is shaped by the courage to live authentically in a vast universe. We honor that truth by 
              cultivating a space where all identities are celebrated, and where every voice contributes to a vibrant 
              tapestry of shared stories and lived wisdom.
            </p>
            <p>
              When you support Your Store Inclusive, you are investing in a vision that champions equality, 
              visibility, and the unshakable right to shine.
            </p>
          </div>
        </div>
        <div className="relative aspect-square overflow-hidden rounded-[2rem] shadow-luxe md:order-2">
          <img 
            src="/images/tsgabrielle-lgtbq.png" 
            alt="LGBTQ+ Owned Business" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Pillars Section */}
      <div className="bg-[#f9f9f9] -mx-6 md:-mx-10 p-12 md:p-20 rounded-[3rem]">
        <h2 className="text-4xl font-light tracking-tight text-[#111111] uppercase text-center mb-16">The Pillars of Our Nexus</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-[#a932bd] uppercase tracking-wider">Accessible Innovation</h3>
            <p className="text-[#555555]">
              We believe exceptional design should be within reach for all who seek it — creativity without gatekeeping.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-[#a932bd] uppercase tracking-wider">Intentional Curation</h3>
            <p className="text-[#555555]">
              No filler, no noise. Every product serves a purpose, guiding you along your personal journey.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-[#a932bd] uppercase tracking-wider">Radical Authenticity</h3>
            <p className="text-[#555555]">
              Rooted in our LGBTQ+ identity, we operate with transparency, integrity, and a commitment to truth in every decision.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return <ContentPage title="Your Inclusive Store" subtitle="The Nexus of Creation" body={bodyContent} />;
}

