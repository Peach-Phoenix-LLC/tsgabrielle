require('dotenv').config({ path: require('path').resolve(__dirname, '../.env.local') });

async function testAuth() {
  const token = process.env.PRINTFUL_API_KEY;
  const basicAuth = Buffer.from(token).toString('base64');
  
  console.log("Testing Bearer...");
  const res1 = await fetch("https://api.printful.com/stores", {
    headers: { "Authorization": `Bearer ${token}` }
  });
  console.log("Bearer status:", res1.status);

  console.log("Testing Basic...");
  const res2 = await fetch("https://api.printful.com/stores", {
    headers: { "Authorization": `Basic ${basicAuth}` }
  });
  console.log("Basic status:", res2.status);
}

testAuth();
