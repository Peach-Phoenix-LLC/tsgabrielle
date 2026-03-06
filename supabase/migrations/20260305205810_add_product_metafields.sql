-- Add metafields column to products table
ALTER TABLE public.products
ADD COLUMN metafields jsonb default '{}'::jsonb;

-- Optional: Add a GIN index for faster querying on JSONB data
CREATE INDEX products_metafields_gin_idx ON public.products USING GIN (metafields);
