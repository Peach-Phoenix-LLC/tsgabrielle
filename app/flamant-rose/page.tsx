export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { CollectionPageTemplate } from "@/components/templates/ListingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Flamant Rose • Soft Elegance Collection by tsgabrielle®",
  description: "Flamant Rose • A Collection Celebrating Softness, Presence, And The French Trans Touch™.",
  keywords: [
    "flamant rose",
    "pink identity",
    "soft elegance",
    "purple pink glow",
    "flamingo aesthetic",
    "emotional softness",
    "poetic elegance",
    "gentle identity",
    "pink atmosphere",
    "purple harmony",
    "soft storytelling",
    "emotional universe",
    "elegant glow",
    "identity softness",
    "artistic pink",
    "soft radiance",
    "soft expression",
    "pink poetic identity",
    "gentle glow",
    "elegant identity",
    "pink universe",
    "purple soft aesthetic",
    "emotional presence",
    "soft empowerment",
    "flamingo universe"
  ],
  path: "/flamant-rose",
});

export default function Page() {
  return (
    <CollectionPageTemplate 
      title="Flamant Rose" 
      slug="flamant-rose" 
      description="Flamant Rose celebrates softness, elegance, and pink‑purple glow."
      longDescription="Flamant Rose is a universe shaped by softness, elegance, and unapologetic presence—inspired by the graceful posture of flamingos and the warm glow of pink sunsets. Designed in the tsgabrielle® purple spectrum with luminous pink accents, Flamant Rose explores the emotional landscape of softness: the strength within vulnerability, the power within gentleness, and the beauty within standing tall even when the world tries to bend you. Each expression within Flamant Rose blends fluidity with intention. Holographic highlights shimmer like feathers catching the light, while the purple‑pink palette creates a visual harmony that feels both tender and confident. The universe of Flamant Rose extends into subtle accents that echo its soft glow—refined touches that bring elegance into the everyday without overwhelming the collection’s gentle identity. This world embodies The French Trans Touch™: softness as strength, elegance as identity, and presence as power. Flamant Rose is for those who move with grace and confidence—the ones who shine softly, who stand tall, and who embrace their femininity without apology. This is softness reimagined through purple—tender, luminous, and deeply empowering."
      slogans={["Soft, tall, unstoppable.","Elegance in pink.","Stand tall in purple.","The French Trans Touch™, feather‑soft.","Glow like a flamingo.","Softness is strength.","Pink with purpose."]}
    />
  );
}
