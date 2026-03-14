import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { getPageLayout } from "@/lib/content";
import { PageLayoutRenderer } from "@/components/builder/PageLayoutRenderer";
import { PageLayout } from "@/lib/types";

export const metadata = buildMetadata({
  title: "Welcome to tsgabrielle® USA • The French Trans Touch™",
  description: "Discover curated lifestyle essentials at tsgabrielle® • Shop our exclusive collections of fashion accessories, luxury beauty, home décor, and apparel for him and her.",
  keywords: [
    "tsgabrielle", "lifestyle brand", "premium fashion", "home decor", "beauty essentials", 
    "luxury accessories", "online shopping", "curated lifestyle", "fashion for him", 
    "fashion for her", "stylish hats", "modern furnishings", "lifestyle boutique", 
    "exclusive collections", "high-quality apparel", "designer lifestyle", "luxury beauty", 
    "everyday elegance", "statement pieces", "premium skincare", "chic apparel", 
    "trendy lifestyle", "home styling", "lifestyle store", "premium goods"
  ],
  path: "/"
});

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const layout = await getPageLayout("/");

  // Fetch featured products for the default layout
  let featuredProducts: any[] = [];
  try {
    const supabase = getSupabaseServerClient();
    const { data } = await supabase
      .from("products")
      .select(`
        id,
        title,
        base_sku,
        msrp_display,
        media_primary_url
      `)
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(4);

    featuredProducts = (data || []).map((p: any) => ({
      id: p.id,
      title: p.title,
      slug: p.base_sku || p.id.toString(),
      price_cents: Math.round(parseFloat(p.msrp_display || "0") * 100),
      images: p.media_primary_url ? [{ url: p.media_primary_url }] : []
    }));
  } catch (error) {
    console.warn("Could not fetch featured products:", error);
  }

  // Define default layout if none exists in database
  const defaultLayout: PageLayout = {
    page_path: "/",
    sections: [
      {
        id: "hero-1",
        type: "hero",
        settings: { enable3D: false },
        content: {
          title: "Inclusive fashion and décor with couture energy.",
          subtitle: "Peach Phoenix Luxury",
          description: "Curated collections, global fulfillment, and premium quality via Supabase, Printful, and PayPal.",
          buttonText: "Explore Collections",
          image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200"
        }
      },
      {
        id: "featured-1",
        type: "product-grid",
        settings: {},
        content: {
          title: "Exclusive 💎 New",
          products: featuredProducts
        }
      }
    ]
  };

  return (
    <div className="-mt-[160px] lg:-mt-[195px]">
      <PageLayoutRenderer layout={layout || defaultLayout} />
    </div>
  );
}

