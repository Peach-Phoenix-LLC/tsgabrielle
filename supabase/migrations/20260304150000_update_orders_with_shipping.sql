alter table public.orders add column if not exists shipping_address jsonb;
alter table public.orders add column if not exists customer_email text;
