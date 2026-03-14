const { Pool } = require('pg');

async function test(username) {
    const host = 'aws-0-us-east-1.pooler.supabase.com';
    const dbToken = 'P%40risAZ2026*';
    const connectionString = `postgresql://${username}:${dbToken}@${host}:5432/postgres`;

    console.log(`Testing ${username}...`);
    const pool = new Pool({ connectionString, connectionTimeoutMillis: 5000 });

    try {
        const client = await pool.connect();
        console.log(`SUCCESS with ${username}`);
        client.release();
        return true;
    } catch (err) {
        console.log(`FAILED with ${username}: ${err.message}`);
        return false;
    } finally {
        await pool.end();
    }
}

async function main() {
    const ref1 = 'waoklslnherhziscjbnc';
    const ref2 = 'safyalybvtjurfxoovod';

    const variants = [
        `postgres.${ref1}`,
        `${ref1}.postgres`,
        `${ref1}`,
        `postgres.${ref2}`,
        `${ref2}.postgres`,
        `${ref2}`
    ];

    for (const v of variants) {
        if (await test(v)) break;
    }
}

main();
