require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL is not defined in the environment.");
    process.exit(1);
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    try {
        const products = await prisma.product.findMany({ take: 4 });
        console.log("SUCCESS");
        console.log(products);
    } catch (e) {
        console.error("PRISMA ERROR:", e);
    } finally {
        await prisma.$disconnect();
        await pool.end();
    }
}
main();
