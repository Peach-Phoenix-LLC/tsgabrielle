import dynamic from "next/dynamic";
import type { ComponentType } from "react";

export interface SectionDefinition {
  type: string;
  label: string;
  icon: string;
  category: "hero" | "content" | "commerce" | "media" | "engagement" | "custom";
  defaultProps: Record<string, any>;
}

export const SECTION_DEFINITIONS: SectionDefinition[] = [
  {
    type: "hero",
    label: "Hero Section",
    icon: "Sparkles",
    category: "hero",
    defaultProps: {
      heading: "Your Headline Here",
      subheading: "Add a compelling subheading",
      backgroundImage: "",
      ctaText: "Shop Now",
      ctaLink: "/collections",
      overlayOpacity: 0.4,
      textAlign: "center",
    },
  },
  {
    type: "image-text",
    label: "Image + Text",
    icon: "LayoutPanelLeft",
    category: "content",
    defaultProps: {
      heading: "Section Title",
      body: "<p>Add your content here...</p>",
      image: "",
      imageAlt: "",
      imagePosition: "right",
      backgroundColor: "",
    },
  },
  {
    type: "text-block",
    label: "Text Block",
    icon: "AlignLeft",
    category: "content",
    defaultProps: {
      heading: "Section Title",
      body: "<p>Add your content here. This is a rich text block that supports formatting.</p>",
      textAlign: "left",
      maxWidth: "800px",
    },
  },
  {
    type: "product-grid",
    label: "Product Grid",
    icon: "Grid3x3",
    category: "commerce",
    defaultProps: {
      title: "Featured Products",
      subtitle: "",
      collection: "",
      category: "",
      columns: 4,
      limit: 8,
      showPrice: true,
    },
  },
  {
    type: "collection-grid",
    label: "Collection Grid",
    icon: "LayoutGrid",
    category: "commerce",
    defaultProps: {
      title: "Our Collections",
      subtitle: "",
      columns: 3,
      showFeaturedOnly: false,
    },
  },
  {
    type: "slider",
    label: "Slider / Carousel",
    icon: "GalleryHorizontal",
    category: "media",
    defaultProps: {
      slides: [
        { image: "", heading: "Slide 1", description: "" },
        { image: "", heading: "Slide 2", description: "" },
      ],
      autoplay: true,
      interval: 5000,
    },
  },
  {
    type: "banner",
    label: "Banner",
    icon: "Megaphone",
    category: "engagement",
    defaultProps: {
      text: "Free shipping on orders over $50",
      backgroundColor: "#a932bd",
      textColor: "#ffffff",
      link: "",
      dismissible: true,
    },
  },
  {
    type: "announcement",
    label: "Announcement Bar",
    icon: "Bell",
    category: "engagement",
    defaultProps: {
      messages: ["New arrivals just dropped!", "Use code PEACH10 for 10% off"],
      backgroundColor: "#0f1720",
      textColor: "#ffffff",
      rotateInterval: 4000,
    },
  },
  {
    type: "video",
    label: "Video Section",
    icon: "Play",
    category: "media",
    defaultProps: {
      heading: "",
      videoUrl: "",
      posterImage: "",
      autoplay: false,
      aspectRatio: "16/9",
    },
  },
  {
    type: "newsletter",
    label: "Newsletter Signup",
    icon: "Mail",
    category: "engagement",
    defaultProps: {
      heading: "Stay in the Loop",
      description: "Subscribe for exclusive drops and early access.",
      buttonText: "Subscribe",
      backgroundColor: "#f8f2e7",
    },
  },
  {
    type: "custom-html",
    label: "Custom HTML",
    icon: "Code",
    category: "custom",
    defaultProps: {
      html: "<div>Custom content here</div>",
    },
  },
];

export function getSectionDefinition(type: string): SectionDefinition | undefined {
  return SECTION_DEFINITIONS.find((def) => def.type === type);
}

export function getSectionsByCategory(category: SectionDefinition["category"]) {
  return SECTION_DEFINITIONS.filter((def) => def.category === category);
}

// Dynamic component loading - keeps builder code out of the public bundle
const sectionComponents: Record<string, ComponentType<any>> = {
  hero: dynamic(() => import("@/components/builder/sections/HeroSection")),
  "image-text": dynamic(() => import("@/components/builder/sections/ImageTextSection")),
  "text-block": dynamic(() => import("@/components/builder/sections/TextBlockSection")),
  "product-grid": dynamic(() => import("@/components/builder/sections/ProductGridSection")),
  "collection-grid": dynamic(() => import("@/components/builder/sections/CollectionGridSection")),
  slider: dynamic(() => import("@/components/builder/sections/SliderSection")),
  banner: dynamic(() => import("@/components/builder/sections/BannerSection")),
  announcement: dynamic(() => import("@/components/builder/sections/AnnouncementSection")),
  video: dynamic(() => import("@/components/builder/sections/VideoSection")),
  newsletter: dynamic(() => import("@/components/builder/sections/NewsletterSection")),
  "custom-html": dynamic(() => import("@/components/builder/sections/CustomHtmlSection")),
};

export function getSectionComponent(type: string): ComponentType<any> | undefined {
  return sectionComponents[type];
}
