# ANTIGRAVITY — Project Rules & Documentation

## tsgabrielle.us

> These rules govern all development, updates, reviews, and AI-assisted work on the Antigravity project.
> Every contributor and AI assistant must read, follow, and never override these rules.

---

## 1. PROJECT IDENTITY

- **Project name:** Antigravity
- **Brand:** tsgabrielle®
- **Live URL:** [https://tsgabrielle.us](https://tsgabrielle.us)
- **Purpose:** Luxury fashion e-commerce web app with print-on-demand fulfillment
- **Status:** Active development

---

## 2. APPROVED TECH STACK

Only the following technologies are approved. Do not introduce anything outside this list without explicit approval.

| Layer                    | Technology                                                 |
| ------------------------ | ---------------------------------------------------------- |
| Hosting & Deployment     | Google Cloud Run                                           |
| Source Control           | []() |
| Database & Auth Backend  | Supabase                                                   |
| Authentication           | Google OAuth via Supabase Auth                             |
| UI Design                | Google Stitch                                              |
| Payments                 | PayPal ONLY (buttons, Venmo, Apple Pay, Google Pay, Cards) |
| Print-on-Demand          | Printful API (Private Token)                               |
| Frontend Framework       | React / Next.js                                            |

### ❌ PERMANENTLY BANNED

- **Stripe** — never use, never suggest, never import, never reference
- Shopify — project no longer uses Shopify in any form
- Any payment processor other than PayPal

---

## 3. ENVIRONMENT VARIABLES

All secrets must live in `.env.local` (local) and Google Cloud Run Environment Variables (production). Never hardcode secrets in code.

```env
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_PAYPAL_CLIENT_ID
PAYPAL_CLIENT_ID=Aeswe_rj7b-j94o2XhSrOO--B2kMv4JJDPMTj-X9wU-9Kj6YkBnhbhsixFgGmy-SfayvFcCiAZloLDMj
PAYPAL_CLIENT_SECRET=EH4_H-HY0M9e48Ii7kqoRPxvmov4L-8dSGUo2yDA9cx0YBZCDRO1psMz6rGgsSDJw7Heu86uUUDCMhvn
PRINTFUL_API_KEY=aftWMjYotmEuhDfdr97wMG5bBRii1mWR4vGXEM5TLToLdpZrxIXyEHY06EnAEyqM
NEXT_PUBLIC_SITE_URL=https://tsgabrielle.us
```

**Rules:**

- `NEXT_PUBLIC_` prefix = safe for browser
- All secrets (PayPal Secret, Supabase Service Role, Printful Key) = server-side only, never exposed to client
- Always verify env vars are set in Cloud Run before deploying

---

## 4. CODE STYLE & STRUCTURE

### File Structure

```bash
/components     → Reusable UI components (e.g. PaymentButtons.jsx)
/pages          → Next.js pages (or /app for App Router)
/api            → Next.js API routes (served by Cloud Run)
/lib            → Shared utilities (supabaseClient.js, etc.)
/styles         → Global CSS
```

### Coding Rules

- Use **functional components** with React hooks only — no class components
- All API calls to PayPal and Printful must happen in `/api` serverless functions — never in the browser
- Use `async/await` — no `.then()` chaining
- Always wrap API calls in `try/catch` and return meaningful error messages
- Never use `console.log` in production — use `console.error` for errors only
- All Supabase writes from the server must use `SUPABASE_SERVICE_ROLE_KEY`
- All Supabase reads from the client must use the anon key with RLS policies

### Naming Conventions

- Components: `PascalCase` (e.g. `PaymentButtons.jsx`)
- API routes: `kebab-case` (e.g. `create-paypal-order.js`)
- Variables & functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE`

---

## 5. PAYMENT RULES

- **PayPal SDK only:** `@paypal/react-paypal-js`
- Payment button order (always in this sequence):
  1. PayPal
  2. Venmo
  3. Apple Pay
  4. Google Pay
  5. Credit / Debit Card
- `createOrder` must always call `/api/create-paypal-order` (server-side) — never create orders client-side
- `onApprove` must always call `/api/capture-paypal-order` (server-side)
- After capture: save to Supabase `orders` table → submit to Printful
- Always show success and error states to the user
- PayPal return URL: `https://tsgabrielle.us/order/success`
- PayPal cancel URL: `https://tsgabrielle.us/cart`

---

## 6. SUPABASE RULES

### Tables

| Table         | Purpose                                         |
| ------------- | ----------------------------------------------- |
| `orders`      | All customer orders with PayPal + Printful data |
| `subscribers` | Newsletter email subscribers                    |

### Rules

- Always enable **Row Level Security (RLS)** on every table
- Users may only read their own orders (policy: `auth.jwt() ->> 'email' = customer_email`)
- Server-side functions use `SUPABASE_SERVICE_ROLE_KEY` and bypass RLS safely
- Never disable RLS without documenting why
- All schema changes must be done via SQL in Supabase SQL Editor and saved to the repo as `.sql` files

---

## 7. PRINTFUL RULES

- Use **Private Token** (not a Public App)
- Token stored as `aftWMjYotmEuhDfdr97wMG5bBRii1mWR4vGXEM5TLToLdpZrxIXyEHY06EnAEyqM` in env vars
- All Printful API calls are server-side only (`/api` routes)
- Order submission endpoint: `POST https://api.printful.com/orders`
- Always save `printful_order_id` and `printful_status` back to Supabase after submission
- If Printful submission fails, log the error but do NOT block the order confirmation to the customer (payment already captured)

---

## 8. VERIFY, TEST & CONFIRM PROTOCOL

Before any deployment or major change, run through this checklist:

### ✅ Verify

- [ ] All env vars present in Google Cloud Run environment variables
- [ ] Google OAuth redirect URIs include `https://tsgabrielle.us`
- [ ] Supabase Auth redirect URLs include `https://tsgabrielle.us/**`
- [ ] PayPal app has `https://tsgabrielle.us` as allowed return URL
- [ ] Printful token is active and not expired

### ✅ Test

- [ ] Google login flow works end-to-end
- [ ] PayPal payment completes and order appears in Supabase
- [ ] Printful receives the order after payment
- [ ] All navigation links go to real routes (no `#` placeholders)
- [ ] Newsletter subscribe saves to Supabase `subscribers`
- [ ] Site loads correctly on mobile and desktop

### ✅ Analyze

- [ ] Check Cloud Run logs for errors or warnings
- [ ] Check Supabase logs for failed queries
- [ ] Check PayPal Developer dashboard for failed transactions
- [ ] Check Printful dashboard for pending/failed orders

### ✅ Confirm Before Merging

- [ ] No Stripe imports anywhere in the codebase (`grep -r "stripe" .`)
- [ ] No hardcoded secrets in any file
- [ ] No broken links or `href="#"` placeholders in production
- [ ] RLS is enabled on all Supabase tables

---

## 9. DO NOT LOSE INFORMATION

- Never delete or overwrite files without backing them up first
- All SQL schema changes must be saved as `.sql` files in `/supabase` folder
- All `.env.example` files must be kept up to date when new variables are added
- When refactoring a component, keep the old version commented or in a `/archive` folder until the new one is confirmed working
- Document every external API key expiration date in this file:

| Service  | Key Type                | Expiration                         |
| -------- | ----------------------- | ---------------------------------- |
| Printful | Private Token           | Set on creation — check dashboard  |
| PayPal   | Client ID + Secret      | No expiration — rotate annually    |
| Supabase | Anon Key                | No expiration                      |
| Supabase | Service Role Key        | No expiration — keep secret        |

---

## 11. INTERFACE & NAVIGATION

- **Internal Explorer:** When browsing or navigating files, always prioritize using the internal Antigravity panel. Do not trigger new browser windows or tabs for file inspection unless absolutely necessary (e.g., viewing complex visual artifacts).
- **Embedded Navigation:** Keep all codebase exploration, directory listings, and file views embedded within the chat interface to maintain context and flow.

---

## 12. UPDATE PROTOCOL

When updating these rules:

1. Add the date and a short description of what changed at the bottom of this file

2. Commit the updated file to Internal with message: `docs: update antigravity rules — [reason]`
3. Notify all contributors

---

## CHANGE LOG

| Date       | Change                                                 |
| ---------- | ------------------------------------------------------ |
| 2026-02-21 | Initial rules created for Antigravity / tsgabrielle.us |
| 2026-02-21 | Added formatting fixes and linting corrections         |

