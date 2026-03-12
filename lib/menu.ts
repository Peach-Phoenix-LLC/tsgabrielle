export type MenuLink = {
  label: string;
  href: string;
  image?: string;
  heroImage?: string;
};

export const CATEGORIES: MenuLink[] = [
  { label: "Accessories", href: "/categories/accessories", image: "/images/Categories/tsgabrielle-new-accessories.png", heroImage: "/images/Categories/tsgabrielle-hero-accessories.png" },
  { label: "Beauté • Beauty", href: "/categories/beaute-beauty", image: "/images/Categories/tsgabrielle-new-beauty.png", heroImage: "/images/Categories/tsgabrielle-new-beauty.png" },
  { label: "Hats", href: "/categories/hats", image: "/images/Categories/tsgabrielle-new-hats.png", heroImage: "/images/Categories/tsgabrielle-hero-hats.png" },
  { label: "Home & Décor", href: "/categories/home-decor", image: "/images/Categories/tsgabrielle-new-home.png", heroImage: "/images/Categories/tsgabrielle-hero-home.png" },
  { label: "For Him", href: "/categories/for-him", image: "/images/Categories/tsgabrielle-new-him.png", heroImage: "/images/Categories/tsgabrielle-hero-him.png" },
  { label: "For Her", href: "/categories/for-her", image: "/images/Categories/tsgabrielle-new-her.png", heroImage: "/images/Categories/tsgabrielle-hero-her.png" },
];

export const COLLECTIONS: MenuLink[] = [
  { label: "Pride 26", href: "/pride" },
  {
    label: "Glow In Winter 26",
    href: "/glow",
    image: "/images/Collections/Glow%20in%20Winter%2026/tsgabrielle-Glow-in-Winter26-new.png",
  },
  { label: "Good Vibes Only.", href: "/good" },
  {
    label: "Crystal Skies.",
    href: "/crystal",
    image: "/images/Collections/Crystal%20Skies/Crystal%20Skies.png",
  },
  { label: "Unicorn", href: "/unicorn" },
  {
    label: "Édition Spatiale",
    href: "/edition",
    image: "/images/Collections/%C3%89dition%20Spatiale/%C3%89dition-Spatiale-by-tsgabrielle.png",
  },
  {
    label: "Flamant Rose",
    href: "/flamant-rose",
    image: "/images/Collections/Flamant%20Rose/Flamant-Rose.png",
  },
  {
    label: "Womanizer",
    href: "/womanizer",
    image: "/images/Collections/Womanizer/Womanizer.png",
  },
  { label: "TransFLOWer™", href: "/transflower" },
  { label: "TransLove™", href: "/translove" },
  { label: "Made In USA", href: "/made-in-usa" },
  { label: "Arizona", href: "/arizona" },
  { label: "Paris", href: "/paris", image: "/images/slides/tsgabrielle-Slide4.png" },
  {
    label: "Peach Phoenix™",
    href: "/peach",
    image: "/images/Collections/Peach%20Phoenix/Peach_Phienix.PNG",
  },
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
      { label: "Faq", href: "/faq" },
      { label: "Contact tsgabrielle®", href: "/contact-tsgabrielle" },
      { label: "Legal Hub", href: "/legal-hub" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
      { label: "Refund Policy", href: "/refund-policy" },
    ],
  },
  {
    label: "Follow tsgabrielle®",
    href: "/follow-tsgabrielle",
    children: [
      { label: "Instagram", href: "https://www.instagram.com/tsgabrielle3" },
      { label: "Tiktok", href: "https://www.tiktok.com/@tsgabrielle3" },
      { label: "Youtube", href: "https://www.youtube.com/@tsgabrielle3" },
      { label: "Facebook", href: "https://www.facebook.com/tsgabrielle3" },
      { label: "X (Twitter)", href: "https://x.com/tsgabrielle3" },
      { label: "Pinterest", href: "https://www.pinterest.com/tsgabrielle3/" },
      { label: "Linkedin", href: "https://www.linkedin.com/company/tsgabrielle/" },
      { label: "Snapchat", href: "https://www.snapchat.com/@tsgabrielle3" },
    ],
  },
  {
    label: "tsgabrielle® Worldwide",
    href: "/tsgabrielle-worldwide",
    children: [
      { label: "Store Directory", href: "/store-directory" },
      { label: "Stores Directory", href: "/stores-directory" },
      { label: "Usa", href: "/usa" },
    ],
  },
] as const;
