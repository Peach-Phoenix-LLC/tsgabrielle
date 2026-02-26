
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const products = await prisma.product.findMany();
    console.log(`Found ${products.length} products.`);
    if (products.length > 0) {
        console.log('Sample product:', products[0].title);
    }
}

main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
