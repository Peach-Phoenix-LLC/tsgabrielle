begin;

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false);
$$;

do $$
begin
  if to_regclass('public.categories') is not null then
    execute 'alter table public.categories enable row level security';
    execute 'drop policy if exists "categories_public_read" on public.categories';
    execute 'drop policy if exists "categories_admin_write" on public.categories';
    execute 'create policy "categories_public_read" on public.categories for select using (true)';
    execute 'create policy "categories_admin_write" on public.categories for all using (public.is_admin()) with check (public.is_admin())';
  end if;
end $$;

do $$
begin
  if to_regclass('public.collections') is not null then
    execute 'alter table public.collections enable row level security';
    execute 'drop policy if exists "collections_public_read" on public.collections';
    execute 'drop policy if exists "collections_admin_write" on public.collections';
    execute 'create policy "collections_public_read" on public.collections for select using (true)';
    execute 'create policy "collections_admin_write" on public.collections for all using (public.is_admin()) with check (public.is_admin())';
  end if;
end $$;

do $$
begin
  if to_regclass('public.products') is not null then
    execute 'alter table public.products enable row level security';
    execute 'drop policy if exists "products_public_read" on public.products';
    execute 'drop policy if exists "products_admin_write" on public.products';
    execute 'create policy "products_public_read" on public.products for select using (active = true)';
    execute 'create policy "products_admin_write" on public.products for all using (public.is_admin()) with check (public.is_admin())';
  end if;
end $$;

do $$
begin
  if to_regclass('public.product_images') is not null then
    execute 'alter table public.product_images enable row level security';
    execute 'drop policy if exists "product_images_public_read" on public.product_images';
    execute 'drop policy if exists "product_images_admin_write" on public.product_images';
    execute 'create policy "product_images_public_read" on public.product_images for select using (true)';
    execute 'create policy "product_images_admin_write" on public.product_images for all using (public.is_admin()) with check (public.is_admin())';
  end if;
end $$;

do $$
begin
  if to_regclass('public.product_variants') is not null then
    execute 'alter table public.product_variants enable row level security';
    execute 'drop policy if exists "product_variants_public_read" on public.product_variants';
    execute 'drop policy if exists "product_variants_admin_write" on public.product_variants';
    execute 'create policy "product_variants_public_read" on public.product_variants for select using (true)';
    execute 'create policy "product_variants_admin_write" on public.product_variants for all using (public.is_admin()) with check (public.is_admin())';
  end if;
end $$;

do $$
begin
  if to_regclass('public.feature_flags') is not null then
    execute 'alter table public.feature_flags enable row level security';
    execute 'drop policy if exists "feature_flags_public_read" on public.feature_flags';
    execute 'drop policy if exists "feature_flags_admin_write" on public.feature_flags';
    execute 'create policy "feature_flags_public_read" on public.feature_flags for select using (true)';
    execute 'create policy "feature_flags_admin_write" on public.feature_flags for all using (public.is_admin()) with check (public.is_admin())';
  end if;
end $$;

do $$
begin
  if to_regclass('public.users') is not null then
    execute 'alter table public.users enable row level security';
    execute 'drop policy if exists "users_select_own" on public.users';
    execute 'drop policy if exists "users_insert_own" on public.users';
    execute 'drop policy if exists "users_update_own" on public.users';
    execute 'create policy "users_select_own" on public.users for select using (id = auth.uid() or public.is_admin())';
    execute 'create policy "users_insert_own" on public.users for insert with check (id = auth.uid() or public.is_admin())';
    execute 'create policy "users_update_own" on public.users for update using (id = auth.uid() or public.is_admin()) with check (id = auth.uid() or public.is_admin())';
  end if;
end $$;

do $$
begin
  if to_regclass('public.orders') is not null then
    execute 'alter table public.orders enable row level security';
    execute 'drop policy if exists "orders_select_own" on public.orders';
    execute 'drop policy if exists "orders_insert_own" on public.orders';
    execute 'drop policy if exists "orders_admin_all" on public.orders';
    execute 'create policy "orders_select_own" on public.orders for select using (user_id = auth.uid() or public.is_admin())';
    execute 'create policy "orders_insert_own" on public.orders for insert with check (user_id = auth.uid() or public.is_admin())';
    execute 'create policy "orders_admin_all" on public.orders for update using (public.is_admin()) with check (public.is_admin())';
  end if;
end $$;

do $$
begin
  if to_regclass('public.order_items') is not null and to_regclass('public.orders') is not null then
    execute 'alter table public.order_items enable row level security';
    execute 'drop policy if exists "order_items_select_own_order" on public.order_items';
    execute 'drop policy if exists "order_items_insert_own_order" on public.order_items';
    execute 'drop policy if exists "order_items_admin_all" on public.order_items';
    execute 'create policy "order_items_select_own_order" on public.order_items for select using (exists (select 1 from public.orders o where o.id = order_items.order_id and (o.user_id = auth.uid() or public.is_admin())))';
    execute 'create policy "order_items_insert_own_order" on public.order_items for insert with check (exists (select 1 from public.orders o where o.id = order_items.order_id and (o.user_id = auth.uid() or public.is_admin())))';
    execute 'create policy "order_items_admin_all" on public.order_items for update using (public.is_admin()) with check (public.is_admin())';
  end if;
end $$;

commit;
