export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { CollectionPageTemplate } from "@/components/templates/ListingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "TransFLOWer™ • Blooming Luxury Streetwear by tsgabrielle®",
  description: "TransFLOWer™ • A Luxury Streetwear Collection Celebrating Identity, Growth, And Soft Strength.",
  path: "/transflower"
});

export default function Page() {
  return (
    <CollectionPageTemplate 
      title="TransFLOWer™" 
      slug="transflower" 
      description="TransFLOWer™ blends softness, strength, and blooming purple identity."
      longDescription="TransFLOWer™ celebrates growth—the quiet, powerful kind that blooms inherently from personal truth. Inspired by resilient flowers that push through concrete, TransFLOWer™ honors the beauty of becoming your authentic self in a world that often asks you to shrink. Designed meticulously within the signature tsgabrielle® purple spectrum, this collection blends profound softness with architectural structure, creating silhouettes that feel simultaneously delicate and unbreakable. Holographic accents shimmer throughout like fresh dew on petals at sunrise, offering a kinetic visual reminder of life and renewal. This universe embodies The French Trans Touch™ in full bloom: an undeniable testament to flourishing on your own terms and embracing vulnerability as a source of immense strength. TransFLOWer™ symbolizes growth, authenticity, and pride. Inspired by flowers blooming in their own time, this collection celebrates identity and the courage to live truthfully. Fashion becomes a symbol of dignity, solidarity, and beauty in diversity. Every piece invites people to express themselves freely while honoring individuality and inclusion."
      slogans={["Bloom without permission.","Soft is powerful.","Grow in your own direction.","Elegance in full bloom.","The French Trans Touch™, floral edition.","Petals with purpose.","Blooming in purple."]}
    />
  );
}
