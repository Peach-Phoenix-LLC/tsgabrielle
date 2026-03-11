import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Videos: A Window into the Brand",
  description: "Visual stories, insights, and creative content that bring the world of tsgabrielle® to life.",
  path: "/videos"
});

export default function Page() {
  const bodyContent = (
    <div className="space-y-16">
      <div className="space-y-8">
        <p className="text-2xl font-light leading-relaxed text-[#111111]">
          A dynamic window into the brand. Visual stories, insights, and creative content that bring the world of tsgabrielle® to life through movement and expression.
        </p>
        <p className="text-[#555555]">
          Experience the tsgabrielle® universe in motion. Our video section captures the essence of inclusive storytelling, offering a deeper look into the products, policies, and philosophies that define us.
        </p>
      </div>

      <div className="aspect-video w-full rounded-[3rem] overflow-hidden shadow-luxe bg-black relative group">
        <video 
          src="/videos/Gabrielle.mp4" 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-white text-xs tracking-widest uppercase font-bold px-8 py-3 border border-white/40 rounded-full backdrop-blur-sm">
            Featured Highlight
          </span>
        </div>
      </div>

      <div className="grid gap-12 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-xl font-medium text-[#111111] capitalize">Inclusive Storytelling</h3>
          <p className="text-sm text-[#555555] leading-relaxed">
            Discover visual narratives that celebrate identity and the French Trans Touch™. Our videos are designed to inform, connect, and inspire.
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-medium text-[#111111] capitalize">Behind the Design</h3>
          <p className="text-sm text-[#555555] leading-relaxed">
            A look into the intentionality behind our collections, exploring the materials and creativity that drive the brand forward.
          </p>
        </div>
      </div>

      <p className="italic text-center text-black/40 pt-10 border-t border-[#e7e7e7]">
        Explore the full collection of stories on our official YouTube channel.
      </p>
    </div>
  );

  return (
    <ContentPage 
      title="Videos" 
      subtitle="Visual Narratives"
      heroImage="/images/slides/tsgabrielle-Slide4.png"
      body={bodyContent} 
    />
  );
}
