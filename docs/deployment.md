# Deployment Guide

## Vercel

The production project is named `tsgabrielle-live` under the `tsg3` team scope.

1. **Environment Variables**: Use `scripts/deploy-vercel.ps1` to sync all keys from `.env.local` to Vercel.
2. **Repository Linking**: Manually link the `Peach-Phoenix-LLC/tsgabrielle` repository in the [Vercel Project Settings > Git](https://vercel.com/tsg3/tsgabrielle-live/settings/git).
3. **Domain Reassignment**:
   - Go to the old `tsg` project settings and remove `tsgabrielle.us`.
   - Add it to the new `tsgabrielle-live` project.
   - Vercel should auto-detect the DNS records since it's already on Vercel Nameservers.
4. **Webhooks**:
   - PayPal: `https://tsgabrielle.us/api/paypal/webhook`
   - Printful: `https://tsgabrielle.us/api/printful/webhook`

## Supabase

1. **Link**: `npx supabase link --project-ref wfwcydmfdtlpupdozdvn`
2. **Migrations**: `npx supabase db push`
3. **Auth Redirects**:
   - Site URL: `https://tsgabrielle.us`
   - Redirect URL: `https://tsgabrielle.us/auth/callback`

## GoDaddy DNS (If needed)

If switching from Vercel Nameservers back to GoDaddy:
1. `A` record for `@` to Vercel IP: `76.76.21.21`
2. `CNAME` for `www` to `cname.vercel-dns.com`
