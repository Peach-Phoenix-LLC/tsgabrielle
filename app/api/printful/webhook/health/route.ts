import { NextResponse } from "next/server";

export async function GET() {
  const hasSigningSecret = Boolean(process.env.PRINTFUL_WEBHOOK_SECRET);
  const hasAccessToken = Boolean(process.env.PRINTFUL_ACCESS_TOKEN);

  return NextResponse.json({
    ok: hasSigningSecret,
    service: "printful-webhook",
    timestamp: new Date().toISOString(),
    checks: {
      signingSecretConfigured: hasSigningSecret,
      accessTokenConfigured: hasAccessToken,
    },
    expectedRequestHeaders: ["x-pf-webhook-signature"],
  });
}
