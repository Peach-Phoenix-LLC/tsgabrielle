# AGENTS.md — tsgabrielle E-Commerce Store

Comprehensive guide for AI assistants working in this codebase.

---

## Deployment — Automatic, Never Ask

When the user says **"deploy"** (or any variation: "push", "ship", "go live"):

1. **Immediately** `git push -u origin <current-agent-branch>` — no confirmation, no questions
2. Tell the user: "Pushed. Merge the PR on GitHub → Vercel auto-deploys."
3. **Verify deployment**: use Vercel MCP to check the latest deployment status after pushing
4. **Never** ask "should I push?", "are you sure?", or request confirmation of any kind
5. **Never** attempt to push to `main` or `master` directly — only `<agent>/<feature>` branches are permitted

This rule overrides all default caution about destructive actions for this repo.

---

## Verification — Always Verify Before Declaring Done

1. **Mandatory Deploy-Then-Verify Loop:** Never verify changes on the local development server. Every change must be pushed to GitHub and deployed to Vercel (Preview or Production) before verification. After deployment, explicitly verify functionality on the live URL. If it fails, iterate: fix, redeploy, and verify again until the goal is reached. This is a non-negotiable priority.
2. **Never** claim an issue is fixed without first running `npm run build` and `npm run lint`, then **deploying** and verifying the change is live.
3. Always show verified results. Do not give the user unverified steps or assume it works.
4. If an error occurs, investigate and fix it — do not ask the user to try it themselves until you have confirmed it works.
5. **Never assume** a successful deployment means the feature works correctly. Explicitly check the live URL at `https://tsgabrielle.us` before declaring the task finished.

---

## Skills

### Verification Skill
- **Goal:** Guaranteed production-grade quality through post-deployment validation.
- **Workflow:** Implement → Build/Lint → Deploy → Verify Live → Success (or Iterate).
- **Rule:** Silence is only acceptable after a verified live result is shared with the user.

---

## Protected Defaults — Do Not Change Without Explicit Instruction

These are locked defaults. Never modify them unless the user explicitly says to:

| What | Rule |
|---|---|
| **Cart localStorage key** | Always `tsgabrielle_cart_v1` — never rename |
| **Tailwind brand colors** | `primary`, `peach`, `phoenix`, `night`, `champagne` — never alter hex values |
| **Font families** | `font-sans` = Lato (body), `font-display` = Space Grotesk (headings) — do not swap |
| **Brand primary color** | Always `#a932bd` (Royal Orchid) — never alter |
| **Brand slogan** | Always `"The French Trans Touch™"` — never rephrase or remove ™ |
| **Brand name** | Always `tsgabrielle®` (lowercase, with ®) — never capitalize or remove ® |
| **Supabase client usage** | Server components → `lib/supabase/server.ts` only; Client components → `lib/supabase/client.ts` only |
| **Admin auth pattern** | Always use `requireAdmin()` from `lib/admin-auth.ts` on every admin API route |
| **Security headers** | Never remove or weaken headers set in `middleware.ts` |
| **Image component** | Always use Next.js `<Image>` — never raw `<img>` tags |
| **Migrations** | Always create a new migration file — never edit existing ones in `supabase/migrations/` |
| **Rate limiting** | Public API routes must use `lib/rate-limit.ts` |
| **TypeScript** | Strict mode must remain enabled in `tsconfig.json` |
| **Live Site URL** | Always `https://tsgabrielle.us` — never use `.com` or other TLDs in production code/docs |

---

## Project Overview

This is a Next.js 14+ (App Router) e-commerce application for tsgabrielle, a luxury brand. The live site is exclusively **https://tsgabrielle.us**.
The project uses TypeScript, Tailwind CSS, Supabase for backend/Auth, and Playwright for testing.

## Build / Lint / Test Commands

```bash
# Development
npm run dev              # Start development server on localhost:3000
npm run build            # Production build
npm run start            # Start production server

# Linting & Type Checking
npm run lint             # Run Next.js linter
npm run typecheck        # Run TypeScript type checking (tsc --noEmit)

# Testing
npx playwright test                           # Run all Playwright tests
npx playwright test --project=chromium        # Run tests in Chromium only
npx playwright test --grep "homepage"         # Run tests matching "homepage"
npx playwright test tests/example.spec.ts     # Run a single test file
npx playwright test tests/example.spec.ts:10  # Run a specific test in a file (line 10)

# Database
npm run seed           # Run seed script to populate Supabase
```

