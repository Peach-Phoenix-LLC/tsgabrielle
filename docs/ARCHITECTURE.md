# TSGabrielle Ecommerce Architecture
## Admin Dashboard + Visual Website Builder

---

## Architecture Diagram

```
+------------------------------------------------------------------+
|                        VERCEL EDGE NETWORK                        |
|  CDN / Static Assets / Edge Functions / Image Optimization        |
+------------------------------------------------------------------+
           |                    |                    |
           v                    v                    v
+------------------+  +------------------+  +------------------+
|   PUBLIC MODE    |  | ADMIN DASHBOARD  |  | ADMIN BUILDER    |
|   (Storefront)   |  |   (/admin/*)     |  |  (Visual Edit)   |
|                  |  |                  |  |                  |
| - SSG/SSR pages  |  | - Products CRUD  |  | - Floating       |
| - Product pages  |  | - Orders mgmt   |  |   toolbar         |
| - Collections    |  | - Collections   |  | - Inline editing  |
| - Cart/Checkout  |  | - Customers     |  | - Section builder |
| - PayPal pay     |  | - Analytics     |  | - Design settings |
| - Static content |  | - Settings      |  | - Media manager   |
|                  |  | - Printful sync |  | - Page structure  |
|                  |  | - SEO config    |  | - Draft/Publish   |
+------------------+  +------------------+  +------------------+
           |                    |                    |
           +--------------------+--------------------+
                                |
                    +-----------v-----------+
                    |    NEXT.JS APP ROUTER  |
                    |                       |
                    | - API Routes (/api/*) |
                    | - Server Components   |
                    | - Middleware (auth)    |
                    | - Dynamic rendering   |
                    +-----------+-----------+
                                |
              +-----------------+-----------------+
              |                 |                 |
    +---------v-------+ +------v------+ +--------v--------+
    |    SUPABASE     | |   PAYPAL    | |    PRINTFUL     |
    |                 | |             | |                 |
    | - PostgreSQL DB | | - Checkout  | | - Product sync  |
    | - Auth (JWT)    | | - Webhooks  | | - Order forward |
    | - Storage       | | - Capture   | | - Fulfillment   |
    | - Row-Level Sec | | - Refunds   | | - Webhooks      |
    +-----------------+ +-------------+ +-----------------+

```

---

## System Modes

```
+---------------------------------------------------------+
|                    MODE ROUTER                           |
|  middleware.ts determines mode based on:                 |
|  - URL path                                              |
|  - User authentication state                             |
|  - User role (USER vs ADMIN)                             |
|  - builder_mode cookie                                   |
+---------------------------------------------------------+
         |                |                 |
    PUBLIC MODE      ADMIN DASH       BUILDER MODE
    (No auth req)    (role=ADMIN)     (role=ADMIN +
                     (path=/admin)    builder_mode=true)
```

### Mode Activation Rules:
- **PUBLIC**: Default for all visitors
- **ADMIN DASHBOARD**: `user.role === "ADMIN"` AND path starts with `/admin`
- **BUILDER MODE**: `user.role === "ADMIN"` AND `builder_mode` cookie === `"1"`

---

## Database Schema (Supabase / Prisma)

### Core Models

```
profiles (users)
├── id (UUID, PK)
├── full_name
├── email (unique)
├── role (USER | ADMIN)
├── peaches_balance
├── created_at
└── Relations: orders, wishlist, reviews, transactions

products
├── id (autoincrement, PK)
├── peach_number (unique)
├── title, subtitle, tagline
├── brand, short_description, long_description
├── base_sku (unique), base_mpn (unique)
├── product_type, catalogue_category, catalogue_collection
├── status, pricing, SEO fields
├── media_primary_url, media_gallery_urls[]
└── Relations: variants, gallery_slides, order_items, metafields

product_variants
├── id (PK)
├── product_id → products
├── size_label, color, variant_sku, variant_mpn
├── msrp, inventory, image_url
├── printful_variant_id
└── sort_order

orders
├── id (UUID, PK)
├── user_id → profiles
├── total_amount, status
├── paypal_order_id, printful_id
├── shipping fields, tracking fields
└── Relations: items, reviews

categories
├── id (PK)
├── name, slug (unique)
├── hero images, colors, SEO fields
└── is_active, is_featured, sort_order

collections
├── id (PK)
├── name, slug (unique)
├── hero images, colors, badge
├── date range, SEO fields
└── is_active, is_featured, sort_order
```

### Builder Models (NEW)

