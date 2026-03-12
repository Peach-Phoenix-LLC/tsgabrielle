require('dotenv').config({ path: '.env.local' });
async function run() {
  const token = 'aftWMjYotmEuhDfdr97wMG5bBRii1mWR4vGXEM5TLToLdpZrxIXyEHY06EnAEyqM';
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