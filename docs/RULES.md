# tsgabrielle® Development Rules & Best Practices

To ensure the website remains **100% functional, secure, and optimized**, follow these rules strictly.

## 1. Repository Hygiene
- **Root Directory**: Keep the root clean. New scripts go in `scripts/`, documentation in `docs/`.
- **Absolute Imports**: Always use `@/` for internal imports (e.g., `import { ... } from "@/lib/store"`).
- **No Legacy Code**: Do not use or reference the `.legacy/` or `src/` directories.

## 2. Technical Stack Standards
- **Next.js**: Use App Router conventions. Prefer Server Components by default.
- **Supabase**: 
    - Database operations MUST use `lib/supabase/server.ts` for server-side and `lib/supabase/client.ts` for client-side.
    - Site settings and feature flags must be stored in Supabase, not hardcoded.
- **Tailwind CSS**: Use utility classes. Stick to the brand palette defined in `tailwind.config.ts`.
- **Images**: Always use the Next.js `<Image>` component. Ensure all images have `alt` tags for SEO.

## 3. Deployment & Verification
- **Production is Truth**: Local verification is insufficient. Every change must be pushed to a `gemini/*` branch and verified on the live Vercel deployment.
- **Self-Healing Loop**: If a build fails or an audit score drops, repair it immediately before continuing.
- **Audit Scores**: Maintain 90+ on Security and SEO scans.

## 4. E-Commerce Flow
- **Payments**: Never modify PayPal logic in `lib/paypal.ts` without explicit testing of the checkout webhook.
- **Fulfillment**: Ensure Printful sync is verified after any product schema changes.

## 5. Coding Patterns
- **Types**: Always use the shared types in `lib/types.ts`.
- **Visual Builder**: Components should be wrapped in `VisualBuilderProvider` logic to support inline editing.
- **Error Handling**: Use `try/catch` blocks for all external API calls and Supabase queries. Log errors to `console.error`.

---
*Follow these rules to save time and build a more resilient ecosystem.*
