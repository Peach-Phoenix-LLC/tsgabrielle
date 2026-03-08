import { ContentPage } from "@/components/templates/ContentPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "The Universe of tsgabrielle®",
  description: "Explore the ecosystem of creativity, identity, and inclusive entrepreneurship at tsgabrielle®.",
  path: "/the-universe-of-tsgabrielle"
});

export default function Page() {
  const content = `Welcome to **The Universe of tsgabrielle®** — a space where creativity, identity, and purpose come together. This universe reflects the heart of the brand: building something meaningful through innovation, curiosity, and inclusive entrepreneurship.

More than a brand environment, **The Universe of tsgabrielle®** is a living ecosystem of projects, stories, and ideas designed to inspire, inform, and connect. Every section represents a different facet of the journey — from values and products to knowledge, expression, and community.

Explore the elements that shape the world of tsgabrielle®:

### Your Inclusive Store
A space where creativity meets accessibility. Your Inclusive Store brings together thoughtfully curated products that embody the brand’s philosophy: expressive design, intentional choices, and a commitment to making everyone feel welcome, seen, and valued.

### About Gabrielle
Discover the story behind the brand. This section shares Gabrielle’s journey as a French trans creator and entrepreneur living in the United States — a story shaped by resilience, vision, and a dedication to building a universe where inclusivity and authenticity are foundational.

### Sustainability
A commitment to mindful creation and long‑term impact. Here, tsgabrielle® highlights its approach to sustainability, grounded in responsible choices, environmental awareness, and a desire to contribute to a better, more conscious future.

### The Blogs
A home for ideas, reflections, and knowledge. The blog gathers articles exploring creativity, business, identity, innovation, and the evolving landscape that shapes the tsgabrielle® universe.

### Videos
A dynamic window into the brand. The video section offers visual stories, insights, and creative content that bring the world of tsgabrielle® to life through movement, expression, and inclusive storytelling.

Together, these elements form **The Universe of tsgabrielle®** — a growing ecosystem built on creativity, inclusivity, entrepreneurship, and the continuous exploration of new possibilities.`;

  return <ContentPage title="The Universe of tsgabrielle®" body={content} />;
}

