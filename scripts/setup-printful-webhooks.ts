import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const PRINTFUL_API_BASE = "https://api.printful.com";

async function setupWebhooks() {
  const token = process.env.PRINTFUL_API_KEY;
  if (!token) {
    console.error("Missing PRINTFUL_API_KEY in .env");
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
        url: webhookUrl,
        types: [
          "package_shipped",
          "package_returned",
          "order_failed",
          "order_cancelled",
          "order_put_hold",
          "order_remove_hold"
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Failed to setup webhook:", data);
      process.exit(1);
    }

    console.log("Successfully setup webhook:", data);
  } catch (error) {
    console.error("Error setting up webhook:", error);
    process.exit(1);
  }
}

setupWebhooks();
