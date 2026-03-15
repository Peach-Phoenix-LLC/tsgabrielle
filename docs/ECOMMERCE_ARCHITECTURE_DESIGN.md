# tsgabrielle® — Ecommerce Architecture Design
## Dashboard + Visual Builder System

> **Stack:** Next.js 15 · TailwindCSS · Supabase · Vercel · GitHub · PayPal · Printful

---

## Table of Contents

1. [Full Architecture Diagram](#1-full-architecture-diagram)
2. [Database Schema (Supabase)](#2-database-schema-supabase)
3. [Next.js Component Structure](#3-nextjs-component-structure)
4. [Admin Builder UI System](#4-admin-builder-ui-system)
5. [Printful API Integration](#5-printful-api-integration)
6. [PayPal Checkout Flow](#6-paypal-checkout-flow)
7. [GitHub Project Structure](#7-github-project-structure)
8. [Vercel Deployment Setup](#8-vercel-deployment-setup)
9. [Security Best Practices](#9-security-best-practices)
10. [Performance Architecture](#10-performance-architecture)

---

## 1. Full Architecture Diagram

### System Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          VERCEL EDGE NETWORK                                │
│                   (CDN · Image Optimization · HTTPS)                        │
└───────────────────────────────┬─────────────────────────────────────────────┘
                                │
                    ┌───────────▼───────────┐
                    │   NEXT.JS APP ROUTER   │
                    │   (App Directory)      │
                    └───────────┬───────────┘
                                │
          ┌─────────────────────┼─────────────────────┐
          │                     │                     │
   ┌──────▼──────┐      ┌───────▼──────┐     ┌───────▼──────┐
   │   PUBLIC    │      │    ADMIN     │     │   BUILDER    │
   │  STOREFRONT │      │  DASHBOARD   │     │   OVERLAY    │
   │  /[slug]    │      │  /admin/*    │     │  (Floating)  │
   └──────┬──────┘      └───────┬──────┘     └───────┬──────┘
          │                     │                     │
          └──────────┬──────────┘                     │
                     │◄──────────────────────────────┘
                     │
          ┌──────────▼──────────────────────────────────────┐
          │                  SUPABASE                        │
          │  ┌──────────┐ ┌──────────┐ ┌──────────────────┐ │
          │  │   Auth   │ │ Postgres │ │     Storage       │ │
          │  │  (JWT)   │ │  (RLS)   │ │  (Media Library)  │ │
          │  └──────────┘ └──────────┘ └──────────────────┘ │
          └──────────────────────────────────────────────────┘
                     │
          ┌──────────┼──────────────────────────────────────┐
          │          │                                       │
   ┌──────▼──────┐  ┌▼──────────────┐  ┌──────────────────┐│
   │   PAYPAL    │  │   PRINTFUL    │  │    POSTHOG /     ││
   │  CHECKOUT   │  │     API       │  │    ANALYTICS     ││
   └──────┬──────┘  └───────┬───────┘  └──────────────────┘│
          │                 │
          └────────┬────────┘
                   │
          ┌────────▼────────┐
          │  WEBHOOKS        │
          │  /api/paypal/    │
          │  /api/printful/  │
          └─────────────────┘
```

### Three-Mode System

```
┌─────────────────────────────────────────────────────────────────┐
│  REQUEST COMES IN                                               │
│                                                                 │
│  middleware.ts evaluates:                                       │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  path starts with /admin  →  requireAdmin() guard        │  │
│  │  path starts with /account →  requireAuth() guard        │  │
│  │  all other paths          →  public (no DB call)         │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  MODE SELECTION:                                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  PUBLIC MODE                                             │  │
│  │  • Visitor browses /[slug], /collections, /checkout      │  │
│  │  • No builder scripts loaded                             │  │
│  │  • Sections rendered from published_layout JSON          │  │
│  │  • Static/ISR pages via Next.js                         │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  ADMIN DASHBOARD MODE  (/admin)                          │  │
│  │  • role === "admin" required                             │  │
│  │  • Manages data: products, orders, collections           │  │
│  │  • Printful sync, PayPal config, analytics               │  │
│  │  • Navigation, policies, site settings                   │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  ADMIN BUILDER MODE (overlay on frontend)                │  │
│  │  • role === "admin" AND builder_mode cookie === "1"      │  │
│  │  • BuilderGate injects VisualBuilderProvider             │  │
│  │  • Floating toolbar overlays the live storefront         │  │
│  │  • Inline editing, drag-and-drop sections                │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Database Schema (Supabase)

### Core E-commerce Tables

```sql
-- ============================================================
-- USERS & ROLES
-- ============================================================
-- auth.users is managed by Supabase Auth (JWT, OAuth, Magic Link)
-- public.users mirrors auth.users and stores app-level data

CREATE TABLE public.users (
  id           UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email        TEXT NOT NULL UNIQUE,
  display_name TEXT,
  avatar_url   TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
-- Role lives in auth.users.app_metadata.role = 'admin'
-- Checked via: (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'

-- Sync trigger: new auth.users row → public.users row
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.users (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$;

-- ============================================================
-- CATEGORIES
-- ============================================================
CREATE TABLE public.categories (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL UNIQUE,
  slug        TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url   TEXT,
  sort_order  INT  NOT NULL DEFAULT 0,
  active      BOOL NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- COLLECTIONS
-- ============================================================
CREATE TABLE public.collections (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL UNIQUE,
  slug            TEXT NOT NULL UNIQUE,
  description     TEXT,
  hero_image_url  TEXT,
  hero_video_url  TEXT,
  hero_color      TEXT,
  sort_order      INT  NOT NULL DEFAULT 0,
  active          BOOL NOT NULL DEFAULT true,
  seo_title       TEXT,
  seo_description TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- PRODUCTS
-- ============================================================
CREATE TABLE public.products (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug                TEXT NOT NULL UNIQUE,
  title               TEXT NOT NULL,
  description         TEXT NOT NULL DEFAULT '',
  category_id         UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  collection_id       UUID REFERENCES public.collections(id) ON DELETE SET NULL,
  printful_product_id TEXT UNIQUE,
  price_cents         INT  NOT NULL DEFAULT 0,
  currency            TEXT NOT NULL DEFAULT 'USD',
  active              BOOL NOT NULL DEFAULT true,
  deleted_at          TIMESTAMPTZ,
  seo_title           TEXT,
  seo_description     TEXT,
  metafields          JSONB DEFAULT '{}',
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.product_images (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id  UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  url         TEXT NOT NULL,
  alt         TEXT,
  sort_order  INT  NOT NULL DEFAULT 0
);

CREATE TABLE public.product_variants (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id          UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  sku                 TEXT NOT NULL UNIQUE,
  title               TEXT NOT NULL,
  printful_variant_id TEXT UNIQUE,
  stock               INT  NOT NULL DEFAULT 0,
  price_cents         INT  NOT NULL DEFAULT 0,
  currency            TEXT NOT NULL DEFAULT 'USD'
);

-- ============================================================
-- ORDERS
-- ============================================================
CREATE TABLE public.orders (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           UUID REFERENCES public.users(id) ON DELETE SET NULL,
  paypal_order_id   TEXT UNIQUE,
  printful_order_id TEXT UNIQUE,
  status            TEXT NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending','paid','fulfilled','cancelled')),
  currency          TEXT NOT NULL DEFAULT 'USD',
  total_cents       INT  NOT NULL DEFAULT 0,
  customer_email    TEXT,
  shipping_address  JSONB,
  tracking_number   TEXT,
  automation_status TEXT DEFAULT 'pending',
  external_metadata JSONB DEFAULT '{}',
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.order_items (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id           UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_variant_id UUID NOT NULL REFERENCES public.product_variants(id),
  quantity           INT  NOT NULL DEFAULT 1,
  unit_price_cents   INT  NOT NULL
);

-- ============================================================
-- CUSTOMERS (enriched view of users who have ordered)
-- ============================================================
CREATE VIEW public.customers AS
  SELECT
    u.id,
    u.email,
    u.display_name,
    COUNT(DISTINCT o.id)            AS order_count,
    COALESCE(SUM(o.total_cents), 0) AS lifetime_value_cents,
    MAX(o.created_at)               AS last_order_at,
    u.created_at
  FROM public.users u
  LEFT JOIN public.orders o ON o.user_id = u.id AND o.status != 'cancelled'
  GROUP BY u.id, u.email, u.display_name, u.created_at;

-- ============================================================
-- NAVIGATION
-- ============================================================
CREATE TABLE public.navigation_menus (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL UNIQUE,  -- 'header', 'footer'
  items      JSONB NOT NULL DEFAULT '[]',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- POLICIES / PAGES (static content)
-- ============================================================
CREATE TABLE public.page_content (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug       TEXT NOT NULL UNIQUE,  -- 'privacy-policy', 'shipping-policy'
  title      TEXT NOT NULL,
  body       TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- SITE SETTINGS
-- ============================================================
CREATE TABLE public.site_settings (
  key        TEXT PRIMARY KEY,
  value      JSONB,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- FEATURE FLAGS
-- ============================================================
CREATE TABLE public.feature_flags (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key            TEXT NOT NULL UNIQUE,
  enable_3d_hero BOOLEAN NOT NULL DEFAULT true,
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

### Visual Builder Tables

```sql
-- ============================================================
-- BUILDER PAGES — stores page layouts with draft/publish
-- ============================================================
CREATE TABLE public.builder_pages (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path             TEXT UNIQUE NOT NULL,  -- '/', '/peach', '/collections/pride'
  title            TEXT NOT NULL DEFAULT '',
  seo_title        TEXT,
  seo_description  TEXT,
  status           TEXT NOT NULL DEFAULT 'DRAFT'
                   CHECK (status IN ('DRAFT','PUBLISHED')),
  published_layout JSONB,  -- snapshot of last published sections array
  draft_layout     JSONB,  -- working copy being edited
  version          INT  NOT NULL DEFAULT 0,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at     TIMESTAMPTZ
);

-- Layout JSON shape:
-- {
--   "page": "/",
--   "sections": [
--     { "id": "sec_abc", "type": "hero",         "props": {...}, "visible": true },
--     { "id": "sec_def", "type": "product-grid", "props": {...}, "visible": true }
--   ]
-- }

-- ============================================================
-- BUILDER SECTIONS — normalized rows for querying/filtering
-- ============================================================
CREATE TABLE public.builder_sections (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id      UUID NOT NULL REFERENCES public.builder_pages(id) ON DELETE CASCADE,
  section_type TEXT NOT NULL,
  props        JSONB NOT NULL DEFAULT '{}',
  sort_order   INT  NOT NULL DEFAULT 0,
  is_visible   BOOL NOT NULL DEFAULT true,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- VERSION HISTORY — snapshot on every publish
-- ============================================================
CREATE TABLE public.builder_section_versions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id         UUID NOT NULL REFERENCES public.builder_pages(id) ON DELETE CASCADE,
  version         INT  NOT NULL,
  layout_snapshot JSONB NOT NULL,
  published_by    UUID REFERENCES public.users(id),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- THEME SETTINGS — global design tokens (singleton row id=1)
-- ============================================================
CREATE TABLE public.theme_settings (
  id         INT  PRIMARY KEY DEFAULT 1,
  colors     JSONB,
  typography JSONB,
  layout     JSONB,
  shadows    JSONB,
  custom_css TEXT,
  is_draft   BOOL NOT NULL DEFAULT false,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Default brand theme (tsgabrielle® brand colors):
INSERT INTO public.theme_settings (id, colors, typography, layout, shadows)
VALUES (1,
  '{"primary":"#a932bd","secondary":"#7f6783","accent":"#cb5c31",
    "background":"#ffffff","text":"#0f1720","muted":"#f8f2e7"}',
  '{"fontFamily":"Lato","headingFont":"Space Grotesk",
    "headingSizes":{"h1":"3rem","h2":"2.25rem","h3":"1.5rem","h4":"1.25rem"},
    "bodySize":"1rem","lineHeight":"1.6"}',
  '{"containerWidth":"1280px","sectionPadding":"4rem 0",
    "spacing":"1.5rem","borderRadius":"0.5rem"}',
  '{"card":"0 4px 12px rgba(0,0,0,0.08)","button":"0 2px 8px rgba(169,50,189,0.2)"}'
) ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- MEDIA LIBRARY
-- ============================================================
CREATE TABLE public.media_library (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename    TEXT NOT NULL,
  url         TEXT NOT NULL,      -- Supabase Storage public URL
  alt_text    TEXT,
  mime_type   TEXT NOT NULL,
  file_size   INT  NOT NULL DEFAULT 0,
  width       INT,
  height      INT,
  folder      TEXT NOT NULL DEFAULT 'general',
  tags        TEXT[] NOT NULL DEFAULT '{}',
  uploaded_by UUID REFERENCES public.users(id),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- SECTION TEMPLATES — reusable presets for the builder
-- ============================================================
CREATE TABLE public.section_templates (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  section_type  TEXT NOT NULL,
  preview_image TEXT,
  default_props JSONB NOT NULL DEFAULT '{}',
  category      TEXT NOT NULL DEFAULT 'content',
  is_global     BOOL NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

### Row Level Security

```sql
-- is_admin() helper (reads from JWT — no extra DB query)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN LANGUAGE sql STABLE SET search_path = public AS $$
  SELECT COALESCE((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false);
$$;

-- Pattern: public read, admin write
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "products_public_read" ON public.products
  FOR SELECT USING (active = true AND deleted_at IS NULL);
CREATE POLICY "products_admin_write" ON public.products
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "orders_own_read"  ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "orders_admin_all" ON public.orders FOR ALL    USING (public.is_admin());

ALTER TABLE public.builder_pages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "builder_pages_public_read"  ON public.builder_pages FOR SELECT USING (true);
CREATE POLICY "builder_pages_admin_write"  ON public.builder_pages FOR ALL    USING (public.is_admin());

ALTER TABLE public.media_library ENABLE ROW LEVEL SECURITY;
CREATE POLICY "media_admin_all" ON public.media_library FOR ALL USING (public.is_admin());
```

### Supabase Storage Buckets

```
media/          → public bucket (product images, page assets)
  └── products/
  └── collections/
  └── pages/
  └── general/

private/        → private bucket (admin uploads, exports)
```

---

## 3. Next.js Component Structure

```
tsgabrielle/
├── app/                              ← Next.js App Router
│   ├── layout.tsx                    ← Root layout (fonts, providers, analytics)
│   ├── globals.css
│   ├── [slug]/page.tsx               ← Dynamic product/collection/page route
│   ├── checkout/
│   │   ├── page.tsx                  ← Cart + PayPal button
│   │   ├── success/page.tsx          ← Order confirmation
│   │   └── cancel/page.tsx
│   ├── account/
│   │   ├── page.tsx                  ← Order history, profile
│   │   └── orders/[id]/page.tsx
│   ├── auth/
│   │   ├── sign-in/page.tsx
│   │   └── callback/route.ts         ← Supabase OAuth callback
│   │
│   ├── admin/                        ← ADMIN DASHBOARD (protected)
│   │   ├── layout.tsx                ← Admin shell (sidebar, header)
│   │   ├── page.tsx                  ← Dashboard overview + analytics
│   │   ├── products/
│   │   │   ├── page.tsx              ← Products list
│   │   │   └── [id]/page.tsx         ← Product edit form
│   │   ├── collections/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── orders/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── customers/page.tsx
│   │   ├── analytics/page.tsx
│   │   ├── settings/
│   │   │   ├── page.tsx              ← Site settings
│   │   │   ├── navigation/page.tsx   ← Menu builder
│   │   │   ├── policies/page.tsx     ← Privacy/shipping/returns
│   │   │   ├── paypal/page.tsx       ← PayPal configuration
│   │   │   └── printful/page.tsx     ← Printful sync & config
│   │   └── feature-flags/page.tsx
│   │
│   └── api/                          ← API Routes (serverless functions)
│       ├── paypal/
│       │   ├── create-order/route.ts ← POST: create PayPal order
│       │   ├── capture-order/route.ts← POST: capture payment + Printful order
│       │   └── webhook/route.ts      ← POST: PayPal webhook handler
│       ├── printful/
│       │   ├── sync/route.ts         ← POST: sync products from Printful
│       │   └── webhook/route.ts      ← POST: shipping/tracking updates
│       └── admin/
│           ├── builder/
│           │   ├── pages/route.ts    ← GET/POST page layouts
│           │   ├── publish/route.ts  ← POST: publish draft + revalidatePath
│           │   └── versions/route.ts ← GET: version history
│           ├── builder-mode/route.ts ← POST: toggle builder_mode cookie
│           ├── builder-status/route.ts← GET: is builder enabled?
│           ├── products/route.ts
│           ├── collections/route.ts
│           ├── orders/route.ts
│           ├── settings/route.ts
│           ├── hero-slides/route.ts
│           ├── media/route.ts        ← POST: upload to Supabase Storage
│           └── theme/route.ts        ← GET/POST theme settings
│
├── components/
│   ├── admin/                        ← DASHBOARD components
│   │   ├── ProductForm.tsx
│   │   ├── RichTextEditor.tsx
│   │   ├── ClaudeTextEditor.tsx
│   │   ├── ContentPagesManager.tsx
│   │   ├── SiteSettingsManager.tsx
│   │   └── LiveMap.tsx
│   │
│   ├── builder/                      ← VISUAL BUILDER components
│   │   ├── BuilderGate.tsx           ← Entry: shows Edit button or injects Builder
│   │   ├── VisualBuilderProvider.tsx ← Context: edit state, undo/redo, pending changes
│   │   ├── VisualBuilderToolbar.tsx  ← Floating toolbar UI (all 8 tools)
│   │   ├── EditableText.tsx          ← Inline text editing wrapper
│   │   ├── EditableImage.tsx         ← Image replacement + media library
│   │   ├── VisualEditable.tsx        ← Generic editable wrapper
│   │   ├── SectionWrapper.tsx        ← Drag handle + visibility toggle per section
│   │   ├── SectionRenderer.tsx       ← Renders a single section by type
│   │   ├── DynamicSectionRenderer.tsx← Dynamic import of section components
│   │   ├── PageLayoutRenderer.tsx    ← Iterates sections[] and renders each
│   │   ├── BuilderText.tsx           ← Text with inline edit overlay
│   │   ├── PeachChat.tsx             ← AI assistant in builder
│   │   ├── panels/
│   │   │   ├── AddSectionPanel.tsx   ← Section library (all block types)
│   │   │   ├── PageStructurePanel.tsx← Tree view, drag-to-reorder
│   │   │   ├── DesignSettingsPanel.tsx← Colors, typography, layout
│   │   │   ├── MediaManagerPanel.tsx ← Media library, upload, crop
│   │   │   └── ResponsivePreviewPanel.tsx
│   │   └── sections/                 ← Modular section components
│   │       ├── HeroSection.tsx
│   │       ├── ProductGridSection.tsx
│   │       ├── CollectionGridSection.tsx
│   │       ├── ImageTextSection.tsx
│   │       ├── TextBlockSection.tsx
│   │       ├── SliderSection.tsx
│   │       ├── BannerSection.tsx
│   │       ├── AnnouncementSection.tsx
│   │       ├── VideoSection.tsx
│   │       ├── NewsletterSection.tsx
│   │       └── CustomHtmlSection.tsx
│   │
│   ├── collection/                   ← Collection page components
│   ├── hero/                         ← Hero variants (3D, video, image)
│   ├── layout/                       ← Header, footer, navigation
│   ├── product/                      ← Product card, gallery, variant selector
│   ├── providers/                    ← React context providers
│   └── templates/                    ← Page templates
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts                 ← Browser Supabase client
│   │   └── server.ts                 ← Server-side Supabase client
│   ├── admin-status.ts               ← getAdminStatus() server helper
│   ├── builder-mode.ts               ← getBuilderModeStatus() server helper
│   ├── builder-types.ts              ← BuilderSection, BuilderPageLayout types
│   ├── section-registry.ts           ← Maps section type → component + metadata
│   ├── paypal.ts                     ← paypalFetch() with OAuth token caching
│   ├── printful.ts                   ← printfulFetch() wrapper
│   ├── rate-limit.ts                 ← In-memory rate limiter
│   ├── monitor.ts                    ← Structured event logging
│   ├── brand.ts                      ← Brand design tokens (source of truth)
│   └── posthog-server.ts             ← Server-side analytics
│
├── middleware.ts                     ← Auth guards + security headers
├── supabase/
│   ├── config.toml
│   └── migrations/                   ← Timestamped SQL migrations
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
├── vercel.json
├── next.config.ts
└── tailwind.config.ts
```

---

## 4. Admin Builder UI System

### Builder Activation Flow

```
Admin visits any frontend page (e.g. /)
  │
  ├─ layout.tsx calls getBuilderModeStatus()
  │    ├─ getAdminStatus() → checks JWT app_metadata.role
  │    └─ reads builder_mode cookie ("1" = active)
  │
  ├─ If isAdmin && builderEnabled:
  │    └─ <BuilderGate initialEnabled={true}>
  │         └─ Injects <VisualBuilderProvider>
  │              └─ Wraps page content
  │              └─ Renders <VisualBuilderToolbar> floating overlay
  │
  └─ If isAdmin && !builderEnabled:
       └─ <BuilderGate initialEnabled={false}>
            └─ Shows floating "Edit Page" button (bottom-right)
            └─ Click → POST /api/admin/builder-mode { enabled: true }
            └─ Sets builder_mode=1 cookie → page reloads in builder mode
```

### Builder State (VisualBuilderProvider)

```typescript
interface BuilderState {
  isEditMode: boolean;
  pendingChanges: Record<string, any>;  // fieldKey → new value
  history: BuilderPageLayout[];         // undo stack
  future: BuilderPageLayout[];          // redo stack
  isSaving: boolean;
  isDirty: boolean;

  // Actions
  setIsEditMode: (v: boolean) => void;
  updateContent: (key: string, value: any) => void;
  saveChanges: () => Promise<void>;     // POST /api/admin/builder
  publishPage: () => Promise<void>;     // promotes draft → published
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  exitBuilder: () => void;             // disables builder_mode cookie
}
```

### Floating Toolbar Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│  VISUAL BUILDER TOOLBAR (position: fixed, top, full-width strip)    │
│                                                                     │
│  [Edit] [Add Section] [Design] [Media] [Structure] [SEO]           │
│  [↩ Undo] [↪ Redo] [📱 Mobile] [💻 Desktop] [Save Draft] [Publish] │
│                                                                     │
│  Right side: [Exit Builder ×]                                       │
└─────────────────────────────────────────────────────────────────────┘
```

| Button | Panel Opened | Action |
|---|---|---|
| Add Section | AddSectionPanel | Choose from 11 section types |
| Design | DesignSettingsPanel | Colors, typography, spacing |
| Media | MediaManagerPanel | Upload, browse, crop images |
| Structure | PageStructurePanel | Drag-reorder, hide, delete sections |
| Undo / Redo | — | Restore previous layout state |
| Responsive | ResponsivePreviewPanel | Preview at mobile/tablet/desktop |
| Save Draft | — | POST /api/admin/builder/pages (status=DRAFT) |
| Publish | — | POST /api/admin/builder/publish + revalidatePath |
| Exit Builder | — | POST /api/admin/builder-mode {enabled: false} |

### Section Registry

```typescript
// lib/section-registry.ts
export interface SectionDefinition {
  type: string;           // 'hero', 'product-grid', etc.
  label: string;          // Display name in Add Section panel
  icon: string;           // Lucide icon name
  category: 'content' | 'products' | 'media' | 'advanced';
  defaultProps: Record<string, any>;
  component: () => Promise<{ default: React.ComponentType<any> }>;
}

export const SECTION_REGISTRY: SectionDefinition[] = [
  { type: 'hero',             label: 'Hero Section',        icon: 'Sparkles',    category: 'content'  },
  { type: 'image-text',       label: 'Image + Text',        icon: 'LayoutGrid',  category: 'content'  },
  { type: 'text-block',       label: 'Text Block',          icon: 'Type',        category: 'content'  },
  { type: 'product-grid',     label: 'Product Grid',        icon: 'ShoppingBag', category: 'products' },
  { type: 'collection-grid',  label: 'Collection Grid',     icon: 'Grid3x3',     category: 'products' },
  { type: 'slider',           label: 'Slider / Carousel',   icon: 'SlidersHorizontal', category: 'media' },
  { type: 'banner',           label: 'Banner',              icon: 'Megaphone',   category: 'content'  },
  { type: 'announcement',     label: 'Announcement Bar',    icon: 'Bell',        category: 'content'  },
  { type: 'video',            label: 'Video Section',       icon: 'Play',        category: 'media'    },
  { type: 'newsletter',       label: 'Newsletter Signup',   icon: 'Mail',        category: 'content'  },
  { type: 'custom-html',      label: 'Custom HTML',         icon: 'Code2',       category: 'advanced' },
];
```

### Inline Editing Pattern

```tsx
// EditableText.tsx — wraps any text element
// In builder mode: contentEditable div with blur-to-save
// In public mode: renders plain element (zero overhead)

export function EditableText({ fieldKey, value, tag: Tag = 'p', className }) {
  const { isEditMode, updateContent } = useVisualBuilder();
  if (!isEditMode) return <Tag className={className}>{value}</Tag>;
  return (
    <Tag
      contentEditable
      suppressContentEditableWarning
      className={cn(className, 'outline-dashed outline-2 outline-purple-400/50 cursor-text')}
      onBlur={(e) => updateContent(fieldKey, e.currentTarget.textContent ?? '')}
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
}
```

### Page Layout JSON Schema

```json
{
  "page": "/",
  "title": "Home",
  "sections": [
    {
      "id": "sec_hero_01",
      "type": "hero",
      "visible": true,
      "props": {
        "heading": "The French Trans Touch™",
        "subheading": "Wear your identity. Proudly.",
        "backgroundImage": "https://xxx.supabase.co/storage/v1/object/public/media/pages/hero.jpg",
        "ctaLabel": "Shop Now",
        "ctaHref": "/peach",
        "overlayOpacity": 0.4
      }
    },
    {
      "id": "sec_featured_01",
      "type": "product-grid",
      "visible": true,
      "props": {
        "heading": "Featured Products",
        "collectionSlug": "peach-phoenix",
        "columns": 4,
        "limit": 8
      }
    },
    {
      "id": "sec_collections_01",
      "type": "collection-grid",
      "visible": true,
      "props": {
        "heading": "Shop Collections",
        "collectionSlugs": ["pride-26", "peach-phoenix", "paris"],
        "layout": "3-column"
      }
    }
  ]
}
```

### Advanced Builder Features

| Feature | Implementation |
|---|---|
| Undo / Redo | History stack in VisualBuilderProvider context |
| Version History | `builder_section_versions` table, GET /api/admin/builder/versions |
| Draft vs Publish | `draft_layout` vs `published_layout` columns in `builder_pages` |
| Reusable Sections | `section_templates` table, loaded in AddSectionPanel |
| Theme Presets | `theme_settings` table with JSONB design tokens |
| Responsive Preview | viewport state in toolbar, CSS class applied to preview wrapper |

---

## 5. Printful API Integration

### Integration Architecture

```
Admin Dashboard                  Next.js API             Printful API
──────────────────               ────────────            ────────────
/admin/settings/printful
  │
  ├─ [Sync Products] ──────────► POST /api/admin/printful/sync
  │                                     │
  │                                     ├─ GET /v2/sync/products (Printful)
  │                                     ├─ GET /v2/sync/products/{id}/variants
  │                                     ├─ Upsert public.products
  │                                     ├─ Upsert public.product_variants
  │                                     └─ Cache thumbnail → product_images

Customer Checkout
  │
  ├─ Capture PayPal ───────────► POST /api/paypal/capture-order
  │                                     │
  │                                     ├─ POST /orders (Printful)
  │                                     │    ├─ recipient: shipping from PayPal
  │                                     │    ├─ items: [{variant_id, quantity}]
  │                                     │    └─ confirm: true
  │                                     └─ Store printful_order_id in Supabase

Printful ships order ────────────► POST /api/printful/webhook
                                        │
                                        ├─ Verify PRINTFUL_WEBHOOK_SECRET header
                                        ├─ event: package_shipped
                                        ├─ Update tracking_number in Supabase
                                        └─ Update order status → 'fulfilled'
```

### lib/printful.ts

```typescript
const PRINTFUL_BASE = 'https://api.printful.com';

export async function printfulFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${PRINTFUL_BASE}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Printful ${path} failed: ${res.status} ${err}`);
  }
  return res.json() as Promise<T>;
}
```

### Product Sync Logic

```typescript
// POST /api/admin/printful/sync
export async function POST() {
  const { error } = await requireAdmin();
  if (error) return error;

  const { result: printfulProducts } = await printfulFetch<any>(
    '/v2/sync/products?limit=100'
  );

  const supabase = getSupabaseServerClient();

  for (const pf of printfulProducts) {
    const { result: pfProduct } = await printfulFetch<any>(
      `/v2/sync/products/${pf.id}`
    );
    const { sync_variants } = pfProduct;

    // Upsert product
    const { data: product } = await supabase
      .from('products')
      .upsert({
        slug: slugify(pf.name),
        title: pf.name,
        printful_product_id: String(pf.id),
        price_cents: Math.min(
          ...sync_variants.map((v: any) => Math.round(v.retail_price * 100))
        ),
        active: true,
      }, { onConflict: 'printful_product_id' })
      .select('id').single();

    // Upsert variants
    for (const v of sync_variants) {
      await supabase.from('product_variants').upsert({
        product_id: product!.id,
        sku: v.sku,
        title: v.name,
        printful_variant_id: String(v.variant_id),
        price_cents: Math.round(v.retail_price * 100),
      }, { onConflict: 'printful_variant_id' });
    }

    // Upsert thumbnail
    if (pf.thumbnail_url) {
      await supabase.from('product_images').upsert({
        product_id: product!.id,
        url: pf.thumbnail_url,
        sort_order: 0,
      }, { onConflict: 'product_id,sort_order' });
    }
  }

  return NextResponse.json({ synced: printfulProducts.length });
}
```

### Printful Order Creation (inside capture-order)

```typescript
const printfulOrder = await printfulFetch<any>('/orders', {
  method: 'POST',
  body: JSON.stringify({
    external_id: supabaseOrderId,
    recipient: {
      name:         shippingAddress.name,
      address1:     shippingAddress.address1,
      address2:     shippingAddress.address2 ?? '',
      city:         shippingAddress.city,
      state_code:   shippingAddress.state_code,
      zip:          shippingAddress.zip,
      country_code: shippingAddress.country_code,
      email:        payerEmail,
    },
    items: orderItems.map(item => ({
      variant_id: item.product_variants.printful_variant_id,
      quantity:   item.quantity,
    })),
    confirm: true,  // auto-confirm → start production immediately
  }),
});
```

### Printful Webhook Handler

```typescript
// POST /api/printful/webhook
export async function POST(request: Request) {
  const rawBody = await request.text();
  const event = JSON.parse(rawBody);

  const secret = request.headers.get('x-printful-webhook-secret');
  if (secret !== process.env.PRINTFUL_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getSupabaseServerClient();

  if (event.type === 'package_shipped') {
    const { order } = event.data;
    await supabase
      .from('orders')
      .update({
        status: 'fulfilled',
        tracking_number: order.shipments?.[0]?.tracking,
        updated_at: new Date().toISOString(),
      })
      .eq('printful_order_id', String(order.id));
  }

  return NextResponse.json({ received: true });
}
```

---

## 6. PayPal Checkout Flow

### Complete Flow Diagram

```
CUSTOMER                NEXT.JS                    PAYPAL              SUPABASE
────────────            ─────────────              ───────             ────────
[Add to Cart]
  │
[Go to Checkout]
  │
[Click PayPal] ───────► POST /api/paypal/create-order
                              │
                              ├─ Rate limit (10/min per IP)
                              ├─ Fetch variant prices from Supabase
                              ├─ Calculate total
                              ├─ POST /v2/checkout/orders ──────────► PayPal
                              │                                           │
                              │◄──────────────────────── { id, approve_url }
                              ├─ Insert order (pending) ───────────► Supabase
                              └─ Return { id, approveUrl }
                                   │
[Redirect to PayPal] ◄────────────┘
  │
[Approve payment]
  │
[→ /checkout/success?token=ID]
  │
[success page] ──────► POST /api/paypal/capture-order
                              │
                              ├─ POST /v2/checkout/orders/{id}/capture ─► PayPal
                              │◄─────────────────────────── { COMPLETED }
                              ├─ Fetch order + items from Supabase
                              ├─ Extract shipping from PayPal response
                              ├─ POST /orders ──────────────────────────► Printful
                              ├─ Update order (paid) ───────────────────► Supabase
                              ├─ Track event ───────────────────────────► PostHog
                              └─ Return { ok: true, printfulOrderId }
                                   │
[Order confirmed UI] ◄────────────┘

PAYPAL WEBHOOK (async)
PayPal ─────────────────► POST /api/paypal/webhook
                              │
                              ├─ Verify PayPal signature headers
                              ├─ PAYMENT.CAPTURE.COMPLETED event
                              └─ Update/confirm order in Supabase
```

### lib/paypal.ts (OAuth Token Cache)

```typescript
let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) return cachedToken.value;

  const credentials = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString('base64');

  const res = await fetch(`${process.env.PAYPAL_BASE_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const data = await res.json();
  cachedToken = {
    value: data.access_token,
    expiresAt: Date.now() + (data.expires_in - 60) * 1000,
  };
  return cachedToken.value;
}

export async function paypalFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = await getAccessToken();
  const res = await fetch(`${process.env.PAYPAL_BASE_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`PayPal ${path} failed: ${res.status} ${err}`);
  }
  return res.json() as Promise<T>;
}
```

### Environment Variables (PayPal)

```bash
NEXT_PUBLIC_PAYPAL_CLIENT_ID=AY...           # Used in browser PayPal SDK
PAYPAL_CLIENT_SECRET=EK...                   # Server-only
PAYPAL_BASE_URL=https://api-m.paypal.com     # Production
# PAYPAL_BASE_URL=https://api-m.sandbox.paypal.com  # Sandbox for testing
PAYPAL_WEBHOOK_ID=WH-...                     # Webhook signature verification
```

---

## 7. GitHub Project Structure

### Repository Layout

```
tsgabrielle/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml               ← Lint + typecheck + build on every PR
│   │   └── deploy.yml           ← Vercel preview on PR, production on merge
│   ├── CODEOWNERS               ← Require review for sensitive dirs
│   └── pull_request_template.md
├── .env.example                 ← All required env vars (no secrets)
├── supabase/
│   ├── config.toml
│   └── migrations/              ← Timestamped SQL (never edit existing ones)
└── docs/
    ├── ARCHITECTURE.md
    ├── ECOMMERCE_ARCHITECTURE_DESIGN.md  ← This file
    └── SECURITY.md
```

### Branch Strategy

```
main            ← Production (protected, Vercel auto-deploys)
  │
  ├─ develop    ← Integration (Vercel preview)
  │    │
  │    ├─ feature/product-recommendations
  │    ├─ feature/builder-templates
  │    ├─ fix/checkout-shipping-validation
  │    └─ claude/[task-name]-[session-id]   ← AI agent branches
  │
  └─ hotfix/*   ← Emergency patches
```

### Branch Protection (main)

```
✓ Require PR review before merging (1 approval minimum)
✓ Require status checks: ci/lint, ci/typecheck, ci/build
✓ Restrict direct pushes
✓ No bypass allowed
```

### CI Pipeline (.github/workflows/ci.yml)

```yaml
name: CI
on:
  pull_request:
    branches: [main, develop]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm run lint

  typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm run typecheck

  build:
    runs-on: ubuntu-latest
    env:
      NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
      NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm run build
```

### Deployment Pipeline

```
Developer → git push feature/xxx
  │
  └─ GitHub PR opened
       │
       ├─ CI: lint + typecheck + build
       ├─ Vercel: preview deployment created
       └─ Preview URL posted to PR comments

PR merged to main
  │
  └─ Vercel: automatic production deployment
       └─ DB migrations: npm run db:push (manual, run before/after deploy)
```

---

## 8. Vercel Deployment Setup

### vercel.json

```json
{
  "framework": "nextjs",
  "regions": ["iad1"],
  "headers": [
    {
      "source": "/api/:path*",
      "headers": [{ "key": "Cache-Control", "value": "no-store" }]
    },
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options",        "value": "DENY" },
        { "key": "X-XSS-Protection",       "value": "1; mode=block" },
        { "key": "Referrer-Policy",        "value": "strict-origin-when-cross-origin" }
      ]
    }
  ],
  "crons": [
    {
      "path": "/api/admin/printful/sync",
      "schedule": "0 6 * * *"
    }
  ]
}
```

### Required Environment Variables

```bash
# ── Public (safe to expose to browser) ───────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_SITE_URL=https://www.tsgabrielle.com
NEXT_PUBLIC_PAYPAL_CLIENT_ID=AY...

# ── Server-only (NEVER expose to browser) ────────────────────
SUPABASE_SERVICE_ROLE_KEY=eyJ...
PAYPAL_CLIENT_SECRET=EK...
PAYPAL_BASE_URL=https://api-m.paypal.com
PAYPAL_WEBHOOK_ID=WH-...
PRINTFUL_API_KEY=...
PRINTFUL_WEBHOOK_SECRET=...
ADMIN_EMAILS=contact@tsgabrielle.us
RESEND_API_KEY=re_...
NEXT_PUBLIC_POSTHOG_KEY=phc_...
POSTHOG_API_KEY=...
```

### Next.js Optimization Config

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: 'files.cdn.printful.com' },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
  },
  compress: true,
  poweredByHeader: false,
};
```

### Serverless Function Timeouts

```
Route                              Max Duration
────────────────────────────────────────────────
GET  /api/admin/products           10s
POST /api/paypal/create-order      10s
POST /api/paypal/capture-order     30s  (PayPal + Printful)
POST /api/paypal/webhook           10s
POST /api/printful/webhook         10s
POST /api/admin/printful/sync      60s  (bulk sync)
POST /api/admin/media              30s  (file upload)
GET  /api/admin/builder/pages      10s
```

### ISR Revalidation on Publish

```typescript
// POST /api/admin/builder/publish
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { path } = await request.json();

  // Promote draft_layout → published_layout in Supabase
  // ...save to builder_section_versions...

  // Immediately clear Next.js page cache
  revalidatePath(path);

  return NextResponse.json({ published: true });
}
```

---

## 9. Security Best Practices

### Three-Layer Authorization

```
LAYER 1 — Vercel Edge (middleware.ts)
  └─ Validates Supabase session cookie on /admin/* and /account/*
  └─ Returns 401/redirect for unauthenticated requests
  └─ Checks app_metadata.role === "admin" OR email in ADMIN_EMAILS
  └─ Runs at edge — zero cold start, no DB overhead

LAYER 2 — API Route Guards (lib/require-admin.ts)
  └─ Every /api/admin/* route calls requireAdmin()
  └─ Uses anon key (respects RLS), NOT service role key
  └─ Returns 401/403 JSON for API callers

LAYER 3 — Supabase RLS Policies
  └─ is_admin() reads from JWT (no extra DB query)
  └─ public.products: public SELECT, admin ALL
  └─ public.orders: owner SELECT only, admin ALL
  └─ public.builder_pages: public SELECT, admin ALL
  └─ private tables: admin only
```

### Builder Script Isolation

```typescript
// Builder JS loads ONLY for admins — not hidden, not loaded at all
// In layout.tsx (Server Component):
const { isAdmin, builderEnabled } = await getBuilderModeStatus();

return isAdmin ? (
  <BuilderGate initialEnabled={builderEnabled}>
    {children}
  </BuilderGate>
) : (
  children  // ← zero builder code in visitor's bundle
);
```

### Input Sanitization

```typescript
// Custom HTML blocks run through DOMPurify server-side
import DOMPurify from 'isomorphic-dompurify';

const clean = DOMPurify.sanitize(userHtml, {
  ALLOWED_TAGS: ['p','h1','h2','h3','a','ul','ol','li','b','i','strong','em'],
  ALLOWED_ATTR: ['href','target','rel','class'],
});
```

### Rate Limiting

```typescript
// lib/rate-limit.ts — in-memory per-IP sliding window
// Applied to: /api/paypal/create-order (10/min), checkout endpoints
rateLimit(`create-order:${ip}`, { maxRequests: 10, windowMs: 60_000 });
```

### Webhook Signature Verification

```typescript
// PayPal: verify via PayPal's own signature API
await paypalFetch('/v1/notifications/verify-webhook-signature', { ... });
// → verification_status must equal "SUCCESS"

// Printful: verify HMAC secret header
const secret = request.headers.get('x-printful-webhook-secret');
if (secret !== process.env.PRINTFUL_WEBHOOK_SECRET) return 401;
```

### Security Headers

```
Header                           Value
────────────────────────────────────────────────────────────────
X-Frame-Options                  DENY
X-Content-Type-Options           nosniff
Referrer-Policy                  strict-origin-when-cross-origin
X-XSS-Protection                 1; mode=block
Strict-Transport-Security        max-age=63072000; includeSubDomains; preload
Permissions-Policy               camera=(), microphone=(), geolocation=()
```

### Secrets Management

```
✓ All secrets stored in Vercel Environment Variables
✓ .env.example documents keys (no real values)
✓ .gitignore excludes .env, .env.local, .env.*.local
✓ SUPABASE_SERVICE_ROLE_KEY: server-side only
✓ NEXT_PUBLIC_* vars: intentionally public (anon key, site URL)
✗ Never: hardcoded credentials, service role in client components
```

### Content Security Policy (recommended)

```typescript
// Add to addSecurityHeaders() in middleware.ts
response.headers.set('Content-Security-Policy', [
  "default-src 'self'",
  "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.paypal.com https://www.sandbox.paypal.com",
  "frame-src https://www.paypal.com https://www.sandbox.paypal.com",
  "img-src 'self' data: blob: https://*.supabase.co https://files.cdn.printful.com",
  "connect-src 'self' https://*.supabase.co https://api.paypal.com https://api.printful.com",
].join('; '));
```

---

## 10. Performance Architecture

### Rendering Strategy by Route

```
Route                    Strategy     Revalidate   Notes
─────────────────────────────────────────────────────────────────────
/                        ISR          60s          Revalidates on publish
/[slug] (collection)     ISR          60s          generateStaticParams
/[slug] (product)        ISR          300s         Printful prices change rarely
/checkout/*              Dynamic      —            Cart/payment state
/account/*               Dynamic      —            User-specific
/admin/*                 Dynamic      —            Always fresh
/api/*                   Dynamic      —            Cache-Control: no-store
```

### ISR + Visual Builder Integration

```typescript
// Publish button → POST /api/admin/builder/publish
// Calls revalidatePath(path) → clears Next.js cache for that page
// Public visitors see updated content within milliseconds

// Page data fetch (Server Component):
export async function generateStaticParams() {
  const { data: collections } = await supabase.from('collections').select('slug');
  return (collections ?? []).map(c => ({ slug: c.slug }));
}

export const revalidate = 60; // ISR fallback for non-pre-rendered slugs
```

### Lazy Loading Strategy

```typescript
// Builder components: never bundled for visitors
const VisualBuilderProvider = dynamic(
  () => import('./VisualBuilderProvider').then(m => m.VisualBuilderProvider),
  { ssr: false }
);

// Heavy sections: loaded on demand
const SliderSection   = dynamic(() => import('./sections/SliderSection'));
const VideoSection    = dynamic(() => import('./sections/VideoSection'));
const CustomHtmlSection = dynamic(() => import('./sections/CustomHtmlSection'));

// 3D hero: conditionally loaded via feature flag
const Hero3D = dynamic(() => import('./hero/Hero3D'), { ssr: false });
```

### Image Optimization

```tsx
// Always use next/image for:
// - Automatic WebP/AVIF conversion
// - Responsive srcset
// - Lazy loading
// - Blur placeholder

<Image
  src={product.image_url}
  alt={product.title}
  width={600}
  height={600}
  loading="lazy"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
/>
```

### Database Indexes

```sql
-- Query performance indexes
CREATE INDEX idx_products_collection_id ON public.products(collection_id)
  WHERE active = true AND deleted_at IS NULL;
CREATE INDEX idx_products_category_id ON public.products(category_id)
  WHERE active = true AND deleted_at IS NULL;
CREATE INDEX idx_products_slug         ON public.products(slug);
CREATE INDEX idx_orders_user_id        ON public.orders(user_id);
CREATE INDEX idx_orders_paypal_id      ON public.orders(paypal_order_id);
CREATE INDEX idx_orders_printful_id    ON public.orders(printful_order_id);
CREATE INDEX idx_media_folder          ON public.media_library(folder);
CREATE INDEX idx_builder_sections_page ON public.builder_sections(page_id);
CREATE INDEX idx_builder_versions_page ON public.builder_section_versions(page_id);
```

### Bundle Composition

```
Public storefront:
  ├── Next.js framework          ~40kb gz
  ├── React                      ~45kb gz
  ├── TailwindCSS (tree-shaken)  ~10kb gz
  ├── Framer Motion (if used)    ~15kb gz
  └── Page-specific JS           ~5-20kb gz
  Total: ~115-130kb gz  ← no admin/builder code

Admin dashboard:
  ├── Dashboard components (lazy)
  └── Lucide icons (tree-shaken)

Builder overlay (admin only):
  ├── VisualBuilderProvider
  ├── VisualBuilderToolbar
  ├── Panels (lazy loaded per panel)
  └── Section components (dynamic import)
```

### Core Web Vitals Targets

```
Metric    Target   Strategy
────────────────────────────────────────────────────────────────
LCP       < 2.5s   Hero image preloaded, ISR cache hit, Vercel Edge CDN
FID       < 100ms  No render-blocking scripts, deferred analytics
CLS       < 0.1    All images have explicit width/height, no layout shifts
TTFB      < 200ms  Vercel Edge + ISR warm cache = ~30-80ms typical
```

---

## Appendix: Complete Environment Variables Reference

```bash
# ── Supabase ──────────────────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=             # https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=        # eyJ... (safe to expose)
SUPABASE_SERVICE_ROLE_KEY=            # eyJ... (SERVER ONLY — never expose)

# ── Site ─────────────────────────────────────────────────────
NEXT_PUBLIC_SITE_URL=                 # https://www.tsgabrielle.com

# ── Admin ────────────────────────────────────────────────────
ADMIN_EMAILS=                         # Comma-separated admin emails

# ── PayPal ───────────────────────────────────────────────────
NEXT_PUBLIC_PAYPAL_CLIENT_ID=         # Browser PayPal JS SDK
PAYPAL_CLIENT_SECRET=                 # Server-only
PAYPAL_BASE_URL=                      # https://api-m.paypal.com
PAYPAL_WEBHOOK_ID=                    # Signature verification

# ── Printful ─────────────────────────────────────────────────
PRINTFUL_API_KEY=                     # Server-only
PRINTFUL_WEBHOOK_SECRET=              # Webhook HMAC secret

# ── Email ────────────────────────────────────────────────────
RESEND_API_KEY=                       # Transactional emails

# ── Analytics ────────────────────────────────────────────────
NEXT_PUBLIC_POSTHOG_KEY=              # Browser PostHog
POSTHOG_API_KEY=                      # Server-side PostHog
```

---

*Architecture designed for tsgabrielle® — The French Trans Touch™*
*Stack: Next.js 15 · TailwindCSS · Supabase · Vercel · PayPal · Printful*
*Last updated: March 2026*
