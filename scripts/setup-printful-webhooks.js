require("dotenv").config({ path: require("path").resolve(__dirname, "../.env.local") });

const PRINTFUL_API_BASE = "https://api.printful.com/v2";

async function setupWebhooks() {
  const token = process.env.PRINTFUL_API_KEY || process.env.PRINTFUL_ACCESS_TOKEN;
  if (!token) {
    console.error("Missing PRINTFUL_API_KEY or PRINTFUL_ACCESS_TOKEN in .env.local");
    process.exit(1);
  }

  const webhookUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/printful/webhook`;
  console.log(`Setting up webhook for: ${webhookUrl}`);

  try {
    const response = await fetch(`${PRINTFUL_API_BASE}/webhooks`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
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
          { type: "order_remove_hold" }
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Failed to setup webhook:", data);
      process.exit(1);
    }

    console.log("Successfully setup webhook:", JSON.stringify(data, null, 2));
    const signingSecret =
      data?.result?.signing_secret_key ??
      data?.result?.signingSecretKey ??
      data?.signing_secret_key;

    if (typeof signingSecret === "string" && signingSecret.length > 0) {
      console.log("\nSave this value as PRINTFUL_WEBHOOK_SECRET:");
      console.log(signingSecret);
    } else {
      console.warn(
        "Webhook created, but no signing_secret_key was returned. Verify response shape in Printful API docs.",
      );
    }
  } catch (error) {
    console.error("Error setting up webhook:", error);
    process.exit(1);
  }
}

setupWebhooks();
