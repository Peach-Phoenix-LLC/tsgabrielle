export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { CollectionPageTemplate } from "@/components/templates/ListingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "TransLove™ • Identity & Self‑Love Streetwear | tsgabrielle®",
  description: "TransLove™ • A Luxury Streetwear Collection Celebrating Identity, Visibility, And Self‑Love.",
  path: "/translove"
});

export default function Page() {
  return (
    <CollectionPageTemplate 
      title="TransLove™" 
      slug="translove" 
      description="TransLove™ celebrates identity, visibility, and soft purple‑pink warmth."
      longDescription="TransLove™ is a profound tribute to the absolute power of loving yourself—loudly, softly, and fully. This collection radiates undeniable warmth, deep courage, and the unmistakable, brilliant glow of authenticity. Designed masterfully within the tsgabrielle® purple spectrum and enriched with soft pink undertones, TransLove™ effortlessly blends timeless Parisian elegance with the clean, modern lines of luxury streetwear minimalism. Every piece acts as a vessel, carrying the emotional heartbeat of The French Trans Touch™: championing love as an act of resistance, honoring identity as pure beauty, and declaring visibility as the ultimate power. It is an invitation to wear your truth and embrace the revolutionary act of self-devotion."
      slogans={["Love looks good on you.","Trans love is real love.","Wear your heart in purple.","Soft. Strong. Loved.","The French Trans Touch™, with love.","Love is a revolution.","Identity is beautiful."]}
    />
  );
}
