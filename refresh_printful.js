const https = require('https');

const data = JSON.stringify({
  grant_type: 'refresh_token',
  client_id: process.env.PRINTFUL_APP_ID || 'app-5391976',
  client_secret: process.env.PRINTFUL_APP_SECRET || 'aftWMjYotmEuhDfdr97wMG5bBRii1mWR4vGXEM5TLToLdpZrxIXyEHY06EnAEyqM',
  refresh_token: process.env.PRINTFUL_REFRESH_TOKEN || 'Vk9WXjsQRMVsMah09w08GBHkjXlWFmMR8XWEWEaCk9xwVwEEPeU3PvQR2gVB'
});

const options = {
  hostname: 'www.printful.com',
  path: '/oauth/token',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = https.request(options, res => {
  let body = '';
  res.on('data', d => { body += d; });
  res.on('end', () => {
    console.log(`Status: ${res.statusCode}`);
    console.log(body);
  });
});

req.on('error', console.error);
req.write(data);
req.end();
