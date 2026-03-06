# Script to sync environment variables to Vercel
# Usage: ./sync-env.ps1

$Scope = "tsg3"
$Project = "tsgabrielle-live"

function Set-VercelEnv($Name, $Value) {
    if (-not $Value) {
        Write-Warning "Skipping ${Name}: value is empty"
        return
    }
    Write-Host "Setting $Name..."
    # Check if exists first
    $exists = npx vercel env ls --scope $Scope $Project | Select-String $Name
    if ($exists) {
        Write-Host "$Name already exists, skipping add."
        return
    }
    npx vercel env add $Name production --scope $Scope --value "$Value"
}

# Supabase
Set-VercelEnv "NEXT_PUBLIC_SUPABASE_URL" "https://wfwcydmfdtlpupdozdvn.supabase.co"
Set-VercelEnv "NEXT_PUBLIC_SUPABASE_ANON_KEY" "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indmd2N5ZG1mZHRscHVwZG96ZHZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2MDc3ODQsImV4cCI6MjA4ODE4Mzc4NH0.AgaAK4YdAhRZdA5pOUNcgoq2AuXwj7fM5PM2JYHWqbw"
Set-VercelEnv "SUPABASE_SERVICE_ROLE_KEY" "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indmd2N5ZG1mZHRscHVwZG96ZHZuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjYwNzc4NCwiZXhwIjoyMDg4MTgzNzg0fQ.tR3Q4EBZE1uu4mPeG5xBMWjqDul_hAGGkVEltMcZGPk"
Set-VercelEnv "NEXT_PUBLIC_SITE_URL" "https://tsgabrielle.us"

# PayPal
Set-VercelEnv "PAYPAL_ENV" "sandbox"
Set-VercelEnv "PAYPAL_CLIENT_ID" "AcCFzcB1_2lzVg3HzMr4KgUx4vO41Zf_PbiSe6tfnhkV5GQEbgceIHbZeRCnviyCPAN5EYuZJw9brLlj"
Set-VercelEnv "PAYPAL_CLIENT_SECRET" "EFrR8-MiG43jImss77q7_GzlGIvSS2kHdjoM1PdV6QNDJu1SyUTWIcWMpqbLRGeIOCkexz8XQvFpoJwv"
Set-VercelEnv "NEXT_PUBLIC_PAYPAL_CLIENT_ID" "AcCFzcB1_2lzVg3HzMr4KgUx4vO41Zf_PbiSe6tfnhkV5GQEbgceIHbZeRCnviyCPAN5EYuZJw9brLlj"
Set-VercelEnv "PAYPAL_WEBHOOK_ID" "7PR91275K7972763B"

# Printful
Set-VercelEnv "PRINTFUL_API_KEY" "aftWMjYotmEuhDfdr97wMG5bBRii1mWR4vGXEM5TLToLdpZrxIXyEHY06EnAEyqM"

# YouTube
Set-VercelEnv "NEXT_PUBLIC_YOUTUBE_API_KEY" "YOUR_YOUTUBE_API_KEY"
Set-VercelEnv "NEXT_PUBLIC_YOUTUBE_CHANNEL_ID" "UCX74i6s1C027tM3t1e_s29g"

# Google Analytics & Tags
Set-VercelEnv "NEXT_PUBLIC_GA_MEASUREMENT_ID" "G-02TDH8YYHB"
Set-VercelEnv "NEXT_PUBLIC_GTM_ID" "GT-PL3T58PK"

# Klaviyo
Set-VercelEnv "NEXT_PUBLIC_KLAVIYO_PUBLIC_KEY" "pk_d35bf6c33c17e28fd555340f0b787aa97c"

Write-Host "Done! Now run 'vercel --prod' to deploy."
