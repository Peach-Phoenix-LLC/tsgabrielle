begin;

alter table public.collections
  add column if not exists title text,
  add column if not exists subtitle text,
  add column if not exists tags text[] not null default '{}',
  add column if not exists hero_image_1 text,
  add column if not exists hero_image_2 text,
  add column if not exists hero_image_3 text,
  add column if not exists hero_description_1 text,
  add column if not exists hero_description_2 text,
  add column if not exists hero_description_3 text,
  add column if not exists background_color text,
  add column if not exists text_color text,
  add column if not exists product_grid_background_color text,
  add column if not exists product_grid_text_color text,
  add column if not exists product_grid_accent_color text,
  add column if not exists hero_overlay_color text;

commit;
