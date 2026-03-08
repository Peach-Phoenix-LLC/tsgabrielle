# AGENTS.md - tsgabrielle E-commerce Store

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
├── components/             # React components
│   ├── Header.jsx
│   └── Footer.jsx
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
