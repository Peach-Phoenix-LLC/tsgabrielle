begin;

create extension if not exists "pgcrypto";

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.collections (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null default '',
  category_id uuid references public.categories(id) on delete set null,
  collection_id uuid references public.collections(id) on delete set null,
  printful_product_id text,
  price_cents integer not null default 0,
  currency text not null default 'USD',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  url text not null,
  alt text,
  sort_order integer not null default 0
);

create table if not exists public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  sku text not null unique,
  title text not null,
  printful_variant_id text unique,
  stock integer not null default 0,
  price_cents integer not null default 0,
  currency text not null default 'USD'
);

create table if not exists public.users (
  id uuid primary key,
  email text not null unique,
  display_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  paypal_order_id text unique,
  printful_order_id text unique,
  status text not null default 'pending' check (status in ('pending', 'paid', 'fulfilled', 'cancelled')),
  currency text not null default 'USD',
  total_cents integer not null default 0,
  tracking_number text,
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_variant_id uuid not null references public.product_variants(id),
  quantity integer not null default 1,
  unit_price_cents integer not null
);

create table if not exists public.feature_flags (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  enable_3d_hero boolean not null default true,
  updated_at timestamptz not null default now()
);

-- 3. Functions & Triggers

-- Handle updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at_products
  before update on public.products
  for each row execute procedure public.handle_updated_at();

create trigger set_updated_at_feature_flags
  before update on public.feature_flags
  for each row execute procedure public.handle_updated_at();

-- Sync auth.users to public.users
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

do $$
begin
  if not exists (select 1 from pg_trigger where tgname = 'on_auth_user_created') then
    create trigger on_auth_user_created
      after insert on auth.users
      for each row execute procedure public.handle_new_user();
  end if;
end $$;

insert into public.categories (name, slug) values
('Beauté Beauty', 'beaute-beauty'),
('Accessories', 'accessories'),
('Hats', 'hats'),
('For Him 👔', 'for-him'),
('For Her 👗', 'for-her'),
('🏡 Home & Décor', 'home-decor')
on conflict (slug) do nothing;

insert into public.collections (name, slug) values
('Peach Phoenix™', 'peach-phoenix'),
('Paris', 'paris'),
('Arizona 🌵', 'arizona'),
('Made In USA', 'made-in-usa'),
('TransLove™', 'translove'),
('TransFLOWer™', 'transflower'),
('Womanizer', 'womanizer'),
('Flamant 🦩 Rose', 'flamant-rose'),
('🌌✨ Édition Spatiale', 'edition-spatiale'),
('Unicorn 🦄', 'unicorn'),
('Crystal Skies.', 'crystal-skies'),
('🌈 Pride 26', 'pride-26'),
('❄️ Glow in Winter 26', 'glow-in-winter-26'),
('Good Vibes Only.', 'good-vibes-only')
on conflict (slug) do nothing;

insert into public.feature_flags (key, enable_3d_hero)
values ('home_hero', true)
on conflict (key) do nothing;

commit;
