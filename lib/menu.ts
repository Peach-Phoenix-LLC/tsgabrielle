export type MenuLink = {
  label: string;
  href: string;
  image?: string;
};

export const CATEGORIES: MenuLink[] = [
  { label: "Beauté Beauty", href: "/categories/beaute-beauty", image: "/images/Categories/tsgabrielle-Beaute-Beauty.png" },
  { label: "Accessories", href: "/categories/accessories", image: "/images/Categories/tsgabrielle-Accessories.png" },
  { label: "Hats", href: "/categories/hats", image: "/images/Categories/tsgabrielle-Hats.png" },
  { label: "For Him 👔", href: "/categories/for-him", image: "/images/Categories/tsgabrielle-For-Him.png" },
  { label: "For Her 👗", href: "/categories/for-her", image: "/images/Categories/tsgabrielle-for-her.png" },
  { label: "🏡 Home & Décor", href: "/categories/home-decor", image: "/images/Categories/tsgabrielle-Home-&-Decor.png" }
];

export const COLLECTIONS: MenuLink[] = [
  { label: "Peach Phoenix™", href: "/collections/peach-phoenix", image: "/images/Collections/Peach Phoenix/Peach_Phienix.PNG" },
  { label: "Paris", href: "/collections/paris" },
  { label: "Arizona 🌵", href: "/collections/arizona" },
  { label: "Made In USA", href: "/collections/made-in-usa" },
  { label: "TransLove™", href: "/collections/translove" },
  { label: "TransFLOWer™", href: "/collections/transflower" },
  { label: "Womanizer", href: "/collections/womanizer", image: "/images/Collections/Womanizer/Womanizer.png" },
  { label: "Flamant 🦩 Rose", href: "/collections/flamant-rose", image: "/images/Collections/Flamant Rose/Flamant-Rose.png" },
  { label: "🌌✨ Édition Spatiale", href: "/collections/edition-spatiale", image: "/images/Collections/Édition Spatiale/Édition-Spatiale-by-tsgabrielle.png" },
  { label: "Unicorn 🦄", href: "/collections/unicorn" },
  { label: "Crystal Skies.", href: "/collections/crystal-skies", image: "/images/Collections/Crystal Skies/Crystal Skies.png" },
  { label: "🌈 Pride 26", href: "/collections/pride-26" },
  { label: "❄️ Glow in Winter 26", href: "/collections/glow-in-winter-26", image: "/images/Collections/Glow in Winter 26/tsgabrielle-Glow-in-Winter26-new.png" },
  { label: "Good Vibes Only.", href: "/collections/good-vibes-only" }
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
