import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Peaches",
  description: "Peaches is the symbolic heartbeat of tsgabrielle® — a playful, expressive element that brings lightness and imagination into the universe.",
  path: "/peaches"
});

export default function Page() {
  const content = (
    <div className="space-y-8">
      <p className="text-xl font-light leading-relaxed">
        The symbolic heartbeat of tsgabrielle® — a playful, expressive element that brings 
        lightness and imagination into the universe. It represents the softer, more whimsical side of the brand, 
        where aesthetics, storytelling, and creative energy intertwine.
      </p>
      <p>
        Whether appearing in visual identity, concepts, or special initiatives, Peaches embodies freshness, inspiration, 
        and the joyful spark that fuels innovation. It is a reminder that creativity thrives when we allow ourselves to explore freely.
      </p>
    </div>
  );

  return (
    <ContentPage 
      title="Peaches" 
      subtitle="The Symbolic Heartbeat"
      heroImage="/images/tsgabrielle2.png"
      body={content} 
    />
  );
}

