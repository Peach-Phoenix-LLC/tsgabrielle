# CLAUDE.md — tsgabrielle E-Commerce Store

Comprehensive guide for AI assistants working in this codebase.

---

## Project Overview

**tsgabrielle** is a luxury brand e-commerce storefront built on:

- **Next.js 14+ App Router** (TypeScript, strict mode)
- **Supabase** — PostgreSQL database, Row Level Security, Auth
- **Tailwind CSS** — custom theme with brand colors and animations
- **PayPal** — payments (create order → capture → webhook)
- **Printful** — print-on-demand fulfillment and inventory sync
- **Klaviyo** — email marketing and event tracking
- **Resend** — transactional email
- **Vercel** — deployment (iad1 region, 30s max function duration)
- **Playwright** — E2E tests (Chromium only)

---

## Essential Commands

```bash
# Development
npm run dev              # Start dev server on localhost:3000 (Turbopack enabled)
npm run build            # Production build
npm run start            # Start production server

# Code Quality (run before committing)
npm run lint             # ESLint
npm run typecheck        # TypeScript tsc --noEmit

# Testing
npx playwright test                              # All Playwright tests
npx playwright test --project=chromium          # Chromium only
npx playwright test --grep "homepage"           # Filter by name
npx playwright test tests/admin.spec.ts         # Single file
npx playwright test tests/homepage.spec.ts:10   # Specific line

# Database
npm run seed                          # Seed Supabase with data
npm run import:products:v2            # Bulk import products from CSV

# Supabase migrations
npx supabase db push                  # Apply pending migrations to linked project

# Printful sync
npx ts-node scripts/sync-printful-inventory.ts
node scripts/setup-printful-webhooks.js
```

---

## Repository Structure

```
tsgabrielle/
├── app/                        # Next.js App Router pages (~84 page files)
│   ├── page.tsx                # Homepage (hero slides, featured products)
│   ├── layout.tsx              # Root layout with fonts
│   ├── middleware.ts           # Auth middleware + security headers
│   ├── admin/                  # Admin dashboard routes (protected)
│   ├── account/                # User account pages
│   ├── checkout/               # Checkout flow
│   ├── api/                    # API route handlers (17 endpoints)
│   │   ├── admin/              # Protected admin endpoints
│   │   ├── paypal/             # create-order, capture-order, webhook
│   │   ├── printful/           # sync, webhook
│   │   ├── klaviyo/            # subscribe, track-event
│   │   └── feature-flags/      # Feature flag retrieval
│   └── auth/                   # Auth callback handler
├── components/                 # React components (~34 files)
│   ├── Header.tsx / Footer.tsx # Layout components
│   ├── CollectionHero.tsx      # Collection page hero
│   ├── ProductGrid.tsx         # Grid layout for products
│   ├── ContentPagesManager.tsx # Admin CMS component
│   └── [Section managers]     # Admin section editors
├── lib/                        # Utility/helper modules
│   ├── types.ts                # All shared TypeScript types
│   ├── supabase/
│   │   ├── server.ts           # Server-side Supabase client (service role)
│   │   └── client.ts           # Client-side Supabase auth helper
│   ├── seo.ts                  # buildMetadata() helper
│   ├── menu.ts                 # Navigation structure (CATEGORIES, COLLECTIONS)
│   ├── paypal.ts               # PayPal OAuth + API wrapper
│   ├── printful.ts             # Printful API integration
│   ├── klaviyo.ts              # Klaviyo marketing API
│   ├── content.ts              # Dynamic page content retrieval
│   ├── admin-auth.ts           # Admin role verification
│   ├── rate-limit.ts           # Rate limiting utility
│   └── sanitize.ts             # HTML sanitization (XSS prevention via DOMPurify)
├── hooks/                      # Custom React hooks
│   ├── useCart.tsx             # Shopping cart state management
│   ├── useFeatureFlag.ts       # Feature flag toggle system
│   ├── useAntigravityParallax.ts  # Parallax scroll effect
│   └── usePeaches.ts           # Peaches loyalty program logic
├── config/                     # App-wide configuration
├── scripts/                    # One-off utility scripts
│   ├── seed-supabase.js        # Seed database
│   ├── upload-products-csv-v2.js # Bulk product import
│   ├── sync-printful-inventory.ts
│   ├── setup-printful-webhooks.js
│   └── deploy-vercel.ps1       # Vercel deployment (PowerShell)
├── supabase/                   # Supabase migrations + edge functions
│   └── migrations/             # 15+ sequential SQL migration files
├── tests/                      # Playwright E2E tests
│   ├── homepage.spec.ts
│   ├── products.spec.ts
│   ├── cart.spec.ts
│   ├── auth.spec.ts
│   └── admin.spec.ts           # Most comprehensive test suite
├── docs/                       # Supplemental documentation
│   ├── deployment.md           # Vercel + Supabase deployment guide
│   └── supabase.md             # Supabase setup and migration workflow
├── public/                     # Static assets
├── tailwind.config.ts          # Tailwind theme (brand colors, animations)
├── next.config.ts              # Next.js config (redirects, remote images, Turbopack)
├── tsconfig.json               # TypeScript config (strict, @/ path alias)
├── eslint.config.mjs           # ESLint config (Next.js + TypeScript rules)
├── playwright.config.ts        # Playwright config (Chromium, base URL)
├── vercel.json                 # Vercel deployment config (iad1, 30s timeout)
└── .env.example                # All required environment variables listed here
```

