export type MenuLink = {
  label: string;
  href: string;
  image?: string;
};

export const CATEGORIES: MenuLink[] = [
  { label: "Accessories", href: "/categories/accessories" },
  { label: "Beauté • Beauty", href: "/categories/beaute-beauty" },
  { label: "Hats", href: "/categories/hats" },
  { label: "Home & Décor", href: "/categories/home-decor" },
  { label: "For Him", href: "/categories/for-him" },
  { label: "For Her", href: "/categories/for-her" },
];

export const COLLECTIONS: MenuLink[] = [
  { label: "Pride 26", href: "/collections/pride-26" },
  { label: "Glow In Winter 26", href: "/collections/glow-in-winter-26" },
  { label: "Good Vibes Only.", href: "/collections/good-vibes-only" },
  { label: "Crystal Skies.", href: "/collections/crystal-skies" },
  { label: "Unicorn", href: "/collections/unicorn" },
  { label: "Édition Spatiale", href: "/collections/edition-spatiale" },
  { label: "Flamant Rose", href: "/collections/flamant-rose" },
  { label: "Womanizer", href: "/collections/womanizer" },
  { label: "TransFLOWER™", href: "/collections/transflower" },
  { label: "TransLove™", href: "/collections/translove" },
  { label: "Made In USA", href: "/collections/made-in-usa" },
  { label: "Arizona", href: "/collections/arizona" },
  { label: "Paris", href: "/collections/paris" },
  { label: "Peach Phoenix™", href: "/collections/peach-phoenix" },
];

export const THE_COLLABS: MenuLink[] = [
  { label: "Adidas X tsgabrielle®", href: "/adidas-x-tsgabrielle" },
  { label: "Champion® Heritage", href: "/champion-heritage" },
  { label: "Columbia Sportswear", href: "/columbia-sportswear" },
  { label: "Under Armour® Performance", href: "/under-armour-performance" },
];

export const MENU_GROUPS = [
  { label: "Welcome", href: "/" },
  { label: "Categories", href: "/categories", children: CATEGORIES },
  { label: "Collections", href: "/collections", children: COLLECTIONS },
  { label: "The Collabs", href: "/the-collabs", children: THE_COLLABS },
  {
    label: "The Universe Of tsgabrielle®",
    href: "/the-universe-of-tsgabrielle",
    children: [
      { label: "Your Inclusive Store", href: "/your-inclusive-store" },
      { label: "About Gabrielle", href: "/about-gabrielle" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "The Blogs", href: "/the-blogs" },
      { label: "Videos", href: "/videos" },
    ],
  },
  {
    label: "Meet tsgabrielle®",
    href: "/meet-tsgabrielle",
    children: [
      { label: "The Brand", href: "/the-brand" },
      { label: "Peaches", href: "/peaches" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact tsgabrielle®", href: "/contact-tsgabrielle" },
      { label: "Legal Hub", href: "/legal-hub" },
    ],
  },
  {
    label: "Follow tsgabrielle®",
    href: "/follow-tsgabrielle",
    children: [
      { label: "Instagram", href: "https://www.instagram.com/tsgabrielle3" },
      { label: "TikTok", href: "https://www.tiktok.com/@tsgabrielle3" },
      { label: "YouTube", href: "https://www.youtube.com/@tsgabrielle3" },
      { label: "Facebook", href: "https://www.facebook.com/tsgabrielle3" },
      { label: "X (Twitter)", href: "https://x.com/tsgabrielle3" },
      { label: "Pinterest", href: "https://www.pinterest.com/tsgabrielle3/" },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/tsgabrielle/" },
      { label: "Snapchat", href: "https://www.snapchat.com/@tsgabrielle3" },
    ],
  },
  {
    label: "My tsgabrielle®",
    href: "/my-tsgabrielle",
    children: [
      { label: "My Account", href: "/account" },
      { label: "My Orders", href: "/account/orders" },
      { label: "My Wishlist", href: "/account/wishlist" },
      { label: "My Settings", href: "/account/settings" },
    ],
  },
  {
    label: "tsgabrielle® Worldwide",
    href: "/tsgabrielle-worldwide",
    children: [
      { label: "Store Directory.", href: "/store-directory" },
      { label: "Stores Directory", href: "/stores-directory" },
      { label: "USA", href: "/usa" },
    ],
  },
] as const;
