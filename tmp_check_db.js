const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    const count = await prisma.product.count();
    console.log('PRODUCT_COUNT:' + count);
    const products = await prisma.product.findMany({ take: 5 });
    console.log('PRODUCTS:' + JSON.stringify(products));
}

check().catch(console.error).finally(() => prisma.$disconnect());
