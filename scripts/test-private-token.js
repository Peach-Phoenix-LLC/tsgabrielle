require('dotenv').config({ path: '.env.local' });
async function run() {
  const token = '2oZngZPsHIBzjLoIz04avU7Lt8L2XvF5hFpjvhzDf1Hrd27NspEYmaxk7B1nOfKY';
  console.log("Testing token as Private Token...");
  try {
    const res = await fetch('https://api.printful.com/v2/stores', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(err);
  }
}
run();