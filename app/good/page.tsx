export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { CollectionPageTemplate } from "@/components/templates/ListingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Good Vibes Only. • Radiance Collection by tsgabrielle®",
  description: "Good Vibes Only. • A Collection Celebrating Joy, Softness, And The French Trans Touch™.",
  keywords: [
    "good vibes only",
    "radiant identity",
    "positive aesthetic",
    "purple optimism",
    "emotional glow",
    "joyful universe",
    "soft energy",
    "identity joy",
    "purple radiance",
    "holographic joy",
    "emotional storytelling",
    "editorial joy",
    "poetic optimism",
    "identity celebration",
    "gentle glow",
    "radiant expression",
    "purple frequency",
    "emotional positivity",
    "artistic optimism",
    "signature joy universe",
    "emotional identity",
    "purple happiness",
    "radiant atmosphere",
    "joy expression",
    "joy universe"
  ],
  path: "/good",
});

export default function Page() {
  return (
    <CollectionPageTemplate 
      title="Good Vibes Only." 
      slug="good-vibes-only" 
      description="Good Vibes Only. radiates softness, joy, and purple‑powered optimism."
      longDescription="Good Vibes Only. is a radiant, uplifting universe shaped by joy, softness, and the quiet power of choosing your own frequency. Inspired by warm light, soft laughter, and the emotional clarity that comes from embracing positivity with intention, Good Vibes Only. unfolds like a breath of fresh air—bright, tender, and quietly transformative. The tsgabrielle® purple spectrum meets luminous accents that feel like sunlight on skin. Each expression within Good Vibes Only. carries a sense of ease, a softness that invites you to breathe deeper, move lighter, and glow from within. Holographic touches shimmer like reflections of happiness—subtle, playful, never overwhelming. The universe of Good Vibes Only. extends gently into forms that brighten the everyday, creating an atmosphere of warmth that lingers long after the moment passes. This world embodies The French Trans Touch™: joy as resistance, positivity as power, and identity as celebration. Good Vibes Only. is for those who radiate warmth even in difficult times—the ones who choose softness over cynicism, who glow from within, and who uplift others simply by existing. This is joy, elevated into emotion—bright, intentional, and unmistakably purple."
      slogans={["Choose your frequency.","Glow with good vibes.","Joy looks good in purple.","The French Trans Touch™, radiant edition.","Positive energy only.","Shine brighter.","Wear your joy."]}
    />
  );
}
