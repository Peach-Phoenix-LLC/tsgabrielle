export interface StoryData {
    hero: {
        titleMain: string;
        titleItalic: string;
        subtitle: string;
        description: string;
        image: string;
    };
    gifTitle: {
        text: string;
        gifUrl: string;
    };
    narrative: {
        label: string;
        heading: string;
        italicWord: string;
        headingSuffix: string;
        content: string;
        image: string;
        badgeText: string;
        badgeValue: string;
    };
    quote: {
        text: string;
        author: string;
        image: string;
    };
    marqueeText: string;
}

export const STORIES: Record<string, StoryData> = {
    "paris": {
        hero: {
            titleMain: "L'Éclat de",
            titleItalic: "Paris",
            subtitle: "2026 Collection",
            description: "Inspired by the cobblestone streets and the blue-gray roofs of the City of Light.",
            image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2000&auto=format&fit=crop"
        },
        gifTitle: {
            text: "PARIS",
            gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJqZ3Q1eXJqZ3Q1eXJqZ3Q1eXJqZ3Q1eXJqZ3Q1eXJqZ3Q1JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKs9yD2dF7pP5k4/giphy.gif"
        },
        narrative: {
            label: "Genesis",
            heading: "Between",
            italicWord: "Cobblestones",
            headingSuffix: "& Cosmic Skies.",
            content: "The Paris 2026 Collection is an editorial dialogue between the timeless elegance of the Rive Gauche and the futuristic energy of the Phoenix.",
            image: "https://images.unsplash.com/photo-1549493527-134cca013146?q=80&w=1200&auto=format&fit=crop",
            badgeText: "Limited Atelier Piece",
            badgeValue: "01 // 100"
        },
        quote: {
            text: "\"To breathe Paris is to preserve one's soul.\"",
            author: "Victor Hugo",
            image: "https://images.unsplash.com/photo-1493134795711-470dd148c41d?q=80&w=2000&auto=format&fit=crop"
        },
        marqueeText: "Paris • Phoenix • tsgabrielle® • Collection Paris • The Future of Chic • "
    },
    "arizona": {
        hero: {
            titleMain: "Desert",
            titleItalic: "Dream",
            subtitle: "Arizona Collection",
            description: "A dialogue between scorched earth and digital horizons. High-tech utility meets ancestral silence.",
            image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop"
        },
        gifTitle: {
            text: "DESERT",
            gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDQ3YXg5M2h6YmswenJqZ3Q1eXJqZ3Q1eXJqZ3Q1eXJqZ3Q1eXJqZ3Q1JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/l41lTfuxV3WoxO64w/giphy.gif"
        },
        narrative: {
            label: "Spirit",
            heading: "The",
            italicWord: "Cactus",
            headingSuffix: "& The Cloud.",
            content: "Inspired by the organic architecture of the Saguaro and the infinite connectivity of the modern sky, this collection redefines Southwestern luxury.",
            image: "https://images.unsplash.com/photo-1550592704-6c76defa9985?q=80&w=1200&auto=format&fit=crop",
            badgeText: "Desert Artisan Series",
            badgeValue: "04 // 50"
        },
        quote: {
            text: "\"The desert, when the sun comes up... I couldn't tell where heaven stopped and the earth began.\"",
            author: "Tom Cloud",
            image: "https://images.unsplash.com/photo-1506308023041-115ac5903561?q=80&w=2000&auto=format&fit=crop"
        },
        marqueeText: "Arizona 🌵 • Phoenix • tsgabrielle® • High Tech Desert • Rebirth • "
    },
    "cosmic": {
        hero: {
            titleMain: "Édition",
            titleItalic: "Spatiale",
            subtitle: "Cosmic Drop",
            description: "Out-of-this-world textures and astronomical detail. For those who wander between stars.",
            image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2000&auto=format&fit=crop"
        },
        gifTitle: {
            text: "COSMIC",
            gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmJqZ3Q1eXJqZ3Q1eXJqZ3Q1eXJqZ3Q1eXJqZ3Q1eXJqZ3Q1eXJqZ3Q1JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKSjP3K396N3F0W/giphy.gif"
        },
        narrative: {
            label: "Nebula",
            heading: "Beyond",
            italicWord: "Gravity",
            headingSuffix: "& Light.",
            content: "Using reflective foils and weightless fabrics, this collection captures the ethereal nature of the deep universe.",
            image: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?q=80&w=1200&auto=format&fit=crop",
            badgeText: "Astro Grade",
            badgeValue: "Alpha // Omega"
        },
        quote: {
            text: "\"Astronomy compels the soul to look upwards.\"",
            author: "Plato",
            image: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=2000&auto=format&fit=crop"
        },
        marqueeText: "Cosmic Edition • Stellar Flow • tsgabrielle® • Star Walkers • "
    },
    "iridescence": {
        hero: {
            titleMain: "Flow of",
            titleItalic: "Light",
            subtitle: "Iridescence Collection",
            description: "Capturing the shifting spectrum of the morning mist on glass. Shimmering, fluid, eternal.",
            image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop"
        },
        gifTitle: {
            text: "GLOW",
            gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJqZ3Q1eXJqZ3Q1eXJqZ3Q1eXJqZ3Q1eXJqZ3Q1eXJqZ3Q1JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKs9yD2dF7pP5k4/giphy.gif"
        },
        narrative: {
            label: "Prism",
            heading: "The",
            italicWord: "Spectrum",
            headingSuffix: "of Identity.",
            content: "Iridescence is more than a color—it's a refusal to be defined by a single point of view. It's the art of refraction.",
            image: "https://images.unsplash.com/photo-1549493527-134cca013146?q=80&w=1200&auto=format&fit=crop",
            badgeText: "Prisma Piece",
            badgeValue: "01 // ∞"
        },
        quote: {
            text: "\"In order to see the rainbow, you must first endure the rain.\"",
            author: "Dolly Parton",
            image: "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2000&auto=format&fit=crop"
        },
        marqueeText: "Iridescence • Shimmer • tsgabrielle® • Fluid Light • Spectrum • "
    },
    "made-in-usa": {
        hero: {
            titleMain: "Crafted in",
            titleItalic: "Freedom",
            subtitle: "Made in USA",
            description: "Celebrating the artisanal legacy and local manufacturing of the American Southwest.",
            image: "https://images.unsplash.com/photo-1508433957232-31003118f394?q=80&w=2000&auto=format&fit=crop"
        },
        gifTitle: {
            text: "USA",
            gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJqZ3Q1eXJqZ3Q1eXJqZ3Q1eXJqZ3Q1eXJqZ3Q1eXJqZ3Q1JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKs9yD2dF7pP5k4/giphy.gif"
        },
        narrative: {
            label: "Legacy",
            heading: "From",
            italicWord: "American",
            headingSuffix: "Soil.",
            content: "Every stitch tells a story of local resilience and high-fidelity production. We build where we breathe.",
            image: "https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2?q=80&w=1200&auto=format&fit=crop",
            badgeText: "US Heritage",
            badgeValue: "Est. 2026"
        },
        quote: {
            text: "\"Everything that is really great and inspiring is created by the individual who can labor in freedom.\"",
            author: "Albert Einstein",
            image: "https://images.unsplash.com/photo-1549493325-134cca013146?q=80&w=2000&auto=format&fit=crop"
        },
        marqueeText: "Made in USA • Phoenix • tsgabrielle® • Artisanal • Local • "
    }
    // More can be added here...
};

