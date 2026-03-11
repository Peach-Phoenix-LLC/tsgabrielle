import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "The Blogs: Ideas & Reflections",
  description: "A home for creativity, business, identity, and innovation. Explore the evolving landscape that shapes the tsgabrielle® universe.",
  path: "/the-blogs"
});

export default function Page() {
  const bodyContent = (
    <div className="space-y-16">
      <div className="space-y-8">
        <p className="text-2xl font-light leading-relaxed text-[#111111]">
          A home for ideas, reflections, and knowledge. The blog gathers articles exploring creativity, business, identity, innovation, and the evolving landscape of our universe.
        </p>
        <p className="text-[#555555]">
          Through the tsgabrielle® editorial lens, we dive deep into the intersections of modern life and intentional design. Our pieces are crafted to inspire curiosity and provide insights into the journey of building an inclusive brand.
        </p>
      </div>

      <div className="grid gap-12">
        {[
          {
            title: "Identity & Innovation",
            content: "Exploring how personal truth drives professional progress and the power of authentic building."
          },
          {
            title: "Inclusive Entrepreneurship",
            content: "Practical insights and philosophical reflections on creating businesses that welcome everyone."
          },
          {
            title: "Design Horizons",
            content: "A look at the materials, aesthetics, and concepts shaping the future of tsgabrielle® collections."
          }
        ].map((topic, i) => (
          <div key={i} className="group p-8 border border-black/5 rounded-3xl hover:border-[#a932bd]/20 transition-all duration-700 hover:bg-[#f9f9f9]">
            <h3 className="text-2xl font-light text-[#111111] mb-4 group-hover:text-[#a932bd] transition-colors capitalize">{topic.title}</h3>
            <p className="text-[#555555] font-light italic">{topic.content}</p>
          </div>
        ))}
      </div>

      <p className="text-center text-[#555555] opacity-60 py-12 border-t border-[#e7e7e7]">
        Stay connected as we prepare to launch our full editorial series in 2026.
      </p>
    </div>
  );

  return (
    <ContentPage 
      title="The Blogs" 
      subtitle="Editorial & Insights"
      heroImage="/images/slides/tsgabrielle-Slide3.png"
      body={bodyContent} 
    />
  );
}
