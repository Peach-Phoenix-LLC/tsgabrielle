export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { CollectionPageTemplate } from "@/components/templates/ListingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "✨ Édition Spatiale • Cosmic Collection by tsgabrielle®",
  description: "✨ Édition Spatiale • A collection inspired by galaxies, stardust, and The French Trans Touch™.",
  keywords: [
    "edition spatiale",
    "cosmic identity",
    "galaxy aesthetic",
    "purple cosmos",
    "holographic nebula",
    "celestial glow",
    "cosmic storytelling",
    "emotional universe",
    "cosmic expression",
    "purple stardust",
    "identity cosmos",
    "poetic space",
    "cosmic editorial",
    "cosmic identity universe",
    "artistic galaxy",
    "cosmic glow identity",
    "celestial expression",
    "cosmic dreamscape",
    "purple universe",
    "cosmic atmosphere",
    "identity constellation",
    "cosmic radiance",
    "cosmic poetic identity",
    "galaxy expression",
    "cosmic universe"
  ],
  path: "/edition",
});

export default function Page() {
  return (
    <CollectionPageTemplate 
      title="✨ Édition Spatiale • Cosmic Edition" 
      slug="edition-spatiale" 
      description="✨ Édition Spatiale • Cosmic Edition explores cosmic identity and celestial glow."
      longDescription="✨ Édition Spatiale • Cosmic Edition is a cosmic universe shaped by wonder, mystery, and the infinite beauty of becoming. Inspired by galaxies, stardust, and the quiet pull of the unknown, Édition Spatiale unfolds like a journey through space—expansive, luminous, and deeply introspective. The tsgabrielle® purple spectrum meets celestial holographic accents that shimmer like nebulae. Each expression within Édition Spatiale carries a sense of weightlessness, a feeling of drifting through your own orbit with identity as your guiding star. The aesthetic is futuristic yet emotional, cosmic yet grounded in human experience. The universe of Édition Spatiale extends into subtle accents that echo its celestial glow—refined touches that bring the cosmos closer without overwhelming the collection’s ethereal balance. This world embodies The French Trans Touch™: limitless identity, cosmic elegance, and the courage to shine in the dark. ✨ Édition Spatiale • Cosmic Edition is for the explorers, the dreamers, and the ones who feel connected to something bigger. It is for those who glow beyond gravity, who move like constellations, and who carry galaxies within. This is space reimagined through purple—expansive, luminous, and deeply transformative."
      slogans={["Glow like a galaxy.","Born from stardust.","Cosmic elegance in purple.","The French Trans Touch™, interstellar edition.","Limitless identity.","Gravity can’t hold you.","Nebula‑powered expression."]}
    />
  );
}
