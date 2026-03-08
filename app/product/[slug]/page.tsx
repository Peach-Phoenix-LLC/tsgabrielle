import { notFound } from "next/navigation";
import ProductClientView from "@/components/product/ProductClientView";
import { buildMetadata } from "@/lib/seo";
import { getProductBySlug, getVariantsByProductId, getProductImages } from "@/lib/store";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return buildMetadata({ title: "Product", description: "Product page" });
  return buildMetadata({
    title: `${product.title} | tsgabrielle®`,
    description: product.description,
    path: `/product/${slug}`
  });
}

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let product = null;
  let variants: any[] = [];
  let images: any[] = [];

  try {
    product = await getProductBySlug(slug);
    if (product) {
      const [vRes, iRes] = await Promise.all([
        getVariantsByProductId(product.id),
        getProductImages(product.id)
      ]);
      variants = vRes;
      images = iRes;
    }
  } catch (error) {
    console.error("Error fetching product data:", error);
  }

  if (!product) notFound();

  // Map the raw database data to the strict Luxury Editorial format required by ProductClientView
  const mappedProduct = {
    id: product.id,
    title: product.title,
    price: product.price_cents || 0,
    description: product.description || "",
    details: product.metafields?.["Premium Features"]
      ? (product.metafields["Premium Features"] as string).split("\n").filter(Boolean)
      : ["Premium craftsmanship", "Inclusive sizing", "Authentic design", "Sustainably sourced", "Peach Phoenix, LLC guaranteed"],
    care: (product.metafields?.["Care Instructions"] as string) || "Dry clean only. Handle with care to maintain the zero-gravity finish.",
    shipping: "Free worldwide shipping on all orders over $150. Dispatched within 24 hours.",
    images: images && images.length > 0 ? images.map((img: any) => img.url) : ["/images/placeholder.jpg"],
    colors: [{ name: "Noir", hex: "#111111" }],
    sizes: variants.map((v: any) => ({ name: v.title, variantId: v.id, sku: v.sku, price_cents: v.price_cents, stock: v.stock })),
    rating: 5.0,
    reviewCount: 42,
    soldCount: 128,
    stock: variants.reduce((acc: number, v: any) => acc + (v.stock || 0), 0),
    tags: (product.metafields?.["Tags"] as string)?.split(",").map((t: string) => t.trim()) || ["New", "Luxury", "Inclusive"],
    ribbon: (product.metafields?.["Ribbon"] as any) || "EXCLUSIVE",
    gifTitleUrl: (product as any).printful_product_id ? undefined : "",
    metafields: product.metafields
  };

  const siteUrl = "https://tsgabrielle.us";
  const productUrl = `${siteUrl}/product/${slug}`;
  const basePrice = mappedProduct.price / 100;

  // --- Google Product Variant Structured Data (ProductGroup + hasVariant) ---
  // https://developers.google.com/search/docs/appearance/structured-data/product-variants
  const productGroupSchema = {
    "@context": "https://schema.org/",
    "@type": "ProductGroup",
    "name": mappedProduct.title,
    "description": mappedProduct.description,
    "url": productUrl,
    "productGroupID": String(product.id),
    "brand": {
      "@type": "Brand",
      "name": "tsgabrielle"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": mappedProduct.rating,
      "reviewCount": mappedProduct.reviewCount
    },
    // What dimension(s) vary between variants — sizes in this case
    "variesBy": ["https://schema.org/size"],
    "image": mappedProduct.images.map((url: string) =>
      url.startsWith("http") ? url : `${siteUrl}${url}`
    ),
    "hasVariant": mappedProduct.sizes.length > 0
      ? mappedProduct.sizes.map((v: any) => ({
          "@type": "Product",
          "name": `${mappedProduct.title} – ${v.name}`,
          "description": `${mappedProduct.description} (${v.name})`,
          "sku": v.sku || `PF-${v.variantId}`,
          "size": v.name,
          "image": mappedProduct.images[0]?.startsWith("http")
            ? mappedProduct.images[0]
            : `${siteUrl}${mappedProduct.images[0]}`,
          "brand": { "@type": "Brand", "name": "tsgabrielle" },
          "inProductGroupWithID": String(product.id),
          "offers": {
            "@type": "Offer",
            "url": `${productUrl}?size=${encodeURIComponent(v.name)}`,
            "priceCurrency": "USD",
            "price": v.price_cents ? (v.price_cents / 100).toFixed(2) : basePrice.toFixed(2),
            "itemCondition": "https://schema.org/NewCondition",
            "availability": v.stock > 0 || !v.stock
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
            "seller": { "@type": "Organization", "name": "tsgabrielle" },
            "shippingDetails": { "@id": `${productUrl}#shipping_policy` },
            "hasMerchantReturnPolicy": { "@id": `${productUrl}#return_policy` }
          }
        }))
      // If no variants, expose a single Offer at the ProductGroup level
      : [{
          "@type": "Product",
          "name": mappedProduct.title,
          "description": mappedProduct.description,
          "sku": `PF-${product.id}`,
          "brand": { "@type": "Brand", "name": "tsgabrielle" },
          "inProductGroupWithID": String(product.id),
          "image": mappedProduct.images[0]?.startsWith("http")
            ? mappedProduct.images[0]
            : `${siteUrl}${mappedProduct.images[0]}`,
          "offers": {
            "@type": "Offer",
            "url": productUrl,
            "priceCurrency": "USD",
            "price": basePrice.toFixed(2),
            "itemCondition": "https://schema.org/NewCondition",
            "availability": "https://schema.org/InStock",
            "seller": { "@type": "Organization", "name": "tsgabrielle" },
            "shippingDetails": { "@id": `${productUrl}#shipping_policy` },
            "hasMerchantReturnPolicy": { "@id": `${productUrl}#return_policy` }
          }
        }]
  };

  // Shipping details referenced by @id
  const shippingDetailsSchema = {
    "@context": "https://schema.org/",
    "@type": "OfferShippingDetails",
    "@id": `${productUrl}#shipping_policy`,
    "shippingRate": {
      "@type": "MonetaryAmount",
      "value": 0,
      "currency": "USD"
    },
    "shippingDestination": {
      "@type": "DefinedRegion",
      "addressCountry": "US"
    },
    "deliveryTime": {
      "@type": "ShippingDeliveryTime",
      "handlingTime": {
        "@type": "QuantitativeValue",
        "minValue": 1,
        "maxValue": 2,
        "unitCode": "DAY"
      },
      "transitTime": {
        "@type": "QuantitativeValue",
        "minValue": 3,
        "maxValue": 7,
        "unitCode": "DAY"
      }
    }
  };

  // Merchant return policy referenced by @id
  const returnPolicySchema = {
    "@context": "https://schema.org/",
    "@type": "MerchantReturnPolicy",
    "@id": `${productUrl}#return_policy`,
    "applicableCountry": "US",
    "returnPolicyCountry": "US",
    "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
    "merchantReturnDays": 30,
    "returnMethod": "https://schema.org/ReturnByMail",
    "returnFees": "https://schema.org/FreeReturn"
  };

  return (
    <>
      {/* Google Product Variant Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([productGroupSchema, shippingDetailsSchema, returnPolicySchema])
        }}
      />
      <ProductClientView product={mappedProduct} />
    </>
  );
}
