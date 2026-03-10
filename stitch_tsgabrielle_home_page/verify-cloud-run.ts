import * as https from 'https';

const SERVICE_URL = 'https://tsgabrielle.us';

function verifyService() {
    console.log(`Checking status of: ${SERVICE_URL}`);

    const req = https.get(SERVICE_URL, (res) => {
        console.log(`\nResponse Status: ${res.statusCode} ${res.statusMessage}`);

        if (res.statusCode === 200) {
            console.log('✅ Cloud Run Service is reachable and returning 200 OK.');
        } else if (res.statusCode === 403) {
            console.log('⚠️  Service is reachable but returned 403 Forbidden.');
            console.log('   Hint: Ensure "allUsers" has the "Cloud Run Invoker" role if this is a public storefront.');
        } else {
            console.log(`⚠️  Service returned unexpected status: ${res.statusCode}`);
        }

        // Consume response to free memory
        res.resume();
    });

    req.on('error', (e) => {
        console.error(`❌ Error connecting to service: ${e.message}`);
    });
}

verifyService();