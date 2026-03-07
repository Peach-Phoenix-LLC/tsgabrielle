# CLAUDE.md — tsgabrielle E-Commerce Store

Comprehensive guide for AI assistants working in this codebase.

---

## Project Overview

**tsgabrielle** is a luxury brand e-commerce storefront built on:

- **Next.js 14+ App Router** (TypeScript, strict mode, Turbopack)
- **Supabase** — PostgreSQL database, Row Level Security, Auth
- **Tailwind CSS** — custom theme with brand colors and animations
- **PayPal** — payments (create order → capture → webhook)
- **Printful** — print-on-demand fulfillment and inventory sync
- **Klaviyo** — email marketing and event tracking
- **Resend** — transactional email
- **Vercel** — deployment (iad1 region, 30s max function duration)
- **Playwright** — E2E tests (Chromium only)
- **React Three Fiber + Drei** — optional 3D hero (feature-flagged)
- **Framer Motion** — animations
- **Zod** — runtime validation

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
npx supabase migration new <name>     # Create new migration file
npx supabase db push                  # Apply pending migrations to linked project

# Printful sync
npx ts-node scripts/sync-printful-inventory.ts
node scripts/setup-printful-webhooks.js
```

---

## Repository Structure

```
tsgabrielle/
├── app/                        # Next.js App Router (84+ page files)
│   ├── page.tsx                # Homepage (hero slides, featured products)
│   ├── layout.tsx              # Root layout — fonts (Lato, Space Grotesk), GTM, speed insights
│   ├── middleware.ts           # Auth middleware + security headers (applied globally)
│   ├── product/[slug]/         # Individual product detail page
│   ├── categories/             # All categories listing + [slug] pages
│   ├── collections/            # All collections listing + [slug] pages
│   │   └── [slug]/             # pride-26, glow-in-winter, unicorn, peach-phoenix,
│   │                           # transflower, translove, made-in-usa, arizona, paris,
│   │                           # good-vibes, crystal-skies, flamant-rose, womanizer,
│   │                           # edition-spatiale
│   ├── checkout/               # Checkout flow, success, cancel pages
│   ├── account/                # User dashboard, orders, settings, wishlist
│   ├── admin/                  # Admin dashboard routes (protected by middleware)
│   │   ├── products/           # Product list, new, [id] edit
│   │   ├── orders/             # Order list, [id] detail
│   │   ├── collections/        # Collection editor
│   │   └── feature-flags/      # Feature flag toggles
│   ├── auth/                   # sign-in, sign-up, sign-out, callback
│   ├── api/                    # API route handlers (17 endpoints)
│   │   ├── admin/              # products, orders, collections, categories,
│   │   │                       # page-content, hero-slides, settings, send-email, stats
│   │   ├── paypal/             # create-order, capture-order, webhook
│   │   ├── printful/           # sync, webhook
│   │   ├── klaviyo/            # subscribe, track-event
│   │   └── feature-flags/      # GET feature flag status
│   └── [content pages]/        # the-brand, about-gabrielle, your-inclusive-store,
│                               # sustainability, the-blogs, videos, the-collabs,
│                               # faq, contact-tsgabrielle, legal-hub, peaches,
│                               # store-directory, stores-directory,
│                               # instagram, tiktok, youtube, facebook, x-twitter,
│                               # pinterest, linkedin, snapchat (social redirects)
├── components/                 # React components (34 files)
│   ├── Header.tsx              # Top navigation with mega menu, cart icon, search
│   ├── Footer.tsx              # Footer with links and branding
│   ├── BrandLogo.tsx           # Reusable logo component
│   ├── StoreLayoutWrapper.tsx  # Layout wrapper
│   ├── Hero.tsx                # Static/text hero section
│   ├── Hero3DCanvas.tsx        # Three.js 3D rendering (feature-flagged, ssr:false)
│   ├── CollectionHero.tsx      # Collection page hero image
│   ├── CollectionHeader.tsx    # Collection title/metadata
│   ├── CollectionPageClient.tsx # Client-side collection logic
│   ├── ProductGrid.tsx         # Grid layout for products
│   ├── AddToCart.tsx           # Add-to-cart button with variant selection
│   ├── ProductClientView.tsx   # Client-side product detail
│   ├── SpatialProductViewer.tsx # Optional 3D product viewer
│   ├── SortFilterBar.tsx       # Sorting and filtering UI
│   ├── ContentPage.tsx         # Wrapper for CMS-driven pages
│   ├── ListingPage.tsx         # Wrapper for category/collection listing pages
│   ├── ContentPagesManager.tsx # Admin CMS for dynamic page content
│   ├── ProductForm.tsx         # Admin product creation/editing form
│   ├── SiteSettingsManager.tsx # Admin global site configuration
│   ├── AppProviders.tsx        # React context/provider setup
│   ├── SettingsProvider.tsx    # Global settings context
│   ├── BrandName.tsx           # Brand name display component
│   └── [Admin section managers] # AnalyticsSection, ThemeSection, OrderSection,
│                               # ProductSection, FooterSection, CollectionSection,
│                               # CategorySection, CheckoutSection, ContentSections,
│                               # EmailSection, NotificationSection
├── lib/                        # Utility/helper modules (15 files)
│   ├── types.ts                # All shared TypeScript types
│   ├── supabase/
│   │   ├── server.ts           # Server-side Supabase client (service role, no session)
│   │   └── client.ts           # Browser client (anon key, auth helper)
│   ├── store.ts                # Product data queries (getProductBySlug, getProductsByCategory,
│   │                           # getVariantsByProductId, etc.)
│   ├── content.ts              # Fetch page_content, hero_slides, site_settings from Supabase
│   ├── menu.ts                 # Navigation: CATEGORIES, COLLECTIONS, THE_COLLABS, MENU_GROUPS
│   ├── seo.ts                  # buildMetadata() helper for Next.js metadata
│   ├── paypal.ts               # PayPal OAuth + API wrapper (getPayPalAccessToken, paypalFetch)
│   ├── printful.ts             # Printful API wrapper with PrintfulSyncProduct type
│   ├── klaviyo.ts              # Klaviyo email/event API (subscribeProfileToList, trackClientEvent)
│   ├── admin-auth.ts           # requireAdmin() — verify admin role via Supabase auth cookie
│   ├── rate-limit.ts           # In-memory sliding window rate limiter + getClientIp()
│   ├── sanitize.ts             # HTML sanitization via DOMPurify (XSS prevention)
│   ├── theme.ts                # Theme variable constants
│   └── youtube.ts              # YouTube integration module
├── hooks/                      # Custom React hooks (4 files)
│   ├── useCart.tsx             # Cart context: addItem, removeItem, clearCart, totalCents
│   │                           # Persists to localStorage key: tsgabrielle_cart_v1
│   │                           # CartItem: { variantId, title, qty, priceCents }
│   ├── useFeatureFlag.ts       # Fetch feature flag boolean from /api/feature-flags
│   ├── useAntigravityParallax.ts  # Parallax scroll effect for 3D hero
│   └── usePeaches.ts           # Peaches loyalty program rewards/points logic
├── config/                     # App-wide configuration
│   └── navigation.ts           # Navigation structure constants
├── scripts/                    # One-off utility scripts (14 files)
│   ├── seed-supabase.js        # Seed database with sample data
│   ├── upload-products-csv.js  # Bulk product import (legacy)
│   ├── upload-products-csv-v2.js # Bulk product import v2
│   ├── apply-migration.js      # Apply Supabase migrations
│   ├── sync-printful-inventory.ts  # Sync product inventory from Printful
│   ├── setup-printful-webhooks.js  # Configure Printful webhooks (JS)
│   ├── setup-printful-webhooks.ts  # Configure Printful webhooks (TS)
│   ├── test-printful-auth.js   # Debug Printful authentication
│   ├── test-printful-oauth.js  # OAuth token testing
│   ├── test-printful-oauth-2.js # OAuth v2 testing
│   ├── test-printful-token.js  # Token validation
│   ├── deploy-vercel.ps1       # Vercel deployment (PowerShell)
│   ├── fix-domains.ps1         # Domain configuration (PowerShell)
│   ├── sync-env.ps1            # Sync environment variables (PowerShell)
│   └── replace-trademark.ts    # Find/replace trademark symbols
├── supabase/                   # Supabase migrations + edge functions
│   └── migrations/             # 15 sequential SQL migration files:
│       ├── 20260304090000_init_schema.sql
│       ├── 20260304090100_init_rls.sql
│       ├── 20260304090200_init_admin_role_helpers.sql
│       ├── 20260304150000_update_orders_with_shipping.sql
│       ├── 20260304160000_fix_orders_for_webhooks.sql
│       ├── 20260305163000_storage_policies.sql
│       ├── 20260305170000_page_content_schema.sql
│       ├── 20260305180000_fix_is_admin_security.sql
│       ├── 20260305181000_fix_more_functions_security.sql
│       ├── 20260305182000_fix_rls_policies.sql
│       ├── 20260305193000_update_beaute_category.sql
│       ├── 20260305200000_update_homepage_welcome.sql
│       ├── 20260305205810_add_product_metafields.sql
│       ├── 20260305210000_update_hats_category.sql
│       └── 20260305220000_add_soft_delete.sql
├── tests/                      # Playwright E2E tests (Chromium only)
│   ├── homepage.spec.ts        # Homepage, navigation, collections
│   ├── products.spec.ts        # Product catalog, filtering, search
│   ├── cart.spec.ts            # Add/remove items, checkout flow
│   ├── auth.spec.ts            # Sign up, login, logout
│   └── admin.spec.ts           # Admin dashboard and CMS (most comprehensive)
├── docs/                       # Supplemental documentation
│   ├── deployment.md           # Vercel + Supabase + GoDaddy DNS setup
│   └── supabase.md             # Supabase workflow and migration guide
├── .github/                    # GitHub Actions CI/CD workflows
│   └── workflows/              # Automated Vercel deployment on push
├── .vscode/                    # IDE settings
├── public/                     # Static assets
├── tailwind.config.ts          # Tailwind theme (brand colors, fonts, animations)
├── next.config.ts              # Next.js config (redirects, remote images, Turbopack)
├── tsconfig.json               # TypeScript config (strict, ES2017, @/ path alias)
├── eslint.config.mjs           # ESLint config (Next.js + TypeScript rules)
├── playwright.config.ts        # Playwright config (Chromium, base URL, retries)
├── vercel.json                 # Vercel deployment config (iad1, 30s timeout)
└── .env.example                # All required environment variables listed here
```

---

## Environment Variables

Copy `.env.example` to `.env.local` for development. Required variables:

```bash
# Site
NEXT_PUBLIC_SITE_URL=https://tsgabrielle.us
NEXT_PUBLIC_LOGO_URL=/images/logo.png

