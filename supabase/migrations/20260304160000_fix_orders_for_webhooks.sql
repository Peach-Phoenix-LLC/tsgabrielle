-- Add tracking_url and updated_at to orders
alter table public.orders add column if not exists tracking_url text;
alter table public.orders add column if not exists updated_at timestamptz default now();

-- Update status check to include 'failed'
alter table public.orders drop constraint if exists orders_status_check;
alter table public.orders add constraint orders_status_check check (status in ('pending', 'paid', 'fulfilled', 'cancelled', 'failed'));

-- Add trigger for updated_at if not exists
create trigger set_updated_at_orders
  before update on public.orders
  for each row execute procedure public.handle_updated_at();
