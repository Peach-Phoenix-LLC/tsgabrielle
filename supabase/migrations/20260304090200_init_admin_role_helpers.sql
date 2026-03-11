begin;

create or replace function public.set_user_admin(target_email text, make_admin boolean default true)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  target_user_id uuid;
begin
  select id into target_user_id
  from auth.users
  where lower(email) = lower(target_email)
  limit 1;

  if target_user_id is null then
    return 'User not found for email: ' || target_email;
  end if;

  update auth.users
  set raw_app_meta_data =
    case
      when make_admin then coalesce(raw_app_meta_data, '{}'::jsonb) || jsonb_build_object('role', 'admin')
      else coalesce(raw_app_meta_data, '{}'::jsonb) - 'role'
    end
  where id = target_user_id;

  if make_admin then
    return 'Admin role granted to: ' || target_email;
  end if;
  return 'Admin role removed from: ' || target_email;
end;
$$;

create or replace function public.set_user_admin_by_id(target_user_id uuid, make_admin boolean default true)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  target_email text;
begin
  select email into target_email
  from auth.users
  where id = target_user_id
  limit 1;

  if target_email is null then
    return 'User not found for id: ' || target_user_id::text;
  end if;

  update auth.users
  set raw_app_meta_data =
    case
      when make_admin then coalesce(raw_app_meta_data, '{}'::jsonb) || jsonb_build_object('role', 'admin')
      else coalesce(raw_app_meta_data, '{}'::jsonb) - 'role'
    end
  where id = target_user_id;

  if make_admin then
    return 'Admin role granted to: ' || target_email;
  end if;
  return 'Admin role removed from: ' || target_email;
end;
$$;

create or replace function public.set_latest_user_admin(make_admin boolean default true)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  latest_user_id uuid;
begin
  select id into latest_user_id
  from auth.users
  order by created_at desc
  limit 1;

  if latest_user_id is null then
    return 'No users found in auth.users';
  end if;

  return public.set_user_admin_by_id(latest_user_id, make_admin);
end;
$$;

revoke all on function public.set_user_admin(text, boolean) from public;
grant execute on function public.set_user_admin(text, boolean) to postgres;

revoke all on function public.set_user_admin_by_id(uuid, boolean) from public;
grant execute on function public.set_user_admin_by_id(uuid, boolean) to postgres;

revoke all on function public.set_latest_user_admin(boolean) from public;
grant execute on function public.set_latest_user_admin(boolean) to postgres;

commit;
