require('dotenv').config({ path: '.env.local' });
async function run() {
  const token = process.env.PRINTFUL_API_KEY;
  try {
    const res1 = await fetch('https://api.printful.com/sync/products', {
      headers: { 'Authorization': 'Bearer ' + token, 'X-PF-Store-Id': '17780588' }
    });
    const data1 = await res1.json();
    console.log("V1 sync/products:", JSON.stringify(data1, null, 2).substring(0, 500));
  } catch (e) { console.error(e); }
}
run();