-- Add soft delete to products and variants
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;
ALTER TABLE public.product_variants ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;

-- Update RLS for soft delete
DROP POLICY IF EXISTS "Public read products" ON public.products;
CREATE POLICY "Public read products" ON public.products
  FOR SELECT USING (active = true AND deleted_at IS NULL);

-- Admin can see all (including deleted for restoration if needed)
DROP POLICY IF EXISTS "products_admin_write" ON public.products;
CREATE POLICY "products_admin_all" ON public.products
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
