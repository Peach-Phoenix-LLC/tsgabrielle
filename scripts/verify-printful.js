require('dotenv').config({ path: '.env.local' });
async function run() {
  const token = process.env.PRINTFUL_ACCESS_TOKEN;
  console.log("Using token:", token ? token.substring(0, 5) + "..." : "NONE");
  try {
    const res = await fetch('https://api.printful.com/stores', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(err);
  }
}
run();