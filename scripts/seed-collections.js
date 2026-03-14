const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const collections = [
        {
            name: 'Arizona Collection',
            slug: 'arizona',
            image_url: '/images/collections/Arizona/tsgabrielle-Arizona.png',
            description: 'The spirit of the American Southwest.',
            is_active: true,
            sort_order: 1
        },
        {
            name: 'Crystal Skies',
            slug: 'crystal-skies',
            image_url: '/images/collections/Crystal Skies/Crystal Skies.png',
            description: 'Ethereal designs inspired by the heavens.',
            is_active: true,
            sort_order: 2
        },
        {
            name: 'Flamant Rose',
            slug: 'flamant-rose',
            image_url: '/images/collections/Flamant Rose/Flamant-Rose.png',
            description: 'Elegant and graceful like the flamingo.',
            is_active: true,
            sort_order: 3
        },
        {
            name: 'Glow in Winter 26',
            slug: 'glow-in-winter-26',
            image_url: '/images/collections/Glow in Winter 26/tsgabrielle-Glow-in-Winter26-new.png',
            description: 'Radiate warmth during the coldest season.',
            is_active: true,
            sort_order: 4
        },
        {
            name: 'Paris',
            slug: 'paris',
            image_url: '/images/collections/Paris/Paris-by-tsgabrielle (2).PNG',
            description: 'Elegance from the heart of France.',
            is_active: true,
            sort_order: 5
        },
        {
            name: 'Peach Phoenix',
            slug: 'peach-phoenix',
            image_url: '/images/collections/Peach Phoenix/Peach_Phienix.PNG',
            description: 'Symbolizing rebirth and boundless creativity.',
            is_active: true,
            sort_order: 6
        },
        {
            name: 'Unicorn',
            slug: 'unicorn',
            image_url: '/images/collections/Unicorn/Unicorn (2).png',
            description: 'Rare, magical, and uniquely you.',
            is_active: true,
            sort_order: 7
        },
        {
            name: 'Womanizer',
            slug: 'womanizer',
            image_url: '/images/collections/Womanizer/Womanizer.png',
            description: 'Empowering feminine energy.',
            is_active: true,
            sort_order: 8
        },
        {
            name: 'Édition Spatiale',
            slug: 'edition-spatiale',
            image_url: '/images/collections/Édition Spatiale/Édition-Spatiale-by-tsgabrielle.png',
            description: 'Outer space inspiration for the modern explorer.',
            is_active: true,
            sort_order: 9
        }
    ];

    for (const collection of collections) {
        await prisma.collection.upsert({
            where: { slug: collection.slug },
            update: collection,
            create: collection,
        });
    }

    console.log('Seed successful: 9 collections added.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
