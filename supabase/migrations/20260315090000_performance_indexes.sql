-- Performance indexes for common query patterns
-- Based on architecture design: dashboard queries, builder, checkout

BEGIN;

-- Products: filtered by collection/category (storefront grids)
CREATE INDEX IF NOT EXISTS idx_products_collection_id
  ON public.products(collection_id)
  WHERE active = true AND deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_products_category_id
  ON public.products(category_id)
  WHERE active = true AND deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_products_slug
  ON public.products(slug);

-- Orders: lookup by user, PayPal ID, Printful ID
CREATE INDEX IF NOT EXISTS idx_orders_user_id
  ON public.orders(user_id);

CREATE INDEX IF NOT EXISTS idx_orders_paypal_id
  ON public.orders(paypal_order_id)
  WHERE paypal_order_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_orders_printful_id
  ON public.orders(printful_order_id)
  WHERE printful_order_id IS NOT NULL;

-- Media library: browsed by folder in media manager
CREATE INDEX IF NOT EXISTS idx_media_library_folder
  ON public.media_library(folder);

CREATE INDEX IF NOT EXISTS idx_media_library_uploaded_by
  ON public.media_library(uploaded_by);

-- Builder sections: fetched by page_id
CREATE INDEX IF NOT EXISTS idx_builder_sections_page_id
  ON public.builder_sections(page_id);

-- Builder version history: fetched by page_id
CREATE INDEX IF NOT EXISTS idx_builder_versions_page_id
  ON public.builder_section_versions(page_id);

-- Builder pages: looked up by path
CREATE INDEX IF NOT EXISTS idx_builder_pages_path
  ON public.builder_pages(path);

COMMIT;
