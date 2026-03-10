const fetch = require('node-fetch'); // we'll try built-in fetch if possible or just require https
const https = require('https');

const token = process.env.PRINTFUL_API_KEY || "DoSZ1Igf1LU3Oav4pbHeqntlD4UEJInBKxmtHByw";

const options = {
  hostname: 'api.printful.com',
  path: '/orders',
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  }
};

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`);
  res.on('data', d => {
    process.stdout.write(d);
  });
});

req.on('error', error => {
  console.error(error);
});

req.end();