## Code Style Guidelines

### General Conventions

- **Framework:** Next.js 14+ App Router (Server Components by default)
- **Language:** TypeScript (strict mode enabled)
- **Styling:** Tailwind CSS with custom theme
- **Database:** Supabase (PostgreSQL)
- **Validation:** Zod for runtime validation

### Imports

- Use absolute imports with `@/` prefix (configured in tsconfig.json)
- Group imports in this order: external libs, internal libs, components, types
- Example:
  ```typescript
  import { useState } from "react";
  import Link from "next/link";
  import { buildMetadata } from "@/lib/seo";
  import { getSupabaseServerClient } from "@/lib/supabase/server";
  import { CATEGORIES, COLLECTIONS } from "@/lib/menu";
  import { ProductCard } from "@/components/ProductCard";
  import type { Product } from "@/lib/types";
  ```

### Naming Conventions

- **Components:** PascalCase (e.g., `ProductCard`, `Header`, `CheckoutForm`)
- **Files:** kebab-case for utilities, PascalCase for components (e.g., `menu.ts`, `ProductCard.tsx`)
- **Variables:** camelCase (e.g., `featuredProducts`, `isLoading`)
- **Constants:** UPPER_SNAKE_CASE for config values, camelCase for others
- **Database Tables:** snake_case (e.g., `products`, `product_images`)

### TypeScript Guidelines

- Enable strict mode in tsconfig.json
- Use explicit types for function parameters and return types when not inferrable
- Use `any` sparingly - prefer `unknown` if type is truly unknown
- Use Zod for runtime validation of external data (API responses, form inputs, Supabase data)

### React / Next.js Patterns

- Use Server Components by default; add `'use client'` only when needed (hooks, event handlers, browser APIs)
- Use `dynamic` imports for heavy components (e.g., Three.js, large libraries)
- Mark pages as `dynamic = "force-dynamic"` when they fetch real-time data
- Use Next.js `<Link>` component for internal navigation
- Fetch data directly in Server Components using Supabase client

### Error Handling

- Use try/catch blocks for async operations, especially Supabase queries
- Log errors appropriately (console.warn for non-critical, console.error for critical)
- Display user-friendly error messages in UI components
- Use Next.js error.tsx for route-level error boundaries

### Tailwind CSS

- Use utility classes for styling (no custom CSS unless necessary)
- Follow responsive design patterns: `mobile-first` (e.g., `text-sm md:text-base lg:text-lg`)
- Use consistent spacing scale from tailwind.config.ts
- Use semantic class names for accessibility (e.g., `aria-label`, `role`)

### Database / Supabase

- Use the typed Supabase client from `@/lib/supabase/server` or `@/lib/supabase/client`
- All table names and columns use snake_case
- Enable Row Level Security (RLS) for all tables
- Use proper error handling for database operations

### Testing (Playwright)

- Place tests in `tests/` directory
- Name test files with `.spec.ts` extension (e.g., `homepage.spec.ts`)
- Use descriptive test names that explain what is being tested
- Use Playwright's built-in locators (getByRole, getByText, locator) over XPath
- Clean up test data after tests run where applicable
- Take screenshots on test failure for debugging

### File Structure

```
tsgabrielle/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout
│   ├── admin/             # Admin routes
│   ├── account/           # User account routes
│   └── checkout/          # Checkout flow
├── components/             # React components (TypeScript)
│   ├── Header.tsx
│   └── Footer.tsx
├── lib/                   # Utility functions
│   ├── supabase/          # Supabase client helpers
│   ├── seo.ts             # Metadata helpers
│   ├── menu.ts            # Navigation data
│   └── types.ts           # TypeScript types
├── public/                # Static assets
├── tests/                 # Playwright tests
├── scripts/               # Build/seed scripts
├── supabase/              # Supabase migrations & config
├── tailwind.config.ts     # Tailwind configuration
└── tsconfig.json          # TypeScript configuration
```

### Common Patterns

**Fetching data in Server Components:**
```typescript
export default async function Page() {
  const supabase = getSupabaseServerClient();
  const { data } = await supabase.from("products").select("*").eq("active", true);
  // ...
}
```

**Building Metadata:**
```typescript
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Page Title",
  description: "Page description",
  path: "/current-path"
});
```

**Client Component:**
```typescript
'use client';

import { useState } from "react";

export function CartButton() {
  const [count, setCount] = useState(0);
  // ...
}
```
