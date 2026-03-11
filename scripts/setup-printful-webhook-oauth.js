require("dotenv").config({ path: require("path").resolve(__dirname, "../.env.local") });
const fs = require("fs");
const path = require("path");

const TOKEN_URL = "https://www.printful.com/oauth/token";
const API_BASE = "https://api.printful.com/v2";
const envPath = path.resolve(__dirname, "../.env.local");

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

function upsertEnv(key, value) {
  const line = `${key}="${value}"`;
  const current = fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf8") : "";
  const regex = new RegExp(`^${key}=.*$`, "m");
  const next = regex.test(current)
    ? current.replace(regex, line)
    : `${current.trimEnd()}\n${line}\n`;
  fs.writeFileSync(envPath, next, "utf8");
}

function buildAuthorizeUrl(clientId, redirectUri) {
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_url: redirectUri,
  });

  return `https://www.printful.com/oauth/authorize?${params.toString()}`;
}

async function exchangeCodeForToken({ clientId, clientSecret, code }) {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    client_id: clientId,
    client_secret: clientSecret,
  });

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(`OAuth token exchange failed: ${JSON.stringify(payload)}`);
  }
  return payload;
}

async function createWebhook({ accessToken, webhookUrl }) {
  const response = await fetch(`${API_BASE}/webhooks`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      default_url: webhookUrl,
      events: [
        { type: "shipment_sent" },
        { type: "shipment_returned" },
        { type: "order_failed" },
        { type: "order_canceled" },
        { type: "order_put_hold" },
        { type: "order_remove_hold" },
      ],
    }),
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(`Webhook creation failed: ${JSON.stringify(payload)}`);
  }
  return payload;
}

async function refreshAccessToken({ clientId, clientSecret, refreshToken }) {
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
  });

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(`OAuth token refresh failed: ${JSON.stringify(payload)}`);
  }
  return payload;
}

async function main() {
  const clientId = requireEnv("PRINTFUL_APP_ID");
  const clientSecret = requireEnv("PRINTFUL_APP_SECRET");
  const siteUrl = requireEnv("NEXT_PUBLIC_SITE_URL");
  const redirectUri = process.env.PRINTFUL_OAUTH_REDIRECT_URI || `${siteUrl}/auth/printful/callback`;
  const webhookUrl = `${siteUrl}/api/printful/webhook`;

  let accessToken = process.env.PRINTFUL_ACCESS_TOKEN;
  const oauthCode = process.env.PRINTFUL_OAUTH_CODE;
  const refreshToken = process.env.PRINTFUL_REFRESH_TOKEN;

  if (!accessToken && !oauthCode) {
    const authorizeUrl = buildAuthorizeUrl(clientId, redirectUri);
    console.log("Authorize this app in Printful and then rerun:");
    console.log(authorizeUrl);
    console.log("\nThen set PRINTFUL_OAUTH_CODE in .env.local and run this script again.");
    process.exit(1);
  }

  if (!accessToken && refreshToken) {
    const tokenPayload = await refreshAccessToken({
      clientId,
      clientSecret,
      refreshToken,
    });
    accessToken = tokenPayload.access_token;

    if (!accessToken) {
      throw new Error("No access_token in refresh response.");
    }

    upsertEnv("PRINTFUL_ACCESS_TOKEN", accessToken);
    if (tokenPayload.refresh_token) {
      upsertEnv("PRINTFUL_REFRESH_TOKEN", tokenPayload.refresh_token);
    }
    console.log("Refreshed and stored PRINTFUL_ACCESS_TOKEN in .env.local");
  }

  if (!accessToken && oauthCode) {
    const tokenPayload = await exchangeCodeForToken({
      clientId,
      clientSecret,
      code: oauthCode,
    });
    accessToken = tokenPayload.access_token;

    if (!accessToken) {
      throw new Error("No access_token in OAuth response.");
    }

    upsertEnv("PRINTFUL_ACCESS_TOKEN", accessToken);
    if (tokenPayload.refresh_token) {
      upsertEnv("PRINTFUL_REFRESH_TOKEN", tokenPayload.refresh_token);
    }
    console.log("Stored PRINTFUL_ACCESS_TOKEN in .env.local");
  }

  const webhookPayload = await createWebhook({ accessToken, webhookUrl });
  const signingSecret =
    webhookPayload?.result?.signing_secret_key ??
    webhookPayload?.result?.signingSecretKey ??
    webhookPayload?.data?.secret_key ??
    webhookPayload?.data?.signing_secret_key ??
    webhookPayload?.signing_secret_key;

  if (!signingSecret) {
    throw new Error(`Webhook created but signing_secret_key missing: ${JSON.stringify(webhookPayload)}`);
  }

  upsertEnv("PRINTFUL_WEBHOOK_SECRET", signingSecret);
  console.log("Webhook created and PRINTFUL_WEBHOOK_SECRET saved to .env.local");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
