const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const collections = [
        {
            name: 'Arizona Collection',
            slug: 'arizona',
            image_url: 'https://images.unsplash.com/photo-1505353410394-22b73241f585?q=80&w=1000&auto=format&fit=crop',
            description: 'The spirit of the American Southwest.',
            is_active: true,
            sort_order: 1
        },
        {
            name: 'Parisian Spring',
            slug: 'paris-spring',
            image_url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000&auto=format&fit=crop',
            description: 'Elegance from the heart of France.',
            is_active: true,
            sort_order: 2
        },
        {
            name: 'Phoenix Rebirth',
            slug: 'phoenix-rebirth',
            image_url: 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1000&auto=format&fit=crop',
            description: 'Symbolizing growth and creativity.',
            is_active: true,
            sort_order: 3
        }
    ];

    for (const collection of collections) {
        await prisma.collection.upsert({
            where: { slug: collection.slug },
            update: collection,
            create: collection,
        });
    }

    console.log('Seed successful: 3 collections added.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
