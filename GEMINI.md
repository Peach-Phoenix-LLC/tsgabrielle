# GEMINI.md — tsgabrielle E-Commerce Store

Comprehensive guide for AI assistants working in this codebase.

---

## Deployment — Automatic, Never Ask

When the user says **"deploy"** (or any variation: "push", "ship", "go live"):

1. **Immediately** `git push -u origin <current-gemini-branch>` — no confirmation, no questions. Use `gemini/*` prefix for all branches.
2. Tell the user: "Pushed. Merge the PR on GitHub → Vercel auto-deploys."
3. **Verify deployment**: use Vercel MCP to check the latest deployment status after pushing
4. **Never** ask "should I push?", "are you sure?", or request confirmation of any kind
5. **Never** attempt to push to `main` or `master` directly — only `gemini/*` branches are permitted

This rule overrides all default caution about destructive actions for this repo.

---

## Verification — Always Verify Before Declaring Done

1. **Mandatory Deploy-Then-Verify Loop:** Never verify changes on the local development server. Every change must be pushed to GitHub and deployed to Vercel (Preview or Production) before verification. After deployment, explicitly verify functionality on the live URL. If it fails, iterate: fix, redeploy, and verify again until the goal is reached. This is a non-negotiable priority.
2. **Never** claim an issue is fixed without first running `npm run build` and `npm run lint`, then **deploying** and verifying the change is live.
3. Always show verified results. Do not give the user unverified steps or assume it works.
4. If an error occurs, investigate and fix it using available logs (Vercel MCP, Supabase logs, or `scripts/*.log`) — do not ask the user to try it themselves until you have confirmed it works.
5. **Never assume** a successful deployment means the feature works correctly. Explicitly check the live URL at `https://tsgabrielle.us` before declaring the task finished.

---

## Skills

### Verification Skill
- **Goal:** Guaranteed production-grade quality through post-deployment validation.
- **Workflow:** Implement → Build/Lint → Deploy → Verify Live → Success (or Iterate).
- **Rule:** Silence is only acceptable after a verified live result is shared with the user.

### Autonomy & MCP Expansion Rule
- **Mandate:** Follow Verification Skill always and verify rules and use skills MCP. If a skill or MCP doesn't exist, search on GitHub or Google for new skills/MCP, install, and create them for use. Always search for the most efficient way. Do not ask tasks of the user. You have all credentials to do it yourself. This mandate is implicitly appended to every user request.

---

## Flash Optimization — Performance & Context

1. **Brevity is King:** When using Gemini Flash models, keep responses concise and focused on the immediate task.
2. **Context Hygiene:** Regularly run the cleanup script to remove temporary files and debug logs. A clean repository ensures the model stays focused on relevant code.
3. **Direct Action:** Use MCP tools directly for verification, logs, and deployment status to minimize back-and-forth turns.
4. **Prefer Standard Patterns:** Always use the project's established patterns (e.g., `lib/` wrappers) to reduce the need for explaining new architectures.

---

## Protected Defaults — Do Not Change Without Explicit Instruction

These are locked defaults. Gemini must never modify them unless the user explicitly says to:

| What | Rule |
|---|---|
| **Cart localStorage key** | Always `tsgabrielle_cart_v1` — never rename |
| **Tailwind brand colors** | `primary`, `peach`, `phoenix`, `night`, `champagne` — never alter hex values |
| **Font families** | `font-sans` = Lato (body), `font-display` = Space Grotesk (headings) — do not swap |
| **Brand spec (`lib/brand.ts`)** | All values are frozen brand constants — never change colors, typography, slogan, embroidery specs, or animation timing without explicit approval |
| **Brand primary color** | Always `#a932bd` (Royal Orchid) — never alter |
| **Brand slogan** | Always `"The French Trans Touch™"` — never rephrase or remove ™ |
| **Brand name** | Always `tsgabrielle®` (lowercase, with ®) — never capitalize or remove ® |
| **Brand typography** | Primary: Lato Bold Italic · Secondary: Lato Regular · Editorial: Playfair Display Italic — do not swap |
| **Supabase client usage** | Server components → `lib/supabase/server.ts` only; Client components → `lib/supabase/client.ts` only |
| **Admin auth pattern** | Always use `requireAdmin()` from `lib/admin-auth.ts` on every admin API route |
| **Security headers** | Never remove or weaken headers set in `middleware.ts` |
| **Image component** | Always use Next.js `<Image>` — never raw `<img>` tags |
| **Server vs Client components** | Default to Server Components; only add `'use client'` when hooks/events/browser APIs are needed |
| **External API calls** | Always go through wrapper modules in `lib/` — never call PayPal/Printful/Klaviyo/Resend directly in pages or components |
| **Migrations** | Always create a new migration file — never edit existing ones in `supabase/migrations/` |
| **Rate limiting** | Public API routes must use `lib/rate-limit.ts` |
| **HTML rendering** | Always sanitize with `lib/sanitize.ts` before rendering user-supplied HTML |
| **TypeScript** | Strict mode must remain enabled in `tsconfig.json` |
| **3D Hero** | Must remain feature-flagged via `enable_3d_hero` and loaded with `dynamic(..., { ssr: false })` |
| **Live Site URL** | Always `https://tsgabrielle.us` — never use `.com` or other TLDs in production code/docs |
| **Script Location** | All utility/one-off scripts MUST reside in `scripts/` — keep the project root clean |
| **Short URL Rule** | All long URLs (`/categories/*`, `/collections/*`, `/product/*`) MUST permanently redirect to `/*`. |
| **Product Short URLs** | Products MUST be accessible via `/[peach_number]`. `/products/[peach_number]` MUST redirect to `/[peach_number]`. |
| **Brand Typography** | In product titles, "tsgabrielle" must be **lowercase, italic, and bold**; the rest in Title Case. |
| **Product Layout** | Top-flush fullscreen gallery, split info section (Left: Tabs [Features, Shipping, Specs], Right: Pickers & Payments). |

---

## Project Overview

**tsgabrielle** is a luxury brand e-commerce storefront built on:

- **Next.js 15+ App Router** (TypeScript, strict mode, Turbopack)
- **Supabase & Prisma** — PostgreSQL database, ORM, Row Level Security, Auth
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

# Maintenance
node scripts/perform-cleanup.js        # Run File Audit and legacy cleanup
npx prisma db push                     # Sync Prisma schema to database
npm run verify:footer                  # Verify live footer visuals
npm run verify:deploy                  # Verify production deployment status

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