export const DEFAULT_STORY = (slug: string): StoryData => ({
    hero: {
        titleMain: "The",
        titleItalic: slug.charAt(0).toUpperCase() + slug.slice(1),
        subtitle: "Official Collection",
        description: `Explore the unique aesthetics and curated pieces of the ${slug} collection.`,
        image: "https://images.unsplash.com/photo-1549493527-134cca013146?q=80&w=2000&auto=format&fit=crop"
    },
    gifTitle: {
        text: slug.toUpperCase(),
        gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJqZ3Q1eXJqZ3Q1eXJqZ3Q1eXJqZ3Q1eXJqZ3Q1eXJqZ3Q1JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKs9yD2dF7pP5k4/giphy.gif"
    },
    narrative: {
        label: "Archive",
        heading: "A New",
        italicWord: "Perspective",
        headingSuffix: "in Motion.",
        content: `The ${slug} series represents a milestone in the tsgabrielle® narrative, blending artisanal craft with modern digital workflows.`,
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
        badgeText: "Curated Edition",
        badgeValue: "2026"
    },
    quote: {
        text: `"Style is a way to say who you are without having to speak."`,
        author: "Rachel Zoe",
        image: "https://images.unsplash.com/photo-1493134795711-470dd148c41d?q=80&w=2000&auto=format&fit=crop"
    },
    marqueeText: `${slug} • Phoenix • tsgabrielle® • High Fidelity • Rebirth • `
});
