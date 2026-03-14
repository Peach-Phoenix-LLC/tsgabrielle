# Database Backup & Integrity Protocol

## 1. Automated Backups

The tsgabrielle® platform utilizes **Supabase (PostgreSQL)** for data persistence.

- **Point-in-Time Recovery (PITR):** Enabled via Supabase Pro, allowing data restoration to any specific second within the last 7 days.
- **Daily Snapshot:** Automated daily backups are performed by the Supabase infrastructure.

## 2. Integrity Verification

The `.agent/workflows/automation.md` workflow includes a step for the "Maintenance Agent" to perform weekly schema integrity checks:

- **Prisma Drift Check:** Running `npx prisma migrate status` to ensure the production schema matches the codebase.
- **Relation Audit:** Verifying that all `Product` records have at least one `ProductVariant`.

## 3. Disaster Recovery

In the event of a critical failure:

1. **Maintenance Mode:** Enable site-wide maintenance via the Admin Panel.
2. **Supabase Restore:** Utilize the Supabase Dashboard to restore the latest healthy snapshot.
3. **Environment Sync:** Re-run `npx prisma generate` in the production environment to ensure client compatibility.

Maintained by: Antigravity Automation Agent