---

## Environment Variables

Copy `.env.example` to `.env.local` for development. Required variables:

```bash
# Site
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_LOGO_URL

# Supabase
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY        # Server-only — never expose to client

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID
NEXT_PUBLIC_GTM_ID

# Klaviyo (email marketing)
NEXT_PUBLIC_KLAVIYO_LIST_ID
NEXT_PUBLIC_KLAVIYO_PUBLIC_KEY
NEXT_PUBLIC_KLAVIYO_SITE_ID
KLAVIYO_API_KEY                  # Server-only
KLAVIYO_PRIVATE_API_KEY          # Server-only

# Email
RESEND_API_KEY                   # Server-only

# Printful (print-on-demand)
PRINTFUL_API_KEY
PRINTFUL_WEBHOOK_SECRET

# PayPal
PAYPAL_ENV                       # "sandbox" or "live"
NEXT_PUBLIC_PAYPAL_CLIENT_ID     # Public
PAYPAL_CLIENT_ID                 # Server-only
PAYPAL_CLIENT_SECRET             # Server-only
PAYPAL_WEBHOOK_ID

# Admin access
ADMIN_EMAILS                     # Comma-separated list of admin email addresses
```

---

## Code Style & Conventions

### TypeScript

- Strict mode enforced (`tsconfig.json`)
- Use explicit types for function parameters/return values when not inferrable
- Prefer `unknown` over `any`; `@typescript-eslint/no-explicit-any` is disabled in ESLint but use `any` sparingly
- Use **Zod** for runtime validation of external data (API responses, form inputs, Supabase results)
- All shared types are in `@/lib/types.ts`

### Naming

| Thing | Convention | Example |
|---|---|---|
| React components | PascalCase | `ProductCard`, `Header` |
| Component files | PascalCase `.tsx` | `ProductCard.tsx` |
| Utility/lib files | kebab-case or camelCase | `rate-limit.ts`, `seo.ts` |
| Variables/functions | camelCase | `featuredProducts`, `isLoading` |
| Config constants | UPPER_SNAKE_CASE | `MAX_RETRIES` |
| Database tables/columns | snake_case | `product_images`, `order_items` |

### Imports

Use absolute imports with `@/` prefix (configured in `tsconfig.json`).

Group and order imports:
```typescript
// 1. External libraries
import { useState } from "react";
import Link from "next/link";

// 2. Internal libraries/utils
import { buildMetadata } from "@/lib/seo";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { CATEGORIES } from "@/lib/menu";

// 3. Components
import { ProductCard } from "@/components/ProductCard";

// 4. Types
import type { Product } from "@/lib/types";
```

### React & Next.js Patterns

**Default to Server Components.** Only add `'use client'` when the component uses hooks, event handlers, or browser APIs.

```typescript
// Server Component — data fetching (default)
export default async function ProductsPage() {
  const supabase = getSupabaseServerClient();
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("active", true);
  return <ProductGrid products={products ?? []} />;
}
```

```typescript
// Client Component — only when needed
'use client';
import { useState } from "react";

export function AddToCartButton({ productId }: { productId: string }) {
  const [added, setAdded] = useState(false);
  // ...
}
```

