require('dotenv').config({ path: require('path').resolve(__dirname, '../.env.local') });

async function refreshToken() {
  const clientId = process.env.PRINTFUL_APP_ID;
  const clientSecret = process.env.PRINTFUL_APP_SECRET;
  const refreshToken = process.env.PRINTFUL_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    console.error("Missing PRINTFUL_APP_ID, PRINTFUL_APP_SECRET, or PRINTFUL_REFRESH_TOKEN in .env.local");
    process.exit(1);
  }

  console.log(`Refreshing token for client: ${clientId}...`);
  
  try {
    const response = await fetch("https://www.printful.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        grant_type: "refresh_token",
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken
      })
    });

    const data = await response.json();
    console.log("Refresh Response:", JSON.stringify(data, null, 2));

    if (data.access_token) {
        console.log("\n--- SUCCESS ---");
        console.log(`NEW ACCESS TOKEN: ${data.access_token}`);
        if (data.refresh_token) {
            console.log(`NEW REFRESH TOKEN: ${data.refresh_token}`);
        }
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

refreshToken();
