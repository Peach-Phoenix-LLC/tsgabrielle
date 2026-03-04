-- Supabase verification script
-- Run in SQL Editor after migrations are applied.

begin;

-- 1) Required tables exist
select
  table_name
from information_schema.tables
where table_schema = 'public'
  and table_name in (
    'categories',
    'collections',
    'products',
    'product_images',
    'product_variants',
    'users',
    'orders',
    'order_items',
    'feature_flags'
  )
order by table_name;

-- 2) RLS enabled on required public tables
select
  c.relname as table_name,
  c.relrowsecurity as rls_enabled
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public'
  and c.relname in (
    'categories',
    'collections',
    'products',
    'product_images',
    'product_variants',
    'users',
    'orders',
    'order_items',
    'feature_flags'
  )
order by c.relname;

-- 3) Policies created
select
  schemaname,
  tablename,
  policyname,
  cmd
from pg_policies
where schemaname = 'public'
  and tablename in (
    'categories',
    'collections',
    'products',
    'product_images',
    'product_variants',
    'users',
    'orders',
    'order_items',
    'feature_flags'
  )
order by tablename, policyname;

-- 4) Admin/helper functions exist
select
  p.proname as function_name,
  pg_get_function_identity_arguments(p.oid) as args
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public'
  and p.proname in (
    'is_admin',
    'set_user_admin',
    'set_user_admin_by_id',
    'set_latest_user_admin'
  )
order by p.proname;

-- 5) Triggers exist
select
  event_object_table as table_name,
  trigger_name
from information_schema.triggers
where trigger_schema = 'public'
  and trigger_name in ('set_updated_at_products', 'set_updated_at_feature_flags')
union all
select
  'auth.users' as table_name,
  tgname as trigger_name
from pg_trigger
where tgname = 'on_auth_user_created'
order by table_name;

-- 6) Feature flag seed exists
select key, enable_3d_hero, updated_at
from public.feature_flags
where key = 'home_hero';

-- 6) Counts snapshot
select
  (select count(*) from public.categories) as categories_count,
  (select count(*) from public.collections) as collections_count,
  (select count(*) from public.products) as products_count,
  (select count(*) from public.product_variants) as variants_count,
  (select count(*) from public.orders) as orders_count,
  (select count(*) from public.users) as public_users_count,
  (select count(*) from auth.users) as auth_users_count;

rollback;
