require('dotenv').config({ path: require('path').resolve(__dirname, '../.env.local') });

async function testToken() {
  const token = process.env.PRINTFUL_API_KEY;
  console.log("Testing token...");
  try {
    const response = await fetch("https://api.printful.com/stores", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = await response.json();
    console.log("V1 Response:", JSON.stringify(data, null, 2));

    const response2 = await fetch("https://api.printful.com/v2/stores", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data2 = await response2.json();
    console.log("V2 Response:", JSON.stringify(data2, null, 2));
  } catch (error) {
    console.error("Error:", error);
  }
}

testToken();