# Supabase
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY        # Server-only — never expose to client

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-02TDH8YYH
NEXT_PUBLIC_GTM_ID=GT-PL3T58PK

# Klaviyo (email marketing)
NEXT_PUBLIC_KLAVIYO_LIST_ID=TYeYRR
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

- Strict mode enforced; target: ES2017 (`tsconfig.json`)
- Use explicit types for function parameters/return values when not inferrable
- Prefer `unknown` over `any`; `@typescript-eslint/no-explicit-any` is disabled in ESLint but use `any` sparingly
- Use **Zod** for runtime validation of external data (API responses, form inputs, Supabase results)
- All shared types are in `@/lib/types.ts`
- `supabase/functions/**/*` is excluded from TypeScript compilation

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

Use absolute imports with `@/` prefix (configured in `tsconfig.json`). The `@/` alias maps to `./` (root of the project).

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
- **Fonts**: `font-sans` → Lato (body text), `font-display` → Space Grotesk (headings)
- **Brand colors** (available in Tailwind theme):
  - `primary`: `#a932bd` (purple) — main brand color
  - `secondary`: `#7f6783`
  - `accent`: `#e7e7e7`
  - `peach`: `#f7bda0`
  - `phoenix`: `#cb5c31`
  - `night`: `#0f1720`
  - `champagne`: `#f8f2e7`
