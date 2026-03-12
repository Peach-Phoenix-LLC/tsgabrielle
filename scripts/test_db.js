require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

// Use DATABASE_URL from .env.local
const client = new Client({
    connectionString: process.env.DATABASE_URL
});

client.connect()
    .then(() => {
        console.log('Successfully connected to database.');
        return client.query('SELECT NOW()');
    })
    .then(res => {
        console.log('Query result:', res.rows);
    })
    .catch(err => {
        console.error('Connection error:', err.stack);
    })
    .finally(() => {
        client.end();
    });