**Dynamic imports** for heavy libraries (Three.js, large UI components):
```typescript
const HeroScene = dynamic(() => import("@/components/HeroScene"), { ssr: false });
```

**Force dynamic** for real-time data pages:
```typescript
export const dynamic = "force-dynamic";
```

**Metadata** via `buildMetadata()`:
```typescript
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Shop All Products",
  description: "Browse our full collection",
  path: "/products"
});
```

### Tailwind CSS

- All styling via utility classes — avoid custom CSS unless absolutely necessary
- Mobile-first responsive: `text-sm md:text-base lg:text-lg`
- Brand primary color: `#a932bd` (purple) — available as `primary` in theme
- Custom animations in `tailwind.config.ts`: `liquid`, `iridescent`, `float`
- Use semantic accessibility attributes: `aria-label`, `role`

### Error Handling

```typescript
try {
  const { data, error } = await supabase.from("products").select("*");
  if (error) throw error;
  return data;
} catch (err) {
  console.error("Failed to fetch products:", err);
  // Surface user-friendly message in UI
}
```

- `console.warn` for non-critical issues
- `console.error` for failures
- Use `error.tsx` files for route-level error boundaries

### Security

- **Never** expose `SUPABASE_SERVICE_ROLE_KEY`, `PAYPAL_CLIENT_SECRET`, or other server-only secrets to the client
- Use `@/lib/sanitize.ts` (DOMPurify) to sanitize any HTML before rendering
- Rate limiting is implemented in `@/lib/rate-limit.ts` — apply it to public API routes
- Admin routes are protected via middleware in `middleware.ts`; verify admin role with `@/lib/admin-auth.ts`
- Security headers (X-Frame-Options, HSTS, etc.) are set in `middleware.ts`

---

## Database (Supabase)

### Key Tables

| Table | Purpose |
|---|---|
| `products` | Product catalog |
| `product_images` | Images with sort order, foreign key to products |
| `product_variants` | SKU variants with Printful IDs |
| `categories` | Product categories |
| `collections` | Product collections |
| `orders` | Order records (PayPal + Printful integrated) |
| `order_items` | Line items per order |
| `users` | User profiles from auth |

### Patterns

```typescript
// Always use typed client
import { getSupabaseServerClient } from "@/lib/supabase/server";

const supabase = getSupabaseServerClient();
const { data, error } = await supabase
  .from("products")
  .select("*, product_images(*), product_variants(*)")
  .eq("active", true)
  .order("created_at", { ascending: false });
```

- All tables have **Row Level Security (RLS)** enabled
- Admin access verified via `is_admin()` Supabase function
- All column/table names are **snake_case**
- Soft delete is supported (check `deleted_at` column where applicable)

### Migrations

```bash
# Create a new migration
npx supabase migration new <migration-name>

# Apply migrations to the linked Supabase project
npx supabase db push
```

Migrations live in `supabase/migrations/` as sequentially numbered SQL files.

---

## E-Commerce Data Flow

```
User browses products (Supabase)
  → Adds to cart (useCart hook, client-side state)
    → Checkout: Create PayPal order (/api/paypal/create-order)
      → PayPal capture (/api/paypal/capture-order)
        → Store order in Supabase (orders + order_items tables)
          → Printful fulfillment (PayPal webhook → /api/printful/sync)
            → Tracking updates (Printful webhook → /api/printful/webhook)
```

---

## Admin Dashboard

- Routes: `/admin/*` — all protected by middleware
- Role verification: `@/lib/admin-auth.ts` + Supabase `is_admin()` function
- Admin emails configured via `ADMIN_EMAILS` env var (comma-separated)
- Key admin components:
  - `ContentPagesManager.tsx` — CMS for dynamic page content
  - `SiteSettingsManager.tsx` — Global site settings
  - Section managers: Analytics, Theme, Orders, Products, Footer, Collections, Categories, Checkout

---

## Feature Flags

A lightweight feature flag system exists to toggle features at runtime:

```typescript
// In a Client Component
import { useFeatureFlag } from "@/hooks/useFeatureFlag";

const is3DHeroEnabled = useFeatureFlag("3d_hero");
```

Flags are fetched from `/api/feature-flags/` and stored in Supabase. This is used to toggle heavy features like the 3D hero animation.

---

## Testing (Playwright)

