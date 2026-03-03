import { Hero } from "@/components/hero/Hero";
import { buildMetadata } from "@/lib/seo";
import { getFeatureFlag3D } from "@/lib/store";

export const metadata = buildMetadata({
  title: "Welcome | tsgabrielle",
  description: "Welcome to tsgabrielle luxury ecommerce.",
  path: "/"
});

export default async function HomePage() {
  const enable3D = await getFeatureFlag3D();
  return <Hero enable3D={enable3D} />;
}
