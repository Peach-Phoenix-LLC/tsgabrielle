# tsgabrielle Ecommerce Platform

Full-stack Next.js App Router ecommerce scaffold with:

- TypeScript + Tailwind CSS
- Supabase (DB/Auth/Storage-ready)
- Printful sync + webhook endpoints
- PayPal checkout + capture + webhook endpoints
- 3D hero via react-three-fiber + drei
- Admin + client dashboards
- Short collection URLs + legacy redirect support

## Quick Start

1. Copy `.env.example` to `.env.local` and fill values.
2. Initialize and link Supabase:
   - `npx supabase link --project-ref <project-ref>`
   - `npx supabase db push`
3. Install deps and run:
   - `npm install`
   - `npm run dev`

## Deployment

See `docs/deployment.md` for Vercel + GoDaddy steps.
