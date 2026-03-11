begin;

alter table public.collections
  add column if not exists seo_title text,
  add column if not exists seo_description text,
  add column if not exists slogans text[] not null default '{}';

commit;