- **Custom animations**: `liquid` (8s infinite), `iridescent` (3s linear), `float` (6s ease)
- **Custom shadow**: `shadow-luxe` — premium aesthetic
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
- Admin routes are protected via `middleware.ts`; verify admin role with `@/lib/admin-auth.ts`
- Security headers set in `middleware.ts` on all responses:
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `X-XSS-Protection: 1; mode=block`
  - `Strict-Transport-Security: max-age=63072000` (2 years)
  - `Permissions-Policy`: denies camera, microphone, geolocation

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
| `orders` | Order records (PayPal + Printful integrated, includes shipping) |
| `order_items` | Line items per order |
| `users` | User profiles linked to Supabase auth |
| `page_content` | CMS dynamic content for editable pages |
| `hero_slides` | Homepage hero images/slides |
| `site_settings` | Global site configuration key-value store |
| `feature_flags` | Feature toggle flags (e.g., `enable_3d_hero`) |

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
- Admin access verified via `is_admin()` Supabase function (hardened against privilege escalation)
- All column/table names are **snake_case**
- Soft delete is supported — check `deleted_at` column where applicable
- Use `@/lib/store.ts` for product queries; `@/lib/content.ts` for CMS content

### Migrations

```bash
# Create a new migration
npx supabase migration new <migration-name>

# Apply migrations to the linked Supabase project
npx supabase db push
```

