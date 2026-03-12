export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { CollectionPageTemplate } from "@/components/templates/ListingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Unicorn • Iridescent Collection by tsgabrielle®",
  description: "Unicorn • A collection celebrating magic, individuality, and The French Trans Touch™.",
  keywords: [
    "unicorn",
    "iridescent identity",
    "magical universe",
    "purple fantasy",
    "holographic glow",
    "enchanted aesthetic",
    "identity magic",
    "poetic fantasy",
    "emotional expression",
    "purple shimmer",
    "artistic identity",
    "unicorn aesthetic",
    "identity storytelling",
    "iridescent universe",
    "emotional glow",
    "purple enchantment",
    "fantasy identity",
    "magical expression",
    "artistic glow",
    "identity radiance",
    "purple dreamscape",
    "enchanted identity",
    "iridescent atmosphere",
    "unicorn expression",
    "unicorn universe"
  ],
  path: "/unicorn",
});

export default function Page() {
  return (
    <CollectionPageTemplate 
      title="Unicorn" 
      slug="unicorn" 
      description="Unicorn celebrates magic, individuality, and iridescent identity."
      longDescription="Unicorn is a universe of magic, individuality, and fearless self‑expression—a world where imagination becomes identity and softness becomes power. Designed in the signature tsgabrielle® purple spectrum with iridescent holographic accents, Unicorn captures the feeling of stepping into your own myth, your own fantasy, and your own truth. Each expression within Unicorn shimmers with possibility. The aesthetic blends fantasy with refinement, creating a visual language that feels both ethereal and intentional. Holographic highlights glow like enchanted light, while the purple spectrum grounds the universe in emotional depth. Unicorn extends into select accents that carry its iridescent identity—subtle touches that bring magic into the everyday without overwhelming the collection’s refined balance. This world embodies The French Trans Touch™: authenticity as magic, individuality as strength, and identity as a radiant force. Unicorn is for the dreamers, the rebels, and the ones who refuse to dim their light. It is for those who live in color, who move with imagination, and who transform every space they enter. This is magic reimagined through purple—iridescent, bold, and unforgettable."
      slogans={["Magic looks good on you.","Be legendary.","Unapologetically unique.","The French Trans Touch™, enchanted.","Glow like a unicorn.","Identity is magic.","Born to stand out."]}
    />
  );
}
