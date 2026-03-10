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

Navigate to: **[Google Cloud Console → Cloud Run → tsgabrielle-site → Edit & Deploy New Revision → Environment Variables](https://console.cloud.google.com/run/detail/us-central1/tsgabrielle-site/vars)**

| Variable | Source of Truth |
|---|---|
| `DATABASE_URL` | Cloud SQL → `postgresql://postgres:[PASSWORD]@localhost/tsgabrielle?host=/cloudsql/tsgabrielle-sql-prod:us-central1:tsgabrielle-db` |
| `NEXTAUTH_URL` | `https://tsgabrielle.us` |
| `NEXTAUTH_SECRET` | 32+ character random string |
| `GOOGLE_CLIENT_ID` | GCP Credentials console |
| `GOOGLE_CLIENT_SECRET` | GCP Credentials console |
| `GA4_PROPERTY_ID` | `13411409612` |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | `G-3FPYVZPK13` |
| `ADMIN_EMAIL` | `yridoutt@gmail.com` |
| `OPENAI_API_KEY` | Provided by user (currently in Cloud Run) |

> 🔑 **Note**: Keep `DATABASE_URL` local and in GCP consistent. Local uses IP, Production uses the Cloud SQL Auth Proxy socket.

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

## Phase 4 — Build & Deploy via GCloud CLI 🛠️

This method uses the stable 3-step process to ensure all static assets are served via Cloud Storage.

### Step 1: Submit Build to Google Cloud Build
Build the container and push it to the registry.

```powershell
gcloud builds submit --tag gcr.io/tsgabrielle-sql-prod/tsgabrielle-site .
```

### Step 2: Sync Static Assets to Cloud Storage
Synchronize the local `public` directory to the production bucket.

```powershell
gcloud storage rsync ./public gs://dynamic-web-app-with-javascript-bucket-565b65b17cf0 --recursive
```

### Step 3: Deploy to Cloud Run
Deploy the newly built image to production with public access.

```powershell
gcloud run deploy tsgabrielle-site --image gcr.io/tsgabrielle-sql-prod/tsgabrielle-site --project tsgabrielle-sql-prod --region us-central1 --allow-unauthenticated
```

> [!NOTE]
> If you are deploying the administrative backend, replace `tsgabrielle-site` with `tsgabrielle-admin` in the tag and deployment names.
```

---

## Phase 5 — Post-Deploy Verification 🧪

After deployment completes (usually 3-5 minutes):

1. **Visit the live site**: [https://tsgabrielle.us](https://tsgabrielle.us)
2. **Check all collection pages** load correctly (e.g., `/collections/arizona`, `/collections/peach-phoenix`)
3. **Test Google OAuth sign-in** — should redirect correctly and create a user session.
4. **Test the cart** — add products, remove products, verify totals.
5. **Test admin access** — log in as `yridoutt@gmail.com` and verify `/admin` is accessible.
6. **Check Cloud Run logs**: [Google Cloud Console → Cloud Run → tsgabrielle-site → Logs](https://console.cloud.google.com/run)

---

## Troubleshooting 🔧

| Issue | Fix |
|---|---|
| Build fails with Prisma error | Run `npx prisma generate` locally first, then deploy |
| Google Sign-In fails on production | Verify the redirect URI is in Google Cloud Console |
| 500 error on collection pages | Check the Cloud SQL Proxy `host=` parameter in `DATABASE_URL` |
| `NEXTAUTH_SECRET` error | Ensure it's set in Cloud Run environment variables |
| Image not showing | Ensure the image is in `public/images/` |
