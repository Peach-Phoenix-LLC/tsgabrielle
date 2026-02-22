# Security Pillar: tsgabrielle® Digital Maison

## 1. Governance & Protocol

Security is the base layer of the Maison. Every change must be validated against this pillar before Design or Conversion optimizations.

## 2. Payment Security (PayPal-Only)

- **Zero-Trust Client Processing**: All transactions are handled via PayPal Smart Buttons. The Maison never touches, stores, or transmits raw credit card data.
- **Server-Side Validation**: Every transaction must be verified server-side via the PayPal Orders API before fulfillment.
- **Environment Isolation**: PayPal Client IDs and Secrets are strictly managed via encrypted environment variables.

## 3. API & Data Protection

- **Prisma Parameterization**: All database interactions use Prisma for built-in SQL injection protection.
- **Type Safety**: TypeScript is enforced across the stack to prevent runtime data corruption.
- **Middleware Guard**: Admin routes (`/admin/**`) are protected by NextAuth middleware, requiring explicit Maison Authority (Admin Role).

## 4. Infrastructure & Deployment

- **Google Cloud Run Security**: Traffic is served via Google Cloud Run with edge protection and HTTPS enforced.
- **Rate Limiting**: Critical endpoints (Checkout, Login) implement tiered rate limiting.
- **Dependency Sanitization**: Automated `npm audit` on every build to prevent supply chain attacks.

## 5. Incident Response

- **Monitoring**: Real-time logging of authentication failures and anomalous payment spikes.
- **Triaging**: Vulnerabilities reported via `security@tsgabrielle.com` receive immediate priority.

---
*Status: ACTIVE | Last Hardened: 2026-02-21*
