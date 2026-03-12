require('dotenv').config({ path: '.env.local' });
async function run() {
  const token = '0qAeEkQ0PayIrBiGyGTl3gI0hzFQqgwGpAj51Ldt';
  console.log("Testing token as v1 Token...");
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