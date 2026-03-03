# Deployment Guide

## Vercel

1. Import `Peach-Phoenix-LLC/tsgabrielle` into Vercel.
2. Set all variables from `.env.example`.
3. Add webhooks:
   - PayPal webhook URL: `https://<domain>/api/paypal/webhook`
   - Printful webhook URL: `https://<domain>/api/printful/webhook`
4. Deploy main branch.

## Supabase

1. Run `supabase/schema.sql` in SQL editor.
2. Enable email auth providers.
3. Create storage bucket for product assets if needed.

## GoDaddy Domain

1. In Vercel project domains, add your GoDaddy domain.
2. Copy DNS records from Vercel.
3. In GoDaddy DNS, add:
   - `A` record for apex domain to Vercel provided IP.
   - `CNAME` for `www` to Vercel target.
4. Wait for DNS propagation, then verify in Vercel.
