import { CollectionPageTemplate } from "@/components/templates/ListingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Arizona 🌵 • A Desert-Inspired by tsgabrielle®",
  description: "Arizona 🌵 • A Desert‑Inspired Collection Blending Heat, Resilience, And Purple Identity.",
  path: "/arizona"
});

export default function Page() {
  return (
    <CollectionPageTemplate 
      title="Arizona 🌵" 
      slug="arizona" 
      description="Arizona 🌵 blends desert heat, resilience, and purple identity."
      longDescription="Arizona 🌵 masterfully captures the intense heat, the vast expanse, and the quiet, enduring power of the desert—all boldly reimagined through the vibrant purple lens of tsgabrielle®. Inspired by sun-bleached landscapes, endless rolling horizons, and the fierce resilience of desert life, Arizona 🌵 flawlessly blends earthy minimalism with striking, futuristic accents. Warm, grounding neutrals meticulously frame the brand’s signature royal-purple identity, while disruptive holographic highlights shimmer with the kinetic energy of mirages under the blazing sun. This collection deeply reflects The French Trans Touch™: showcasing strength, honoring survival, and discovering breathtaking beauty in the most unexpected and challenging environments."
      slogans={["Heat looks good in purple.","Desert strength.","Glow like a mirage.","The French Trans Touch™, desert edition.","Endless horizon energy.","Survive. Shine. Repeat.","Born of heat."]}
    />
  );
}
