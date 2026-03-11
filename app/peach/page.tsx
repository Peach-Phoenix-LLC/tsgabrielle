import { CollectionPageTemplate } from "@/components/templates/ListingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Peach Phoenix™ • Rebirth Radiant Individuality by tsgabrielle®",
  description: "Peach Phoenix™ • A Luxury Streetwear Collection Celebrating Rebirth, Identity, And Bold Purple Transformation.",
  path: "/peach"
});

export default function Page() {
  return (
    <CollectionPageTemplate 
      title="Peach Phoenix™" 
      slug="peach-phoenix" 
      description="Peach Phoenix™ celebrates rebirth, identity, and peach‑powered transformation."
      longDescription="Peach Phoenix™ represents transformation, resilience, and radiant individuality. Inspired by the mythical Phoenix and the gentle curves of a peach, this collection blends strength with warmth, symbolizing renewal and confidence. The designs celebrate people who evolve, reinvent themselves, and express their identity with pride. Soft flowing shapes echo natural curves, while bold colors and modern silhouettes express energy and movement. Peach Phoenix™ invites everyone—women, men, trans individuals, and allies—to rise in style and celebrate the beauty of becoming who you truly are."
      slogans={["Rise in purple fire.","Rebirth looks good on you.","Soft. Strong. Phoenix.","Glow through the ashes.","The French Trans Touch™, reborn.","Identity is a flame.","Peach‑powered transformation."]}
    />
  );
}
