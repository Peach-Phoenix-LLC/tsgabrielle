import { CategoryPageTemplate } from "@/components/templates/ListingPage";
import { buildMetadata } from "@/lib/seo";

const categoryDescription = "Upgrade his wardrobe with our exclusive 'For Him' collection. Featuring sophisticated apparel, refined accessories, and everyday essentials tailored for the modern gentleman. Experience exceptional tailoring and durable fabrics designed for both professional settings and casual refinement.";

export const metadata = buildMetadata({
  title: "For Him | Men's Fashion, Clothing & Accessories | tsgabrielle®",
  description: "Shop the 'For Him' collection for premium men's clothing and accessories. Discover tailored apparel, everyday essentials, and refined styles for the modern man.",
  keywords: [
    "for him", "mens fashion", "mens apparel", "menswear", "mens accessories",
    "modern gentleman", "mens style", "tailoring", "mens clothing", "gifts for him",
    "mens wardrobe", "casual menswear", "formal menswear", "mens grooming", "stylish men",
    "mens essentials", "dapper", "mens outfit", "mens lifestyle", "mens footwear",
    "luxury menswear", "everyday menswear", "professional attire", "smart casual", "masculine style"
  ],
  path: "/for-him"
});

export default function Page() {
  return <CategoryPageTemplate title="For Him 👔" slug="for-him" description={categoryDescription} />;
}

