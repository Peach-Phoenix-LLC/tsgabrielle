require('dotenv').config({ path: require('path').resolve(__dirname, '../.env.local') });

async function getOAuthToken() {
  const clientId = "tsgabrielle"; // The App ID provided by user
  const clientSecret = "aftWMjYotmEuhDfdr97wMG5bBRii1mWR4vGXEM5TLToLdpZrxIXyEHY06EnAEyqM"; // The Secret provided by user

  console.log(`Requesting token for client: ${clientId}`);
  
  try {
    const response = await fetch("https://www.printful.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret
      })
    });

    const data = await response.json();
    console.log("OAuth Response:", JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error:", error);
  }
}

getOAuthToken();
