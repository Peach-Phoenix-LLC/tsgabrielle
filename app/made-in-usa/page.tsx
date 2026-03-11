import { CollectionPageTemplate } from "@/components/templates/ListingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Made In USA • Premium American Craft Streetwear | tsgabrielle®",
  description: "Made In USA • A Premium Streetwear Collection Blending American Craftsmanship With French Elegance And Purple Identity.",
  path: "/made-in-usa"
});

export default function Page() {
  return (
    <CollectionPageTemplate 
      title="Made In USA" 
      slug="made-in-usa" 
      description="Made In USA blends American craftsmanship with French purple elegance."
      longDescription="Made In USA is a dedicated honor to exceptional craftsmanship, enduring quality, and the profound beauty of creating with deliberate intention. This collection seamlessly blends American manufacturing excellence with the refined elegance and vibrant identity of the tsgabrielle® universe. The result is a selection of pieces that feel exceptionally durable, flawlessly refined, and unmistakably premium. Designed in the signature royal-purple spectrum with clean, sharp, and minimalist silhouettes, Made In USA reflects the ultimate fusion of two distinct worlds: the sophisticated allure of French elegance and the rugged reliability of American craft. It is a testament to purposeful design built to withstand the test of time."
      slogans={["Crafted with purpose.","Made here. Worn everywhere.","American craft, French elegance.","The French Trans Touch™, made in USA.","Built to last.","Quality in purple.","Craftsmanship meets identity."]}
    />
  );
}
