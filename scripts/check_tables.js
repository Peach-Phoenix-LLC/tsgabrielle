const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgresql://postgres:TsgProd_2026_Secure!@34.70.168.74/tsgabrielle'
});

client.connect()
    .then(() => {
        console.log('Connected to Cloud SQL.');
        return client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
    })
    .then(res => {
        console.log('Tables in public schema:', res.rows.map(r => r.table_name));
    })
    .catch(err => {
        console.error('Connection error:', err.stack);
    })
    .finally(() => {
        client.end();
    });
