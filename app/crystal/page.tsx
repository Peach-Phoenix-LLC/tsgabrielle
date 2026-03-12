export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { CollectionPageTemplate } from "@/components/templates/ListingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Crystal Skies. • Crystalline Identity & Architectural Winterwear by tsgabrielle®",
  description: "Crystal Skies. • An Architectural Collection Forged From Clarity, Kinetic Stillness, And The French Trans Touch™. Embrace Crystalline Identity.",
  keywords: [
    "crystal skies",
    "architectural clarity",
    "glacial identity",
    "purple frost code",
    "holographic refraction",
    "winter precision",
    "kinetic stillness",
    "cyber-futuristic winter",
    "winter luminescence",
    "purple cold logic",
    "minimal geometry",
    "radical introspection",
    "winter manifesto",
    "crystal identity",
    "fractured light glow",
    "winter poetic syntax",
    "winter atmosphere re-engineered",
    "crystalline purple universe",
    "winter artistic logic",
    "winter expression",
    "surgical elegance",
    "winter emotional clarity",
    "winter purple light",
    "ultimate clarity",
    "winter power aesthetic"
  ],
  path: "/crystal",
});

export default function Page() {
  return (
    <CollectionPageTemplate 
      title="Crystal Skies." 
      slug="crystal-skies" 
      description="Crystal Skies.: A vanguardist manifesto of winter’s precise clarity, architectural brilliance, and the power of luminous stillness."
      longDescription="Crystal Skies. isn't a mere universe; it’s an architectural manifesto forged from absolute clarity, kinetic stillness, and the unapologetic brilliance of emergent winter light. Inspired by the fractured planes of frozen dawns, the infinite precision of shimmering horizons, and the radical geometry of ice crystals, Crystal Skies. unfolds as a sharp, incisive breath of cold air—crisp, hyper-real, and profoundly, almost clinically, introspective. The tsgabrielle® purple spectrum intersects with calibrated cool tones and disruptive holographic accents that ignite like raw sunlight refracted through an ice prism. Every articulation within Crystal Skies. broadcasts an intrinsic purity, a calculated moment of suspension, a visceral reminder that profound beauty is often an emergent property of silence. The aesthetic is surgically clean yet vibrationally resonant, minimalist yet provocatively evocative, cyber-futuristic yet grounded in nature’s most stringent geometry. The universe of Crystal Skies. extends with deliberate precision into refined accents that echo its glacial elegance—subtle yet potent interventions that inject winter’s absolute clarity into the quotidian, without ever compromising the collection’s pristine integrity. This world embodies The French Trans Touch™: clarity as an unyielding force, resilience as a radical aesthetic, and the inherent power of radiating luminescence even when the environment dictates stasis. Crystal Skies. is for the self-calibrated—those who project light with surgical precision, who cultivate inner fire through stark distillation, and who navigate winter as a controlled experiment in grace and precise intention. This is winter re-engineered through purple—crystalline, incandescent, and profoundly, defiantly poetic."
      slogans={["Radiate in the absolute cold.","Elegance, re-crystallized.","Winter: The new purple code.","The French Trans Touch™: Frozen logic.","Glow like fractured light.","Clarity is the ultimate power.","Born of glacial truth."]}
    />
  );
}
