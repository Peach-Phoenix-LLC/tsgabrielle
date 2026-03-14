require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL
});

async function checkSchema() {
    try {
        await client.connect();
        console.log('Connected to DB');
        const res = await client.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'page_content'
            ORDER BY ordinal_position;
        `);
        console.table(res.rows);
    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
}

checkSchema();
