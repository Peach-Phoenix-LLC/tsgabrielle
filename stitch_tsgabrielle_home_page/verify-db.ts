import { Client } from 'pg';

async function verifyDatabaseConnection() {
    console.log(`Connecting to database at 34.70.168.74...`);

    const client = new Client({
        user: 'postgres',
        host: '34.70.168.74',
        database: 'tsgabrielle',
        password: 'TsgProd_2026_Secure!',
        // SSL is usually required for Cloud SQL public IP connections
        ssl: { rejectUnauthorized: false },
        connectionTimeoutMillis: 5000 // Fail fast (5s) if firewall blocks connection
    });

    try {
        await client.connect();
        console.log('✅ Database connection established successfully.');

        const res = await client.query('SELECT NOW() as time');
        console.log(`   Database Server Time: ${res.rows[0].time}`);

        await client.end();
    } catch (err: any) {
        console.error(`❌ Database connection failed: ${err.message}`);
    }
}

verifyDatabaseConnection();