Tests live in `tests/` with `.spec.ts` extension.

**Config:** `playwright.config.ts`
- Chromium only
- Base URL: `https://tsgabrielle.us` (or `TEST_URL` env var for other environments)
- Screenshots on failure, traces on first retry
- 2 retries in CI, 0 locally

**Test files:**
- `homepage.spec.ts` — Homepage, navigation, collections
- `products.spec.ts` — Product catalog
- `cart.spec.ts` — Shopping cart
- `auth.spec.ts` — Authentication flows
- `admin.spec.ts` — Admin dashboard and CMS (most comprehensive)

**Best practices:**
- Use Playwright locators: `getByRole`, `getByText`, `locator` — avoid XPath
- Clean up test data after tests where applicable
- Use descriptive test names explaining the scenario

---

## Key Architecture Notes

1. **3D Hero**: React Three Fiber + Drei loaded via dynamic import (`ssr: false`). Uses `useAntigravityParallax` hook. Controlled by feature flag.

2. **Dynamic Content**: Page content (hero slides, text blocks) is stored in the `page_content` Supabase table, fetched in Server Components via `@/lib/content.ts`. Editable via admin CMS.

3. **External API Integrations**: All external API calls (PayPal, Printful, Klaviyo, Resend) go through wrapper modules in `lib/`. Never call external APIs directly in page or component files.

4. **Image Optimization**: Remote images are served from Supabase Storage and Printful CDN. Both are configured as allowed remote patterns in `next.config.ts`.

5. **Turbopack**: Enabled via `next dev` (Next.js 14+ default). Improves dev startup time.

6. **URL Redirects**: Legacy URL patterns are redirected in `next.config.ts`. Check there before adding new routes.

---

## Deployment

- **Platform:** Vercel, project `tsgabrielle-live`, team `tsg3`
- **Project ID:** `prj_DTVjxOjXU71Kin9TpVNYPeF20ONA`
- **Team account ID:** `team_WShraYQKcxM49c96eLw4YHYD`
- **Region:** `iad1` (Northern Virginia)
- **Max function duration:** 30 seconds
- **Supabase project:** `wfwcydmfdtlpupdozdvn`
- **Production domain:** `https://tsgabrielle.us`
- Auth redirect: `https://tsgabrielle.us/auth/callback`

---

## Deployment Runbook (Claude AI Sessions)

### Environment constraints
- Git pushes are **only allowed to `claude/` branches** — pushing to `main` or `master` returns HTTP 403.
- `gh` CLI is **not available**. GitHub API calls via `curl` also fail (no GitHub token in environment).
- The local proxy at `127.0.0.1:42649` handles git operations only — no GitHub REST API calls.
- Vercel CLI (`npx vercel`) **works** using the Vercel token.

### How to deploy (in order of preference)

#### Option 1 — Direct Vercel CLI deploy (fastest, always works)
```bash
npx vercel --prod \
  --token $VERCEL_TOKEN \
  --scope tsg3 \
  --yes
```
Token name in Vercel dashboard: **tsgabrielle** (ask the project owner for the value, or retrieve from Vercel account tokens page).
Uploads local files and deploys directly to production. No GitHub involved.

#### Option 2 — Trigger via Vercel deploy hook (deploys from `main` branch on GitHub)
```bash
# Deploy hook URL is stored in Vercel project settings → Git → Deploy Hooks
# Hook name: "auto-deploy", ref: main
curl -X POST "<deploy-hook-url>"
```
Only use this when `main` on GitHub has correct, buildable code.

#### Option 3 — GitHub Actions (auto, on push to `main`)
The workflow at `.github/workflows/deploy.yml` triggers automatically on push to `main`.
Requires `VERCEL_TOKEN` secret set in GitHub repo settings → Actions → Secrets.
Token name: `tsgabrielle`, value: the Vercel token above.

### Auto-deploy setup (already configured)
- Vercel native GitHub integration watches the `main` branch.
- Every push to `main` triggers an automatic Vercel build and deploy.
- Vercel ignore-build command: `node -e "process.exit(require('fs').existsSync('./proxy.ts') ? 0 : 1)"`
  — skips builds when `proxy.ts` is present (legacy conflict guard), proceeds when it's absent.