```
builder_pages
├── id (UUID, PK)
├── path (unique) — e.g. "/", "/about", "/collections/pride"
├── title
├── seo_title, seo_description
├── status (DRAFT | PUBLISHED)
├── published_layout (JSON) — live version
├── draft_layout (JSON) — working draft
├── version (int) — increments on publish
├── created_at, updated_at, published_at
└── Relations: sections, versions

builder_sections
├── id (UUID, PK)
├── page_id → builder_pages
├── section_type — e.g. "hero", "product-grid", "image-text"
├── props (JSON) — section configuration/content
├── sort_order (int) — position on page
├── is_visible (bool)
├── created_at, updated_at

builder_section_versions
├── id (UUID, PK)
├── page_id → builder_pages
├── version (int)
├── layout_snapshot (JSON) — full page layout at this version
├── published_by (UUID)
├── created_at

theme_settings
├── id (int, PK, default=1)
├── colors (JSON) — { primary, secondary, accent, background }
├── typography (JSON) — { fontFamily, headingSizes, bodySize }
├── layout (JSON) — { containerWidth, spacing, padding, borderRadius }
├── shadows (JSON) — { card, button, section }
├── custom_css (text)
├── is_draft (bool)
├── updated_at

media_library
├── id (UUID, PK)
├── filename
├── url — Supabase Storage public URL
├── alt_text
├── mime_type
├── file_size (int)
├── width, height (int)
├── folder (string) — organizational folder
├── tags (string[])
├── uploaded_by (UUID → profiles)
├── created_at

section_templates
├── id (UUID, PK)
├── name — template name
├── section_type — component type
├── preview_image — thumbnail URL
├── default_props (JSON) — default configuration
├── category — e.g. "hero", "content", "commerce"
├── is_global (bool) — available on all pages
├── created_at
```

### Page Layout JSON Schema

```json
{
  "page": "/",
  "title": "Home",
  "sections": [
    {
      "id": "sec_abc123",
      "type": "hero",
      "props": {
        "heading": "Welcome to TSGabrielle",
        "subheading": "Luxury Handcrafted Goods",
        "backgroundImage": "https://...",
        "ctaText": "Shop Now",
        "ctaLink": "/collections"
      },
      "visible": true
    },
    {
      "id": "sec_def456",
      "type": "product-grid",
      "props": {
        "title": "Featured Products",
        "collection": "featured",
        "columns": 4,
        "limit": 8
      },
      "visible": true
    },
    {
      "id": "sec_ghi789",
      "type": "image-text",
      "props": {
        "heading": "Our Story",
        "body": "<p>Founded with passion...</p>",
        "image": "https://...",
        "imagePosition": "right",
        "backgroundColor": "#f8f2e7"
      },
      "visible": true
    }
  ]
}
```

---

## Next.js Component Structure

