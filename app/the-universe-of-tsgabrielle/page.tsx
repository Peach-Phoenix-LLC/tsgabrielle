import Link from "next/link";
import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "The Universe of tsgabrielle®",
  description: "Explore the ecosystem of creativity, identity, and inclusive entrepreneurship at tsgabrielle®.",
  path: "/the-universe-of-tsgabrielle"
});

export default function Page() {
  const sections = [
    {
      title: "Your Inclusive Store",
      href: "/your-inclusive-store",
      content: "A space where creativity meets accessibility. Your Inclusive Store brings together thoughtfully curated products that embody the brand’s philosophy: expressive design, intentional choices, and a commitment to making everyone feel welcome, seen, and valued."
    },
    {
      title: "About Gabrielle",
      href: "/about-gabrielle",
      content: "Discover the story behind the brand. This section shares Gabrielle’s journey as a French trans creator and entrepreneur living in the United States — a story shaped by resilience, vision, and a dedication to building a universe where inclusivity and authenticity are foundational."
    },
    {
      title: "Sustainability",
      href: "/sustainability",
      content: "A commitment to mindful creation and long‑term impact. Here, tsgabrielle® highlights its approach to sustainability, grounded in responsible choices, environmental awareness, and a desire to contribute to a better, more conscious future."
    },
    {
      title: "The Blogs",
      href: "/the-blogs",
      content: "A home for ideas, reflections, and knowledge. The blog gathers articles exploring creativity, business, identity, innovation, and the evolving landscape that shapes the tsgabrielle® universe."
    },
    {
      title: "Videos",
      href: "/videos",
      content: "A dynamic window into the brand. The video section offers visual stories, insights, and creative content that bring the world of tsgabrielle® to life through movement, expression, and inclusive storytelling."
    }
  ];

  const bodyContent = (
    <div className="space-y-16">
      <div className="space-y-8">
        <p>
          Welcome to <strong>The Universe of tsgabrielle®</strong> — a space where creativity, identity, and purpose come together. 
          This universe reflects the heart of the brand: building something meaningful through innovation, curiosity, and inclusive entrepreneurship.
        </p>
        <p>
          More than a brand environment, <strong>The Universe of tsgabrielle®</strong> is a living ecosystem of projects, stories, and ideas 
          designed to inspire, inform, and connect. Every section represents a different facet of the journey — from values and products 
          to knowledge, expression, and community.
        </p>
        <p>Explore the elements that shape the world of tsgabrielle®:</p>
      </div>

      <div className="grid gap-20">
        {sections.map((section, idx) => (
          <div key={idx} className="group overflow-hidden">
            <div className="flex items-center gap-6 mb-8">
              <div className="relative w-16 h-16 transition-transform duration-700 group-hover:scale-110">
                <img 
                  src="/images/tsgabrielle-icon.png" 
                  alt="tsgabrielle icon" 
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-3xl font-light tracking-tight text-[#111111] capitalize">{section.title}</h3>
            </div>
            <div className="flex flex-col gap-8 items-start">
              <p className="text-xl leading-relaxed text-[#555555] font-light pl-6 pt-2 border-l border-[#a932bd]/20">
                {section.content}
              </p>
              <Link 
                href={section.href}
                className="btn-holographic-outline ml-6"
              >
                Discover
              </Link>
            </div>
          </div>
        ))}
      </div>

      <p className="pt-12 border-t border-[#e7e7e7] italic text-center">
        Together, these elements form <strong>The Universe of tsgabrielle®</strong> — a growing ecosystem built on creativity, inclusivity, entrepreneurship, and the continuous exploration of new possibilities.
      </p>
    </div>
  );

  return <ContentPage title="The Universe of tsgabrielle®" body={bodyContent} />;
}

