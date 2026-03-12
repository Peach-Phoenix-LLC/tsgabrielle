import { CollectionPageTemplate } from "@/components/templates/ListingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Paris • French Collection by tsgabrielle®",
  description: "Paris • A Collection Inspired By Parisian Elegance, Identity, And Modern Purple Minimalism.",
  keywords: [
    "paris luxury streetwear",
    "parisian elegance",
    "montmartre inspired",
    "seine sunset style",
    "tsgabrielle purple spectrum",
    "effortless french style",
    "modern purple minimalism",
    "french trans touch",
    "subtle sensual fashion",
    "unapologetic individuality",
    "romantic street style",
    "refined bold apparel",
    "timeless minimalism",
    "luxury streetwear paris",
    "iconic french allure",
    "signature paris style",
    "elegant identity clothing",
    "classic french aesthetic",
    "modern luxury fashion",
    "tsgabrielle paris",
    "style with a heartbeat",
    "elegant purple apparel",
    "parisian confidence",
    "unforgettable streetwear",
    "french lifestyle fashion"
  ],
  path: "/paris",
});

export default function Page() {
  return (
    <CollectionPageTemplate 
      title="Paris" 
      slug="paris" 
      description="Paris blends Parisian elegance with modern purple luxury streetwear."
      longDescription="Paris is an intimate love letter to timeless elegance, bold identity, and truly effortless style. Inspired by the soft light of Montmartre mornings, the golden, sweeping sunsets along the Seine, and the quiet, unshakeable confidence inherent in Parisian fashion, Paris seamlessly blends classic minimalism with the cutting-edge aesthetic of modern luxury streetwear. Designed beautifully within the tsgabrielle® purple spectrum, Paris physically embodies The French Trans Touch™: it is subtle yet sensual, classic yet unapologetically individual. Every meticulously crafted piece carries the enduring, romantic spirit of the city itself—deeply refined, strikingly bold, and absolutely unforgettable. The Paris collection captures timeless elegance inspired by the world’s fashion capital. Refined silhouettes and minimalist sophistication create effortless style that feels both classic and contemporary. Paris celebrates confidence through simplicity. The pieces invite anyone to express elegance naturally, proving that true style is not defined by gender or rules but by attitude."
      slogans={["Paris in every stitch.","Elegance is a lifestyle.","Born in Paris. Worn everywhere.","Where luxury meets attitude.","Effortless. Iconic. Paris.","French allure, reimagined.","Style with a heartbeat."]}
    />
  );
}