Migrations live in `supabase/migrations/` as sequentially numbered SQL files (15 total as of last update). Always create a new migration file rather than modifying existing ones.

---

## E-Commerce Data Flow

```
User browses products (Supabase via lib/store.ts)
  → Adds to cart (useCart hook → localStorage: tsgabrielle_cart_v1)
    → Checkout: Create PayPal order (/api/paypal/create-order)
      → PayPal capture (/api/paypal/capture-order)
        → Store order in Supabase (orders + order_items tables)
          → Printful fulfillment (PayPal webhook → /api/printful/sync)
            → Tracking updates (Printful webhook → /api/printful/webhook)
              → Email notification (Resend via /api/admin/send-email)
```

---

## Admin Dashboard

- Routes: `/admin/*` — all protected by middleware checking `app_metadata.role === "admin"`
- Unauthorized access: API routes return 401/403, page routes redirect to homepage
- Role verification: `@/lib/admin-auth.ts` (`requireAdmin()`) + Supabase `is_admin()` function
- Admin emails configured via `ADMIN_EMAILS` env var (comma-separated)
- Key admin routes:
  - `/admin` — Dashboard home with stats
  - `/admin/products` — Product list, `/admin/products/new`, `/admin/products/[id]`
  - `/admin/orders` — Order list, `/admin/orders/[id]`
  - `/admin/collections` — Collection editor
  - `/admin/feature-flags` — Toggle feature flags
- Key admin components:
  - `ContentPagesManager.tsx` — CMS for dynamic page content
  - `SiteSettingsManager.tsx` — Global site settings
  - `ProductForm.tsx` — Product creation and editing
  - Section managers: Analytics, Theme, Orders, Products, Footer, Collections, Categories, Checkout, Email, Notifications

---

## Feature Flags

A lightweight feature flag system toggles features at runtime without deployments:

```typescript
// In a Client Component
import { useFeatureFlag } from "@/hooks/useFeatureFlag";

const is3DHeroEnabled = useFeatureFlag("3d_hero");
```

