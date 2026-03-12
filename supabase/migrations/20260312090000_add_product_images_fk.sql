do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'product_images_product_id_fkey'
      and conrelid = 'public.product_images'::regclass
  ) then
    alter table public.product_images
      add constraint product_images_product_id_fkey
      foreign key (product_id) references public.products(id) on delete cascade;
  end if;
end $$;

select pg_notify('pgrst', 'reload schema');
