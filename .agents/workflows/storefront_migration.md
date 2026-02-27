---
description: "Four‑step plan to complete storefront migration and polish the site"
---

1. **Move remaining storefront pages** – Relocate pages such as `profile`, `shop`, `[peach]`, `policies`, `terms`, `accessibility`, `faq`, `login`, etc., into `src/app/(storefront)/`. Update each file’s import statements to reference the new global layout (`src/app/(storefront)/layout.tsx`) and remove any local `ModernNavbar`/`ModernFooter` imports.

2. **Adjust shared component paths** – Search for any imports of `ModernNavbar`, `ModernFooter`, or other UI components that still point to the old locations (e.g., `@/components/Home/...`). Refactor them to use the correct relative paths from the new `(storefront)` directory, ensuring the components compile without path errors.

3. **Add SEO metadata** – For each newly‑moved page, add a `metadata` export with appropriate `title` and `description` values that reflect the page’s purpose. This improves search engine visibility and aligns with the project’s SEO standards.

4. **Run build & test** – Execute `npm run build` (or `npm run dev` for a quick dev check) to verify that the application builds successfully. Run any existing unit/E2E tests to confirm that navigation, forms, and dynamic content continue to work after the restructuring.
