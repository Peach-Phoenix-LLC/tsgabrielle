export type Category = {
  id: string;
  name: string;
  slug: string;
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  tags?: string[] | null;
  hero_image_1?: string | null;
  hero_image_2?: string | null;
  hero_image_3?: string | null;
  hero_description_1?: string | null;
  hero_description_2?: string | null;
  hero_description_3?: string | null;
  background_color?: string | null;
  text_color?: string | null;
  product_grid_background_color?: string | null;
  product_grid_text_color?: string | null;
  product_grid_accent_color?: string | null;
  hero_overlay_color?: string | null;
};

export type Collection = {
  id: string;
  name: string;
  slug: string;
  title?: string | null;
  description?: string | null;
  subtitle?: string | null;
  tags?: string[] | null;
  hero_image_1?: string | null;
  hero_image_2?: string | null;
  hero_image_3?: string | null;
  hero_description_1?: string | null;
  hero_description_2?: string | null;
  hero_description_3?: string | null;
  background_color?: string | null;
  text_color?: string | null;
  product_grid_background_color?: string | null;
  product_grid_text_color?: string | null;
  product_grid_accent_color?: string | null;
  hero_overlay_color?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  slogans?: string[] | null;
};

export type Product = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category_id: string | null;
  collection_id: string | null;
  price_cents: number;
  currency: string;
  active: boolean;
  metafields?: Record<string, any> | null;
};

export type ProductImage = {
  id: string;
  product_id: string;
  url: string;
  alt: string | null;
  sort_order: number;
};

export type ProductVariant = {
  id: string;
  product_id: string;
  sku: string;
  title: string;
  printful_variant_id: string | null;
  stock: number;
  price_cents: number;
  currency: string;
};

export type Order = {
  id: string;
  user_id: string | null;
  paypal_order_id: string | null;
  status: "pending" | "paid" | "fulfilled" | "cancelled";
  currency: string;
  total_cents: number;
  created_at: string;
};

export type OrderItem = {
  id: string;
  order_id: string;
  product_variant_id: string;
  quantity: number;
  unit_price_cents: number;
};

export type FeatureFlags = {
  enable_3d_hero: boolean;
};
