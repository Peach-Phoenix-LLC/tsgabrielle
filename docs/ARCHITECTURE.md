# tsgabrielle® System Architecture

This document provides a high-level overview of how the tsgabrielle ecosystem works.

## 1. Core Architecture
The system is a **headless e-commerce platform** built with **Next.js 15 (App Router)** and **Supabase**. It follows a component-based architecture where pages are often dynamically constructed from database-driven "recipes".

### Directory Structure (Optimized)
- `app/`: Next.js App Router (Pages & API routes).
- `components/`: UI components (Admin, Layout, Product, Builder).
- `lib/`: Centralized logic (Database clients, service wrappers for PayPal/Printful).
- `scripts/`: Maintenance and utility scripts.
- `docs/`: Documentation and system rules.
- `supabase/`: Database migrations and configuration.

## 2. Data Flow
1. **Frontend**: Next.js Server Components fetch data directly from Supabase via `lib/supabase/server.ts`.
2. **Visual Builder**: When `?builder=true` is active, the `VisualBuilderProvider` switches the UI into an interactive editing state.
3. **Database**: Supabase (PostgreSQL) acts as the primary source of truth for products, orders, and site settings.
4. **Fulfillment**: Changes in orders trigger syncs with the **Printful API** via `lib/printful.ts`.
5. **Payments**: Handled via **PayPal** with server-side validation and webhooks.

## 3. Key Integrations
- **Printful**: Automated product synchronization and order fulfillment.
- **PayPal**: Secure payment processing.
- **Klaviyo**: Marketing automation and email tracking.
- **PostHog**: Product analytics and user behavior tracking.
- **Oracle Cloud (via OpenClaw)**: Powers the "Peach AI" assistant with high-performance LLMs.

## 4. Maintenance & Self-Healing
The repository includes several automated scanners located in `scripts/`:
- `seo-scanner.js`: Audits the live site for SEO compliance.
- `security-scanner.js`: Performs security penetration tests.
- `system-health-check.js`: Verifies database, Vercel, and AI Brain connectivity.

---
*Follow the rules in `docs/RULES.md` to maintain system integrity.*
