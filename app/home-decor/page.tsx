import { CategoryPageTemplate } from "@/components/templates/ListingPage";
import { buildMetadata } from "@/lib/seo";

const categoryDescription = "Transform your living space into a sanctuary with our Home & Décor collection. Explore elegant furnishings, artistic accents, and functional décor that bring warmth and personality to every room. Curate an environment that reflects your sophisticated aesthetic.";

export const metadata = buildMetadata({
  title: "Home & Décor | Modern Furnishings & Interior Accents | tsgabrielle®",
  description: "Upgrade your living space with our premium Home & Décor collection. Discover elegant furnishings, modern accents, and stylish interior design essentials.",
  keywords: [
    "home decor", "interior design", "home styling", "living space", "decor accents",
    "furniture", "modern decor", "cozy home", "home furnishings", "room decor",
    "wall art", "decorative accessories", "luxury home", "home essentials", "housewares",
    "chic interior", "minimalist decor", "rustic decor", "bedroom decor", "living room decor",
    "aesthetic decor", "functional decor", "home upgrades", "home accents", "sanctuary styling"
  ],
  path: "/home-decor"
});

export default function Page() {
  return <CategoryPageTemplate title="🏡 Home & Décor" slug="home-decor" description={categoryDescription} />;
}
