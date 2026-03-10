const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const headMenuData = [
    {
        id: "I",
        title: "WELCOME",
        description: "The high-fashion portal. The entry point to the 2026 \"Glow\" aesthetic.",
        links: [
            { label: "Home", url: "/" }
        ]
    },
    {
        id: "II",
        title: "Categories",
        description: "Defined by craftsmanship and lifestyle extension.",
        links: [
            { label: "Beauté Beauty", url: "/categories/beauty" },
            { label: "Accessories", url: "/categories/accessories" },
            { label: "Hats", url: "/categories/hats" },
            { label: "For Him 👔 / For Her 👗", url: "/categories/gender" },
            { label: "🏡 Home & Décor", url: "/categories/home-decor" }
        ]
    },
    {
        id: "III",
        title: "Collections",
        description: "Your intellectual and spiritual property. Each link represents a distinct movement.",
        links: [
            { label: "Peach Phoenix™", url: "/collections/peach-phoenix" },
            { label: "Paris", url: "/collections/paris" },
            { label: "Arizona 🌵", url: "/collections/arizona" },
            { label: "Made In USA", url: "/collections/made-in-usa" },
            { label: "TransLove™", url: "/collections/translove" },
            { label: "TransFLOWer™", url: "/collections/transflower" },
            { label: "Womanizer", url: "/collections/womanizer" },
            { label: "Flamant 🦩 Rose", url: "/collections/flamant-rose" },
            { label: "🌌✨ Édition Spatiale", url: "/collections/edition-spatiale" },
            { label: "Unicorn 🦄", url: "/collections/unicorn" },
            { label: "Crystal Skies.", url: "/collections/crystal-skies" },
            { label: "🌈 Pride 26", url: "/collections/pride26" },
            { label: "❄️ Glow in Winter 26", url: "/collections/glow-winter26" },
            { label: "Good Vibes Only.", url: "/collections/good-vibes-only" }
        ]
    },
    {
        id: "IV",
        title: "The Collabs",
        description: "The intersection of performance and luxury.",
        links: [
            { label: "Adidas x tsgabrielle®", url: "/collabs/adidas" },
            { label: "Champion® Heritage", url: "/collabs/champion" },
            { label: "Columbia Sportswear", url: "/collabs/columbia" },
            { label: "Under Armour® Performance", url: "/collabs/under-armour" }
        ]
    },
    {
        id: "V",
        title: "The Universe of tsgabrielle®",
        description: "The brand’s expansive ecosystem.",
        links: [
            { label: "Your Inclusive Store", url: "/store" },
            { label: "About Gabrielle", url: "/about" },
            { label: "Sustainability", url: "/sustainability" },
            { label: "The Blogs", url: "/blog" },
            { label: "Videos by YouTube", url: "/videos" }
        ]
    },
    {
        id: "VI",
        title: "Meet tsgabrielle®",
        description: "The human and operational side of the house.",
        links: [
            { label: "The Brand", url: "/brand" },
            { label: "Peaches", url: "/community/peaches" },
            { label: "FAQ / Contact tsgabrielle®", url: "/contact" },
            { label: "Legal Hub", url: "/legal" }
        ]
    }
];

const socialNav = [
    { label: "Instagram", url: "https://instagram.com/tsgabrielle" },
    { label: "TikTok", url: "https://tiktok.com/@tsgabrielle" },
    { label: "YouTube", url: "https://youtube.com/tsgabrielle" },
    { label: "Facebook", url: "https://facebook.com/tsgabrielle" },
    { label: "X (Twitter)", url: "https://x.com/tsgabrielle" },
    { label: "Pinterest", url: "https://pinterest.com/tsgabrielle" },
    { label: "LinkedIn", url: "https://linkedin.com/company/tsgabrielle" },
    { label: "Snapchat", url: "https://snapchat.com/add/tsgabrielle" }
];

const footerLinks = {
    "Private Suite": [
        { label: "My Account", url: "/my-account" },
        { label: "My Orders", url: "/my-orders" },
        { label: "My Wishlist", url: "/my-wishlist" },
        { label: "My Settings", url: "/my-settings" }
    ],
    "Support": [
        { label: 'Shipping & Returns', url: '/shipping-returns' },
        { label: 'Privacy Policy', url: '/privacy-policy' },
        { label: 'Terms of Service', url: '/terms-of-service' },
        { label: 'Accessibility', url: '/accessibility' }
    ]
};

async function main() {
    await prisma.storeConfig.upsert({
        where: { id: 1 },
        update: {
            navigation: {
                announcement: {
                    text: "Free complementary shipping for the Amethyst Era.",
                    bg_color: "#a932bd",
                    text_color: "#ffffff",
                    is_active: true
                },
                header: {
                    is_sticky: true,
                    is_transparent: true,
                    mega_menu: headMenuData
                }
            },
            footer: {
                brand_description: "The high-fashion portal. The entry point to the 2026 \"Glow\" aesthetic. Experience the intersection of performance and luxury.",
                social_nav: socialNav,
                link_groups: footerLinks,
                newsletter_title: "The 2026 Pulse",
                newsletter_description: "Join the glow. Receive early access and exclusive drops."
            }
        },
        create: {
            id: 1,
            navigation: {
                announcement: {
                    text: "Free complementary shipping for the Amethyst Era.",
                    bg_color: "#a932bd",
                    text_color: "#ffffff",
                    is_active: true
                },
                header: {
                    is_sticky: true,
                    is_transparent: true,
                    mega_menu: headMenuData
                }
            },
            footer: {
                brand_description: "The high-fashion portal. The entry point to the 2026 \"Glow\" aesthetic. Experience the intersection of performance and luxury.",
                social_nav: socialNav,
                link_groups: footerLinks,
                newsletter_title: "The 2026 Pulse",
                newsletter_description: "Join the glow. Receive early access and exclusive drops."
            }
        }
    });

    console.log('Beautiful StoreConfig seeded successfully.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
