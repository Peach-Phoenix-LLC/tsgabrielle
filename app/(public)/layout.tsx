/**
 * The (public) route group exists only for organisational purposes.
 * All layout logic (Header, Footer, GTM, BuilderProvider, CookieConsent)
 * lives in the root app/layout.tsx and applies to every page.
 * This file intentionally renders children directly.
 */
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
