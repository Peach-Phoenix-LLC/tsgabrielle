# Admin Dashboard Fixes — Design Doc

**Date:** 2026-03-10
**Branch:** `claude/admin-dashboard-fixes`
**Scope:** Full audit fix — routing, accessibility, real data, functional buttons

---

## Problem

The admin dashboard (`app/admin/page.tsx`) has several issues found in a full audit:

- All sections rendered via `useState` tab switching — URL never updates, no deep linking, browser back/forward broken
- Stub pages: Orders, Order Detail, Feature Flags show placeholder content only
- Non-functional UI: Search, Filter, Export, Delete buttons are wired to nothing
- Accessibility gaps: missing `aria-label`, `aria-current`, table `scope="col"`
- Hardcoded fake data: "12 Active Visitors" displayed as live
- Dead code: `{false && (...)}` block never renders
- Sign-out creates a new Supabase client via dynamic import instead of using `lib/supabase/client.ts`

---

## Decisions

| Decision | Choice | Reason |
|---|---|---|
| Routing approach | Separate routes (`/admin/[section]`) | Proper Next.js App Router pattern, full deep linking, matches existing `/admin/products/page.tsx` |
| Active sidebar state | `usePathname()` | No prop drilling, works automatically with App Router |
| Orders data | Supabase via `getSupabaseServerClient()` | Consistent with rest of codebase |
| Feature flags | Supabase `feature_flags` table + API route | Already exists, just needs UI |
| Delete confirmation | Modal dialog | Prevents accidental deletion, matches admin UX patterns |
| Export | CSV download via client-side Blob | No server needed for small datasets |

---

## Architecture

### Sidebar moves to layout

`app/admin/layout.tsx` becomes a full shared layout with the sidebar. Every admin route automatically gets the sidebar without any prop passing.

```
app/admin/
├── layout.tsx              ← sidebar (shared, uses usePathname)
├── page.tsx                ← /admin — dashboard overview + real stats
├── settings/page.tsx
├── products/page.tsx       ← already exists, add search/filter/export/delete
├── orders/page.tsx         ← real orders from Supabase
├── orders/[id]/page.tsx    ← real order detail
├── feature-flags/page.tsx  ← real toggles from feature_flags table
├── hero/page.tsx
├── about/page.tsx
├── nav/page.tsx
├── footer/page.tsx
├── categories/page.tsx
├── collections/page.tsx
├── pages/page.tsx
├── design/page.tsx
├── checkout/page.tsx
├── seo/page.tsx
├── notifications/page.tsx
├── email/page.tsx
└── translations/page.tsx
```

### Sidebar component (`app/admin/layout.tsx`)

- `'use client'` — needs `usePathname()`
- `SIDEBAR_ITEMS` maps `id` → `href` (e.g. `"products"` → `"/admin/products"`)
- Each item renders as `<Link href={item.href}>` instead of `<button onClick>`
- Active detection: `pathname === item.href` or `pathname.startsWith(item.href)`
- Active item gets `aria-current="page"`
- `<nav aria-label="Admin navigation">`
- Sign-out uses `import { createClient } from '@/lib/supabase/client'` — no dynamic import

### Products page (`app/admin/products/page.tsx`)

- Search: `useState` filter on client, filters by title/SKU/category
- Filter button: dropdown with Active/Draft/All status options
- Export button: generates CSV from current filtered rows, triggers Blob download
- Delete button: opens confirmation modal → calls `DELETE /api/admin/products/[id]` which soft-deletes via `deleted_at`

### Orders page (`app/admin/orders/page.tsx`)

- Server Component fetching from `orders` table with `order_items`
- Columns: Order ID, Customer, Date, Total, Status (PayPal + Printful)
- Links to `/admin/orders/[id]`

### Order detail (`app/admin/orders/[id]/page.tsx`)

- Fetches full order: customer info, line items, shipping address, PayPal status, Printful status
- Shows timeline of events (created → paid → fulfilled → shipped)

### Feature Flags (`app/admin/feature-flags/page.tsx`)

- Fetches all rows from `feature_flags` table
- Toggle switch per flag — calls `PATCH /api/feature-flags` to update
- Shows flag name, description, current state

---

## Accessibility Fixes

| Element | Fix |
|---|---|
| `<nav>` | Add `aria-label="Admin navigation"` |
| Active sidebar link | Add `aria-current="page"` |
| Products `<table>` | Add `aria-label="Product inventory"` |
| `<th>` elements | Add `scope="col"` |
| Search input | Add `aria-label="Search products"` |
| Filter/Export buttons | Add descriptive `aria-label` |

---

## Cleanup

- Remove `{false && (...)}` dead code block from `app/admin/page.tsx`
- Remove hardcoded "12 Active Visitors" — replace with real PostHog active users or remove
- Remove fake city ping animation data or clearly label as decorative

---

## Out of Scope

- Quill v2 upgrade (deferred to separate PR)
- `openclaw` vulnerability (intentionally kept)
- New admin sections beyond what currently exists
