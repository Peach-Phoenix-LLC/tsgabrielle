---
description: How to deploy the tsgabrielle® Next.js storefront to Google Cloud Run production
---

# tsgabrielle® — Deployment Guide 🚀

This workflow deploys from local code to live production at [tsgabrielle.us](https://tsgabrielle.us) via **Google Cloud Run**.

**Stack:** Next.js 16 · Prisma · Supabase · Google Cloud Run · Google OAuth · PayPal

---

## Phase 1 — Local Pre-flight Check ✅

Verify the project builds cleanly before pushing to production.

### Step 1: Install dependencies

```powershell
npm install
```

### Step 2: Generate the Prisma client

```powershell
npx prisma generate
```

### Step 3: Test the production build locally

```powershell
npx next build
```

> ✅ Fix any TypeScript or ESLint errors before proceeding. The build must pass 100%.

### Step 4: (Optional) Run the dev server for a final visual check

```powershell
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to verify collections, cart, and auth work as expected.

---

## Phase 2 — Environment Variables 🔑

All secrets must be configured in your local `.env` and in the **Google Cloud Run** service environment variables.

Navigate to: **[Google Cloud Console → Cloud Run → tsgabrielle-storefront → Edit & Deploy New Revision → Environment Variables](https://console.cloud.google.com/run)**

| Variable | Where to get it |
|---|---|
| `DATABASE_URL` | Supabase → Project → Settings → Database → Connection String |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project → Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project → Settings → API → anon public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project → Settings → API → service_role key |
| `GOOGLE_CLIENT_ID` | [Google Cloud Console](https://console.cloud.google.com/) → Credentials |
| `GOOGLE_CLIENT_SECRET` | Google Cloud Console → Credentials |
| `NEXTAUTH_URL` | Set to: `https://tsgabrielle.us` |
| `NEXTAUTH_SECRET` | Any secure random string (32+ chars) |
| `ADMIN_EMAIL` | `yridoutt@gmail.com` |

> ⚠️ **CRITICAL**: `NEXTAUTH_URL` must be `https://tsgabrielle.us` in production.

---

## Phase 3 — Google OAuth Production Setup 🔐

1. Go to [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials.
2. Click your OAuth 2.0 Client ID.
3. Under **Authorized redirect URIs**, add:

   ```
   https://tsgabrielle.us/api/auth/callback/google
   ```

4. Under **Authorized JavaScript origins**, add:

   ```
   https://tsgabrielle.us
   ```

5. Click **Save**.

---

## Phase 4 — Push to GitHub (triggers Cloud Build CI/CD) 🐙

Cloud Build auto-deploys to Cloud Run on every push to main.

### Step 1: Stage your changes

```powershell
git add -A
```

### Step 2: Commit with a descriptive message

```powershell
git commit -m "feat: your change description"
```

### Step 3: Push to GitHub (triggers Cloud Build → Cloud Run deploy)

```powershell
git push origin main
```

> ⚡ Cloud Build picks up the push, builds the Docker container, and deploys to Cloud Run automatically.

---

## Phase 5 — Manual Deploy via gcloud CLI (Alternative) 🛠️

If you need to force a deploy manually:

```powershell
gcloud run deploy tsgabrielle-storefront --source . --region us-central1 --project tsgabrielle-storefront-357687079974
```

---

## Phase 6 — Post-Deploy Verification 🧪

After deployment completes (usually 3-5 minutes):

1. **Visit the live site**: [https://tsgabrielle.us](https://tsgabrielle.us)
2. **Check all collection pages** load correctly (e.g., `/collections/arizona`, `/collections/peach-phoenix`)
3. **Test Google OAuth sign-in** — should redirect correctly and create a user session.
4. **Test the cart** — add products, remove products, verify totals.
5. **Test admin access** — log in as `yridoutt@gmail.com` and verify `/admin` is accessible.
6. **Check Cloud Run logs**: [Google Cloud Console → Cloud Run → tsgabrielle-storefront → Logs](https://console.cloud.google.com/run)

---

## Troubleshooting 🔧

| Issue | Fix |
|---|---|
| Build fails with Prisma error | Run `npx prisma generate` locally first, then push |
| Google Sign-In fails on production | Verify the redirect URI is in Google Cloud Console |
| 500 error on collection pages | Check Supabase env vars are set in Cloud Run environment variables |
| `NEXTAUTH_SECRET` error | Ensure it's set in Cloud Run environment variables |
| Image not showing | Ensure the image is in `public/images/` and committed to git |
