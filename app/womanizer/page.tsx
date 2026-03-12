import { CollectionPageTemplate } from "@/components/templates/ListingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Womanizer • Magnetic Luxury Menswear by tsgabrielle®",
  description: "Womanizer • A Luxury Menswear Collection Celebrating Quiet Charisma, Magnetic Presence, And Effortless Allure.",
  keywords: [
    "womanizer",
    "quiet charisma",
    "magnetic presence",
    "discreet allure",
    "stealth luxury",
    "tsgabrielle purple spectrum",
    "elegant attraction",
    "sophisticated charm",
    "masculine allure",
    "subtle holographic",
    "undeniable magnetism",
    "slow burn aesthetic",
    "calculated grace",
    "magnetic elegance",
    "quiet confidence",
    "luxury menswear",
    "refined aesthetic",
    "charismatic identity",
    "purple powered charm",
    "the art of attraction",
    "effortless magnetism",
    "stealth streetwear",
    "lingering impression",
    "magnetic identity",
    "mens luxury fashion"
  ],
  path: "/womanizer",
});

export default function Page() {
  return (
    <CollectionPageTemplate 
      title="Womanizer" 
      slug="womanizer" 
      description="Womanizer celebrates quiet charisma, magnetic presence, and discreet purple‑powered allure."
      longDescription="Womanizer is a universe shaped by quiet charisma, effortless confidence, and undeniable magnetism—a world where presence speaks volumes without needing to say a word. Designed for the architect of attraction, this collection unfolds with a slow burn: intentional, refined, and impossible to ignore. The tsgabrielle® purple spectrum meets deep, understated tones and stealth holographic accents that catch the light only when intended. Each expression within Womanizer carries a sense of sophisticated boldness—clean lines that command the room and a subtle glow that lingers long after you’ve left. The universe of Womanizer extends into highly curated accents that echo its seductive energy—refined touches that elevate magnetic charm without ever compromising the collection’s discreet nature. This world embodies undeniable allure, magnetic elegance, and the quiet power of knowing exactly how to navigate any space. Womanizer is for those who master the subtle art of the encounter—the ones who shift the atmosphere effortlessly, who move with calculated grace, and whose charm is both their signature and their secret. This is attraction reimagined through purple—discreet, magnetic, and absolutely unforgettable."
      slogans={["Charm is a quiet power.","Speak without words.","French allure, magnetic edition.","Undeniable presence.","Master the atmosphere.","Discreet allure in purple.","Leave a lingering impression."]}
    />
  );
}
