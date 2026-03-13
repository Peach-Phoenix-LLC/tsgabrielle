---
name: SingleSourceOfTruth
description: >
  Enforces the tsgabrielle® data architecture law: ONE Supabase database, ALL data
  is public and real-time, EVERY admin panel save publishes instantly to the live
  site. Prevents double-databases, hidden/shadow data, staging forks, and any
  pattern that creates data drift between admin and store.
triggers:
  - "single source of truth"
  - "database architecture"
  - "admin panel save"
  - "real-time publish"
  - "one database"
  - "data hidden"
  - "public data"
  - "shadow database"
  - "cache invalidation"
  - "publish changes"
  - "storefront sync"
---

# SingleSourceOfTruth Skill

> [!IMPORTANT]
> **THE IRON LAW — NEVER VIOLATE:**
> 1. **ONE database only** → `NEXT_PUBLIC_SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY`
> 2. **ALL data is public** → No hidden rows, no `is_draft` soft-gates, no shadow tables
> 3. **Admin save = live publish** → Zero delay between saving in admin and appearing in store
> 4. **No cache layers that introduce drift** → Revalidation must be immediate (`revalidatePath` / `force-dynamic`)
> 5. **No duplicate stores** → Never create a second Supabase project, a local SQLite mirror, or a Prisma shadow DB for storefront data

---

## Core Architecture Principle

```
Admin Panel (save) → Supabase (single DB) → Storefront (reads same DB, same instant)
```

There is **no step in between**. There is **no second database**. There is **no queue**. The moment an admin clicks Save, the next storefront request reads the updated row.

---

## What This Skill Governs

### ✅ ALWAYS DO

- Use `getSupabaseServerClient()` from `lib/supabase/server.ts` for ALL server-side reads
- Use the same Supabase project for admin writes and storefront reads
- Use `export const dynamic = "force-dynamic"` on pages that display admin-managed content
- Call `revalidatePath("/")` (and relevant product/collection paths) after every admin mutation
- Store **all** product, collection, hero slide, page content, and site settings in the **one** Supabase DB
- Expose all data through the existing `lib/store.ts`, `lib/content.ts` wrappers

### ❌ NEVER DO

| Forbidden Pattern | Why It Breaks the Law |
|---|---|
| Create a second Supabase project for "staging" | Creates data drift — admin edits one, store reads another |
| Use `is_published: false` rows the store can't see | Hidden data contradicts the "all public" rule |
| Add a Redis/Upstash cache without instant invalidation | Cache drift = admin sees one truth, customers see another |
| Build a separate `products_draft` shadow table | Double database in a single project — still violates the law |
| Use `next build` static generation for admin-managed content | Static HTML doesn't reflect unsaved → saved → live reality |
| Store page content in `.json` files instead of Supabase | File storage bypasses the admin panel entirely |
| Seed data that overwrites admin-created rows | Destroys the single source of truth on every deploy |

---

## Admin Panel → Live Store Flow

```typescript
// CORRECT: Admin save route (e.g., app/api/admin/products/route.ts)
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";

export async function POST(req: Request) {
  await requireAdmin();                          // Auth gate
  const supabase = getSupabaseServerClient();    // SAME DB as storefront
  const body = await req.json();

  const { error } = await supabase
    .from("products")
    .upsert(body);

  if (error) return Response.json({ error }, { status: 500 });

  // Immediately revalidate → next storefront request sees new data
  revalidatePath("/");
  revalidatePath("/categories");
  revalidatePath("/collections");
  revalidatePath(`/product/${body.base_sku}`);

  return Response.json({ ok: true });
}
```

```typescript
// CORRECT: Storefront product page (app/product/[slug]/page.tsx)
export const dynamic = "force-dynamic"; // NO stale cache — reads DB on every request

export default async function ProductPage({ params }) {
  const supabase = getSupabaseServerClient(); // SAME client, SAME DB
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("base_sku", params.slug)
    .single();
  // ...
}
```

---

## The Admin Panel is the CMS

The tsgabrielle® admin panel (`/admin`) IS the content management system. It is not a preview tool. It is not a draft editor. Every field saved in admin is:

- Written directly to the **one** Supabase database
- Readable by the public storefront **immediately**
- The canonical truth for all content

This means:
- `page_content` table → controls all CMS page text
- `hero_slides` table → controls homepage hero
- `products` table → controls all product listings
- `site_settings` table → controls global settings (logo, colors, banner text)
- `collections` table → controls all collection metadata

**Nothing** stored elsewhere. **Nothing** hidden. **No approval workflow**. Save = Published.

---

## Detecting Violations

When reviewing code, flag any of the following as violations of this skill:

```bash
# Patterns that create hidden or double data:
grep -r "is_published\|is_draft\|draft_mode\|staging_db\|shadow_db" app/ lib/ --include="*.ts"

# Patterns that prevent real-time reads:
grep -r "generateStaticParams\|revalidate = [1-9]" app/ --include="*.ts" --include="*.tsx"

# Second database connections:
grep -r "PrismaClient\|sqlite\|mysql\|pg.Pool" lib/ --include="*.ts"

# File-based content that bypasses Supabase:
find . -name "content.json" -o -name "products.json" -o -name "settings.json" | grep -v node_modules
```

---

## Revalidation Reference

Use `revalidatePath` generously. Revalidation is cheap; data drift is expensive.

```typescript
import { revalidatePath } from "next/cache";

// After any product change:
revalidatePath("/");
revalidatePath("/categories");
revalidatePath("/categories/[slug]", "page");
revalidatePath("/collections");
revalidatePath("/collections/[slug]", "page");
revalidatePath(`/product/${sku}`);
revalidatePath(`/${sku}`);           // Short URL rule

// After hero slides change:
revalidatePath("/");

// After site settings change:
revalidatePath("/", "layout");       // Revalidates root layout (header, footer)
```

---

## When Asked to Add Caching

If a performance improvement requires caching, the ONLY acceptable pattern is:

```typescript
// Acceptable: Next.js fetch cache with immediate revalidation on mutation
const data = await fetch(`${process.env.SUPABASE_URL}/rest/v1/products`, {
  next: { tags: ["products"] }    // Tagged cache
});

// Then in admin route after mutation:
import { revalidateTag } from "next/cache";
revalidateTag("products");         // Instantly clears cache
```

**Never** introduce a separate Redis instance, Upstash KV, or in-memory store that holds canonical data without a revalidation hook.

---

## Summary Checklist

Before completing any task involving data storage or admin functionality, verify:

- [ ] Only `NEXT_PUBLIC_SUPABASE_URL` is used — no second DB connection string
- [ ] Admin save routes call `revalidatePath()` on all affected pages
- [ ] No `is_draft`, `is_hidden`, or `is_published` column acting as a soft gate
- [ ] Storefront pages use `force-dynamic` or tagged cache with revalidation
- [ ] No `.json` files in `public/` or `data/` directories serving as content stores
- [ ] No second Supabase project, Prisma shadow DB, or SQLite file
- [ ] Admin panel writes to the same table that the storefront reads from