```
app/
├── (public)/                    # Public storefront routes
│   ├── page.tsx                 # Homepage (renders builder sections)
│   ├── [slug]/page.tsx          # Dynamic short URL resolver
│   ├── categories/[slug]/       # Category pages
│   ├── collections/[slug]/      # Collection pages
│   ├── checkout/                # Checkout flow
│   └── auth/                    # Authentication
│
├── admin/                       # Admin Dashboard (existing)
│   ├── page.tsx                 # Dashboard overview
│   ├── products/                # Product management
│   ├── orders/                  # Order management
│   ├── collections/             # Collection management
│   └── feature-flags/           # Feature toggles
│
├── api/
│   ├── admin/
│   │   ├── builder-mode/        # Toggle builder cookie
│   │   ├── builder-status/      # Check builder state
│   │   ├── page-content/        # Page content CRUD
│   │   ├── builder/
│   │   │   ├── pages/           # Builder page CRUD
│   │   │   ├── sections/        # Section management
│   │   │   ├── publish/         # Publish draft → live
│   │   │   ├── media/           # Media library CRUD
│   │   │   ├── theme/           # Theme settings CRUD
│   │   │   └── templates/       # Section templates
│   │   ├── products/
│   │   ├── orders/
│   │   ├── settings/
│   │   └── printful/
│   ├── paypal/
│   └── printful/
│
├── layout.tsx                   # Root layout with providers
└── middleware.ts                # Auth + mode routing

components/
├── builder/                     # Visual Builder System
│   ├── VisualBuilderProvider.tsx # Builder context + state
│   ├── VisualBuilderToolbar.tsx  # Floating toolbar
│   ├── BuilderGate.tsx          # Admin-only wrapper
│   ├── EditableText.tsx         # Inline text editing
│   ├── EditableImage.tsx        # Inline image editing
│   ├── VisualEditable.tsx       # Generic editable wrapper
│   ├── BuilderText.tsx          # Server component text
│   ├── PeachChat.tsx            # AI assistant
│   ├── SectionRenderer.tsx      # Dynamic section renderer
│   ├── SectionWrapper.tsx       # Section controls overlay
│   ├── AddSectionPanel.tsx      # Section insertion UI
│   ├── PageStructurePanel.tsx   # Page structure tree view
│   ├── DesignSettingsPanel.tsx  # Global design controls
│   ├── MediaManagerPanel.tsx    # Media library browser
│   ├── ResponsivePreview.tsx    # Viewport preview toggle
│   └── sections/               # Section components
│       ├── HeroSection.tsx
│       ├── ImageTextSection.tsx
│       ├── TextBlockSection.tsx
│       ├── ProductGridSection.tsx
│       ├── CollectionGridSection.tsx
│       ├── SliderSection.tsx
│       ├── BannerSection.tsx
│       ├── AnnouncementSection.tsx
│       ├── VideoSection.tsx
│       ├── NewsletterSection.tsx
│       └── CustomHtmlSection.tsx
│
├── admin/                       # Admin Dashboard Components
│   ├── SiteSettingsManager.tsx
│   ├── ContentPagesManager.tsx
│   ├── ProductForm.tsx
│   ├── RichTextEditor.tsx
│   └── ...
│
├── product/                     # Product Components
│   ├── ProductGrid.tsx
│   ├── ProductClientView.tsx
│   ├── AddToCart.tsx
│   └── ...
│
├── collection/                  # Collection Components
├── layout/                      # Layout Components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Navigation.tsx
│
└── ui/                          # Shared UI primitives

hooks/
├── useBuilder.tsx               # Builder state hook
├── useCart.tsx                   # Shopping cart hook
├── usePeaches.tsx               # Loyalty points hook
└── useVisualAutoBuilder.tsx     # Auto-builder hook

lib/
├── supabase/
│   ├── client.ts                # Browser Supabase client
│   └── server.ts                # Server Supabase client
├── paypal.ts                    # PayPal API integration
├── printful.ts                  # Printful API integration
├── admin-auth.ts                # Admin authentication
├── builder-mode.ts              # Builder mode helpers
├── store.ts                     # Product queries
├── seo.ts                       # SEO utilities
├── content.ts                   # Content queries
├── rate-limit.ts                # Rate limiting
├── sanitize.ts                  # HTML sanitization
└── section-registry.ts          # Section component registry
```

---

## Admin Builder UI System

### Builder Activation Flow

```
1. Admin logs in → Sees "Edit Page" button (bottom-right)
2. Clicks "Edit Page" → POST /api/admin/builder-mode (sets cookie)
3. Page reloads → BuilderGate detects builder_mode=1
4. VisualBuilderProvider wraps page content
5. VisualBuilderToolbar appears (floating bottom bar)
6. All EditableText/EditableImage components become interactive
7. SectionWrapper overlays appear on hover over sections
```

### Toolbar Layout

```
┌──────────────────────────────────────────────────────────────────┐
│ [Edit Page] [Add Section] [Design] [Media] [Structure]          │
│ ─── [Undo] [Redo] ─── [Preview] [Responsive] ───               │
│ [Save Draft (3)] [Publish] [Exit Builder]                       │
└──────────────────────────────────────────────────────────────────┘
```

### Panel System

When a toolbar button is clicked, a floating side panel opens:

```
┌─────────────────────────────┐
│ ╔═══════════════════════╗   │
│ ║   ADD SECTION         ║   │
│ ╠═══════════════════════╣   │
│ ║ ┌─────┐ ┌─────┐     ║   │
│ ║ │Hero │ │Image│     ║   │
│ ║ │     │ │+Text│     ║   │
│ ║ └─────┘ └─────┘     ║   │
│ ║ ┌─────┐ ┌─────┐     ║   │
│ ║ │Prod │ │Coll │     ║   │
│ ║ │Grid │ │Grid │     ║   │
│ ║ └─────┘ └─────┘     ║   │
│ ║ ┌─────┐ ┌─────┐     ║   │
│ ║ │Slide│ │Video│     ║   │
│ ║ │     │ │     │     ║   │
│ ║ └─────┘ └─────┘     ║   │
│ ╚═══════════════════════╝   │
│                             │
│  [main page content here]   │
│                             │
└─────────────────────────────┘
```

### Section Hover Controls

```
┌─────────────────────────────────────┐
│ ⬆️ ⬇️  │ Hero Section │ 👁️ 📋 🗑️  │
├─────────────────────────────────────┤
│                                     │
│   [Section Content Renders Here]    │
│   (with inline editing active)      │
│                                     │
└─────────────────────────────────────┘
```

---

## PayPal Checkout Flow

