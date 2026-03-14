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
    const ref = 'waoklslnherhziscjbnc';
    const formats = [
        `postgres.${ref}`,
        `${ref}.postgres`,
        `${ref}:postgres`,
        `postgres:${ref}`,
        `postgres@${ref}`,
        `${ref}@postgres`,
        `postgres[${ref}]`,
        `${ref}`
    ];

    for (const f of formats) {
        if (await test(f)) break;
    }
}

main();