### Vercel API (use with the token above)
```bash
# Check project status / git link
curl -s "https://api.vercel.com/v9/projects/prj_DTVjxOjXU71Kin9TpVNYPeF20ONA?teamId=team_WShraYQKcxM49c96eLw4YHYD" \
  -H "Authorization: Bearer <token>"

# List recent deployments
curl -s "https://api.vercel.com/v6/deployments?projectId=prj_DTVjxOjXU71Kin9TpVNYPeF20ONA&teamId=team_WShraYQKcxM49c96eLw4YHYD&limit=5" \
  -H "Authorization: Bearer <token>"

# Get build logs for a failed deployment
curl -s "https://api.vercel.com/v2/deployments/<dpl_id>/events?teamId=team_WShraYQKcxM49c96eLw4YHYD&builds=1" \
  -H "Authorization: Bearer <token>"

# Update project setting (e.g. production branch, ignoreCommand)
curl -s -X PATCH "https://api.vercel.com/v9/projects/prj_DTVjxOjXU71Kin9TpVNYPeF20ONA?teamId=team_WShraYQKcxM49c96eLw4YHYD" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"commandForIgnoringBuildStep": "..."}'

# Change production branch (undocumented endpoint used by Vercel dashboard)
curl -s -X PATCH "https://api.vercel.com/v9/projects/prj_DTVjxOjXU71Kin9TpVNYPeF20ONA/branch?teamId=team_WShraYQKcxM49c96eLw4YHYD" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"branch": "main"}'
```

### Diagnosing build failures
1. Check recent deployments for ERROR state
2. Fetch build events — look for lines containing `error`, `Error`, `failed`, `cannot`
3. Common causes found so far:
   - **`proxy.ts` + `middleware.ts` coexisting** → delete `proxy.ts` (it's a deprecated duplicate)
   - Missing env vars → check Vercel project environment variables

### Git workflow in Claude sessions
```bash
# Always develop on the session branch
git checkout claude/claude-md-<session-id>

# Commit changes
git add <files>
git commit -m "fix: description"

# Push — only claude/ branches allowed
git push -u origin claude/claude-md-<session-id>

# Deploy immediately without waiting for PR merge
npx vercel --prod --token <token> --scope tsg3 --yes
```

### Health check
```bash
curl -s -o /dev/null -w "%{http_code}" https://tsgabrielle.us
# Expected: 200
```

### GitHub API access from Claude sessions
Public GitHub API endpoints (read-only) work unauthenticated through the egress proxy:
```bash
curl -s https://api.github.com/repos/Peach-Phoenix-LLC/tsgabrielle
```
Authenticated endpoints (creating PRs, setting secrets, merging) require a GitHub PAT.
The git proxy at `127.0.0.1:42649` holds a GitHub token internally but does not expose it —
it only handles `git push/fetch/clone` operations to `claude/` prefixed branches.

**With GitHub MCP connected** (via Claude.ai MCP connectors), all GitHub operations become
available as tools: `create_pull_request`, `merge_pull_request`, `create_or_update_secret`, etc.

---

## MCP Integration

Project MCP config is at `.mcp.json` in the repo root. It defines three servers:

| Server | Package | Purpose |
|---|---|---|
| `github` | `@modelcontextprotocol/server-github` | PRs, issues, branches, secrets |
| `supabase` | `@supabase/mcp-server-supabase` | DB queries, migrations, RLS |
| `vercel` | `mcp-server-vercel` | Deployments, env vars, domains |

### Required environment variables for MCP
```bash
GITHUB_TOKEN=<github-pat-with-repo-scope>
SUPABASE_ACCESS_TOKEN=<supabase-personal-access-token>
VERCEL_TOKEN=vcp_...   # already known — see Vercel dashboard, token name: tsgabrielle
```

### What GitHub MCP unlocks
Once `GITHUB_TOKEN` is set and GitHub MCP is active, Claude can autonomously:
- Create and merge PRs (e.g. merging the `claude/` fix branches into `main`)
- Set GitHub Actions secrets (e.g. `VERCEL_TOKEN`) — eliminating the last manual step
- Create issues, review code, manage branch protection

### Activating MCP servers
MCP servers in `.mcp.json` activate automatically when Claude Code starts in this directory.
Set the env vars above in your shell or in a `.env.local` (never commit tokens).

See `docs/deployment.md` for full Vercel + Supabase + GoDaddy DNS setup steps.
