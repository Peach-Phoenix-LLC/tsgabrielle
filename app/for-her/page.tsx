export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { CategoryPageTemplate } from "@/components/templates/ListingPage";
import { buildMetadata } from "@/lib/seo";

const categoryDescription = "Celebrate her style with our 'For Her' collection. From elegant dresses and chic everyday wear to stunning accessories, discover curated fashion designed to empower and inspire. Build a versatile wardrobe with pieces that transition seamlessly from day to night.";

export const metadata = buildMetadata({
  title: "For Her | Women's Fashion, Dresses & Accessories | tsgabrielle®",
  description: "Explore the 'For Her' collection featuring chic women's clothing, elegant dresses, and premium accessories. Shop curated fashion designed to empower and inspire.",
  keywords: [
    "for her", "womens fashion", "womenswear", "womens apparel", "womens accessories",
    "dresses", "elegant fashion", "chic style", "womens clothing", "gifts for her",
    "womens wardrobe", "trendy womenswear", "luxury womenswear", "feminine style",
    "empowerment fashion", "womens footwear", "casual chic", "formal dresses", "everyday style",
    "modern woman", "boutique fashion", "statement pieces", "seasonal fashion", "beautiful apparel",
    "fashion forward"
  ],
  path: "/for-her"
});

export default function Page() {
  return <CategoryPageTemplate title="For Her 👗" slug="for-her" description={categoryDescription} />;
}

