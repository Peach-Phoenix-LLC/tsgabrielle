# Supabase Workflow

This project uses SQL migrations in `supabase/migrations`.

## First-time setup

1. Login:
   - `npx supabase login`
2. Link project:
   - `npx supabase link --project-ref wfwcydmfdtlpupdozdvn`
3. Confirm local env values in `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

## Migration order

The current baseline migrations are:

1. `20260304090000_init_schema.sql`
2. `20260304090100_init_rls.sql`
3. `20260304090200_init_admin_role_helpers.sql`

## Apply migrations

Push all unapplied migrations to linked remote:

- `npx supabase db push`

Check migration state:

- `npx supabase migration list`

## Verify deployment

Run `supabase/verify.sql` in Supabase SQL Editor after `db push`.

Expected:
- required tables are listed
- `rls_enabled = true` for all protected tables
- policies exist for catalog/user/order tables
- helper functions exist (`is_admin`, `set_user_admin*`)

## Create new migration

1. Create file:
   - `npx supabase migration new <name>`
2. Add SQL to the new file.
3. Apply:
   - `npx supabase db push`

## Admin role helper usage

After migrations are applied:

- Grant admin by email:
  - `select public.set_user_admin('you@example.com', true);`
- Grant admin to latest signed-up user:
  - `select public.set_latest_user_admin(true);`
- Remove admin by email:
  - `select public.set_user_admin('you@example.com', false);`

Sign out and sign in again after role changes so JWT claims refresh.

## Safety rules

- Never commit `.env.local`.
- Never expose `SUPABASE_SERVICE_ROLE_KEY`.
- Rotate keys immediately if they are shared in chat/logs.