Flags are fetched from `/api/feature-flags` and stored in the `feature_flags` Supabase table. Currently used to toggle the heavy 3D hero animation (`enable_3d_hero`). Manage flags via `/admin/feature-flags`.

---

## Testing (Playwright)

Tests live in `tests/` with `.spec.ts` extension.

**Config:** `playwright.config.ts`
- Chromium only
- Base URL: `https://tsgabrielle.us` (override with `TEST_URL` env var)
- Screenshots on failure, traces on first retry
- 2 retries in CI, 0 locally
- HTML reporter

**Test files:**
- `homepage.spec.ts` — Homepage, navigation, collections
- `products.spec.ts` — Product catalog, filtering, search
- `cart.spec.ts` — Shopping cart (add/remove items, checkout flow)
- `auth.spec.ts` — Sign up, login, logout
- `admin.spec.ts` — Admin dashboard and CMS (most comprehensive)

**Best practices:**
- Use Playwright locators: `getByRole`, `getByText`, `locator` — avoid XPath
- Clean up test data after tests where applicable
- Use descriptive test names explaining the scenario

---

## Key Architecture Notes

1. **3D Hero**: React Three Fiber + Drei loaded via `dynamic(() => import(...), { ssr: false })`. Uses `useAntigravityParallax` hook for scroll parallax effect. Controlled by `enable_3d_hero` feature flag — disable for performance on low-end devices.

2. **Dynamic Content**: Page content (hero slides, text blocks, site settings) is stored in Supabase (`page_content`, `hero_slides`, `site_settings` tables), fetched in Server Components via `@/lib/content.ts`. All editable via admin CMS without deployments.

3. **External API Integrations**: All external API calls (PayPal, Printful, Klaviyo, Resend) go through wrapper modules in `lib/`. Never call external APIs directly in page or component files.

4. **Image Optimization**: Remote images are served from Supabase Storage (`*.supabase.co`) and Printful CDN (`files.cdn.printful.com`). Both are configured as allowed remote patterns in `next.config.ts`. Always use Next.js `<Image>` component.

5. **Turbopack**: Enabled in `next.config.ts`. Significantly improves dev server startup. Do not disable unless debugging a Turbopack-specific issue.

6. **URL Redirects**: Legacy URL patterns (e.g., `/pride` → `/collections/pride-26`) are redirected permanently in `next.config.ts`. Check there before adding new routes to avoid conflicts.

7. **Cart Persistence**: Cart state managed by `useCart` hook, persisted to `localStorage` under key `tsgabrielle_cart_v1`. `CartItem` shape: `{ variantId, title, qty, priceCents }`.

8. **Rate Limiting**: In-memory sliding window per IP in `@/lib/rate-limit.ts`. Applied to public API routes (PayPal, Printful webhooks, Klaviyo). Note: per-instance in Vercel serverless — consider Vercel WAF for distributed rate limiting.

9. **Navigation Structure**: `@/lib/menu.ts` exports `CATEGORIES`, `COLLECTIONS`, `THE_COLLABS`, and `MENU_GROUPS` used by `Header.tsx` mega menu. Update here when adding new categories or collections.

10. **ESLint Config**: Extends `next/core-web-vitals` and TypeScript configs. Disabled rules: `@typescript-eslint/no-explicit-any`, `@typescript-eslint/no-require-imports`, `react-hooks` mutation rules. Global ignores: `.next`, `build`, `src/components`.

---

## Deployment

- **Platform:** Vercel, project `tsgabrielle-live`, team `tsg3`
- **Region:** `iad1` (Northern Virginia)
- **Max function duration:** 30 seconds (all `/app/api/**/*.ts`)
- **CI/CD:** GitHub Actions in `.github/workflows/` — automatic Vercel deployment on push
- **Supabase project:** `wfwcydmfdtlpupdozdvn`
- **Auth callback:** `https://tsgabrielle.us/auth/callback`

See `docs/deployment.md` for full Vercel + Supabase + GoDaddy DNS setup steps.
See `docs/supabase.md` for Supabase workflow and migration details.
