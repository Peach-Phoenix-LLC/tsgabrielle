import Link from "next/link";
import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Meet tsgabrielle®",
  description: "Discover the philosophy, identity, and the ideas that shape the expanding tsgabrielle® universe.",
  path: "/meet-tsgabrielle"
});

export default function Page() {
  const sections = [
    {
      title: "The Brand",
      href: "/the-brand",
      image: "/images/tsgabrielle-logo.png",
      content: "tsgabrielle® is a universe built on creativity, innovation, and independent entrepreneurship. Its identity is shaped by exploration and adaptability — embracing modern tools, evolving markets, and new ways of thinking."
    },
    {
      title: "Peaches",
      href: "/peaches",
      image: "/images/tsgabrielle2.png",
      content: "Peaches is the symbolic heartbeat of tsgabrielle® — a playful, expressive element that brings lightness and imagination into the universe. It represents the softer, more whimsical side of the brand."
    },
    {
      title: "FAQ",
      href: "/faq",
      image: "/images/slides/tsgabrielle-Slide2.png",
      content: "The FAQ section offers clear, accessible answers to the most common questions about tsgabrielle®. From brand details and services to policies and general inquiries."
    },
    {
      title: "Legal Hub",
      href: "/legal-hub",
      image: "/images/slides/tsgabrielle-Slide1.png",
      content: "The Legal Hub serves as the central source for all legal and policy-related information connected to tsgabrielle®. Transparency and trust are the foundation of our universe."
    },
    {
      title: "Contact tsgabrielle®",
      href: "/contact-tsgabrielle",
      image: "/images/slides/tsgabrielle-Slide4.png",
      content: "Whether you’re reaching out for collaborations, inquiries, feedback, or conversation, this space opens the door to meaningful engagement with the brand."
    }
  ];

  const bodyContent = (
    <div className="space-y-16">
      <div className="space-y-8">
        <p className="text-2xl font-light leading-relaxed text-[#111111]">
          Welcome to <strong>Meet tsgabrielle®</strong>, the gateway to understanding the essence of the brand — 
          its philosophy, identity, and the ideas that shape its expanding universe.
        </p>
        <p className="text-[#555555]">
          This space invites you to explore how tsgabrielle® thinks, creates, and connects, offering a clear view into 
          the values and vision that guide every initiative.
        </p>
      </div>

      <div className="grid gap-20">
        {sections.map((section, idx) => (
          <div key={idx} className="group overflow-hidden">
            <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
              <div className="relative w-full md:w-1/3 aspect-[4/3] rounded-3xl overflow-hidden shadow-luxe transition-transform duration-1000 group-hover:scale-105">
                <img 
                  src={section.image} 
                  alt={section.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10">
                    <img 
                      src="/images/tsgabrielle-icon.png" 
                      alt="tsgabrielle icon" 
                      className="w-full h-full object-contain opacity-40 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <h3 className="text-3xl font-light tracking-tight text-[#111111] capitalize">{section.title}</h3>
                </div>
                <p className="text-xl leading-relaxed text-[#555555] font-light pl-6 border-l border-[#a932bd]/20">
                  {section.content}
                </p>
                <div className="pt-4 ml-6">
                  <Link 
                    href={section.href}
                    className="btn-holographic-outline"
                  >
                    Discover
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="pt-12 border-t border-[#e7e7e7] italic text-center text-black/60">
        "Curiosity, originality, and the pursuit of thoughtful, intentional progress define our journey."
      </p>
    </div>
  );

  return <ContentPage title="Meet tsgabrielle®" body={bodyContent} />;
}

