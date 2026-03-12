export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { CategoryPageTemplate } from "@/components/templates/ListingPage";
import { buildMetadata } from "@/lib/seo";

const categoryDescription = "Discover a radiant you with our Beauté • Beauty collection. Featuring high-performance skincare, luxurious cosmetics, and essential beauty tools, this collection is engineered to enhance your natural glow. Experience formulations that prioritize skin health alongside flawless aesthetic results.";

export const metadata = buildMetadata({
  title: "Beauté Beauty Collection | Premium Skincare & Cosmetics | tsgabrielle®",
  description: "Explore our Beauté Beauty collection for premium skincare, makeup, and beauty tools. Enhance your natural radiance with high-performance beauty essentials.",
  keywords: [
    "beauty", "beaute", "skincare", "cosmetics", "makeup", "beauty essentials", "natural glow",
    "premium beauty", "luxury skincare", "beauty products", "beauty routine", "healthy skin",
    "radiant skin", "beauty tools", "self-care", "beauty regimen", "makeup essentials",
    "clean beauty", "anti-aging", "hydration", "complexion", "beauty accessories",
    "cruelty-free beauty", "glow up", "daily beauty"
  ],
  path: "/beaute-beauty"
});

export default function Page() {
  return <CategoryPageTemplate title="Beauté • Beauty" slug="beaute-beauty" description={categoryDescription} />;
}