```
1. Customer adds items to cart (localStorage)
2. Customer navigates to /checkout
3. Cart items displayed with totals
4. Customer clicks "Pay with PayPal"
5. Frontend → POST /api/paypal/create-order
   - Server creates PayPal order via API
   - Returns order ID to frontend
6. PayPal SDK opens payment modal
7. Customer approves payment in PayPal
8. Frontend → POST /api/paypal/capture-order
   - Server captures payment
   - Creates Order + OrderItems in Supabase
   - Awards peaches (loyalty points)
   - Forwards order to Printful if applicable
9. Customer redirected to /checkout/success
10. PayPal webhook → /api/paypal/webhook
    - Confirms payment status
    - Updates order if needed
```

---

## Printful Integration Logic

```
PRODUCT SYNC:
1. Admin clicks "Import from Printful" in dashboard
2. POST /api/admin/printful/import
3. Server fetches products from Printful API
4. Maps Printful products → local Product + ProductVariant models
5. Stores printful_variant_id on each variant
6. Daily cron (/api/printful/sync) keeps inventory in sync

ORDER FULFILLMENT:
1. Order paid (PayPal capture confirmed)
2. Server creates Printful order via API
3. Maps local items to Printful variant IDs
4. Stores printful_id on Order record
5. Printful webhook → /api/printful/webhook
   - Updates order status
   - Stores tracking_number, tracking_url, carrier

VARIANT MAPPING:
┌──────────────────┐     ┌──────────────────┐
│ Local Variant    │     │ Printful Variant  │
│ variant_sku      │◄───►│ external_id       │
│ printful_var_id  │     │ variant_id        │
│ msrp             │     │ retail_price      │
│ inventory        │     │ availability      │
└──────────────────┘     └──────────────────┘
```

---

## GitHub Project Structure

```
tsgabrielle/
├── .github/
│   └── workflows/
│       └── ci.yml               # Lint + Type check + Tests
├── app/                         # Next.js App Router
├── components/                  # React components
├── hooks/                       # Custom React hooks
├── lib/                         # Utilities & integrations
├── prisma/
│   └── schema.prisma            # Database schema
├── supabase/
│   ├── migrations/              # SQL migrations
│   └── functions/               # Edge functions
├── public/                      # Static assets
├── config/                      # App configuration
├── scripts/                     # Build/seed scripts
├── docs/                        # Architecture docs
├── tests/                       # E2E tests (Playwright)
├── .env.example                 # Environment template
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── vercel.json
├── package.json
└── CLAUDE.md
```

### Branch Strategy

```
main ─────────────────────────────────────────► (production)
  ├── develop ────────────────────────────────► (staging)
  │     ├── feature/builder-sections ─────────► (feature)
  │     ├── feature/media-manager ────────────► (feature)
  │     ├── fix/checkout-validation ──────────► (bugfix)
  │     └── claude/* ─────────────────────────► (AI agent)
  └── hotfix/* ───────────────────────────────► (emergency)
```

---

## Vercel Deployment Setup

```json
// vercel.json
{
  "framework": "nextjs",
  "regions": ["iad1"],
  "functions": {
    "app/api/**/*.ts": { "maxDuration": 30 }
  },
  "crons": [
    { "path": "/api/printful/sync", "schedule": "0 6 * * *" }
  ]
}
```

### Optimizations:
- **ISR**: Product/collection pages use Incremental Static Regeneration
- **Edge**: Middleware runs at the edge for fast auth checks
- **Image Optimization**: Next.js Image component + Vercel CDN
- **Code Splitting**: Dynamic imports for builder components (admin-only)
- **Static Generation**: Policy pages, about, FAQ pre-rendered at build
- **Serverless Functions**: All API routes run as serverless functions

---

## Security Best Practices

1. **Builder Access Control**: Builder scripts only load when `user.role === "ADMIN"` AND `builder_mode === true`. `BuilderGate` uses dynamic imports to prevent builder code from being included in the public bundle.

2. **Middleware Protection**: All `/admin/*` and `/api/admin/*` routes are protected by middleware that verifies Supabase JWT and admin role.

3. **Input Sanitization**: All user-generated HTML is sanitized with DOMPurify before rendering (`isomorphic-dompurify`).

4. **Row-Level Security**: Supabase RLS policies ensure users can only access their own data.

5. **Rate Limiting**: API endpoints use token-bucket rate limiting (10 req/min on payment endpoints).

6. **CSRF Protection**: Cookie-based auth with `sameSite: "lax"` and proper CORS headers.

7. **Security Headers**: HSTS, X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Referrer-Policy: strict-origin.

8. **Environment Variables**: Secrets stored in Vercel environment variables, never committed to git.

9. **PayPal Webhooks**: Webhook signatures verified before processing.

10. **Printful Webhooks**: HMAC signature validation on all incoming webhooks.
