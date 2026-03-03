export type MenuLink = {
  label: string;
  href: string;
};

export const CATEGORIES: MenuLink[] = [
  { label: "Beauté Beauty", href: "/beaute-beauty" },
  { label: "Accessories", href: "/accessories" },
  { label: "Hats", href: "/hats" },
  { label: "For Him 👔", href: "/for-him" },
  { label: "For Her 👗", href: "/for-her" },
  { label: "🏡 Home & Décor", href: "/home-decor" }
];

export const COLLECTIONS: MenuLink[] = [
  { label: "Peach Phoenix™", href: "/peach-phoenix" },
  { label: "Paris", href: "/paris" },
  { label: "Arizona 🌵", href: "/arizona" },
  { label: "Made In USA", href: "/made-in-usa" },
  { label: "TransLove™", href: "/translove" },
  { label: "TransFLOWer™", href: "/transflower" },
  { label: "Womanizer", href: "/womanizer" },
  { label: "Flamant 🦩 Rose", href: "/flamant-rose" },
  { label: "🌌✨ Édition Spatiale", href: "/edition-spatiale" },
  { label: "Unicorn 🦄", href: "/unicorn" },
  { label: "Crystal Skies.", href: "/crystal-skies" },
  { label: "🌈 Pride 26", href: "/pride-26" },
  { label: "❄️ Glow in Winter 26", href: "/glow-in-winter-26" },
  { label: "Good Vibes Only.", href: "/good-vibes-only" }
];

export const MENU_GROUPS = [
  { label: "Welcome", href: "/" },
  { label: "Categories", href: "/categories", children: CATEGORIES },
  { label: "Collections", href: "/collections", children: COLLECTIONS },
  {
    label: "The Collabs",
    href: "/the-collabs",
    children: [
      { label: "Adidas x tsgabrielle®", href: "/adidas-x-tsgabrielle" },
      { label: "Champion® Heritage", href: "/champion-heritage" },
      { label: "Columbia Sportswear", href: "/columbia-sportswear" },
      { label: "Under Armour® Performance", href: "/under-armour-performance" }
    ]
  },
  {
    label: "The Universe of tsgabrielle®",
    href: "/the-universe-of-tsgabrielle",
    children: [
      { label: "Your Inclusive Store", href: "/your-inclusive-store" },
      { label: "About Gabrielle", href: "/about-gabrielle" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "The Blogs", href: "/the-blogs" },
      { label: "Videos by YouTube", href: "/videos-by-youtube" }
    ]
  },
  {
    label: "Meet tsgabrielle®",
    href: "/meet-tsgabrielle",
    children: [
      { label: "The Brand", href: "/the-brand" },
      { label: "Peaches", href: "/peaches" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact tsgabrielle®", href: "/contact-tsgabrielle" },
      { label: "Legal Hub", href: "/legal-hub" }
    ]
  },
  {
    label: "📱 Follow tsgabrielle®",
    href: "/follow-tsgabrielle",
    children: [
      { label: "Instagram", href: "/instagram" },
      { label: "TikTok", href: "/tiktok" },
      { label: "YouTube", href: "/youtube" },
      { label: "Facebook", href: "/facebook" },
      { label: "X (Twitter)", href: "/x-twitter" },
      { label: "Pinterest", href: "/pinterest" },
      { label: "LinkedIn", href: "/linkedin" },
      { label: "Snapchat", href: "/snapchat" }
    ]
  },
  {
    label: "👤 My tsgabrielle®",
    href: "/my-tsgabrielle",
    children: [
      { label: "My Account", href: "/account" },
      { label: "My Orders", href: "/account/orders" },
      { label: "My Wishlist", href: "/account/wishlist" },
      { label: "My Settings", href: "/account/settings" }
    ]
  },
  {
    label: "👤 tsgabrielle® Worldwide",
    href: "/tsgabrielle-worldwide",
    children: [
      { label: "Store Directory.", href: "/store-directory" },
      { label: "Stores Directory", href: "/stores-directory" },
      { label: "USA", href: "/usa" }
    ]
  }
] as const;
