import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // Update Store Brand Colors
                'update-purple': '#a932bd',
                'update-bg': '#e7e7e7',
                'update-text': '#1a1a1a',
                'update-muted': '#888888',
                'update-surface': '#ffffff',
                // Legacy support (keeping for now to avoid breakages)
                primary: '#bf12de',
                "primary-dark": "#900ea8",
                "bg-light": "#ffffff",
                "bg-dark": "#050406",
                "text-dark": "#1a1a1a",
                "text-light": "#e7e7e7",
                "accent-purple": "#a932bd",
            },
            fontFamily: {
                sans: ["Lato", "sans-serif"],
                lato: ["Lato", "sans-serif"],
            },
            fontWeight: {
                light: "300",
            },
            borderRadius: {
                DEFAULT: '16px', // No hard corners anywhere - min 16px
                sm: '8px',
                '2xl': '24px',
            },
            backgroundImage: {
                'holo-gradient': 'linear-gradient(135deg, #ff006e, #a932bd, #3a86ff, #06ffa5, #ffbe0b)',
                'holo-border': 'linear-gradient(135deg, #a932bd, #667eea, #f093fb, #a932bd)',
            },
            animation: {
                "fade-in-up": "fade-in-up 0.35s ease-out forwards",
                "holographic": "holographic-motion 12s linear infinite",
                "float": "float 6s ease-in-out infinite",
                "shimmer": "shimmer 2s linear infinite",
            },
            keyframes: {
                "fade-in-up": {
                    "0%": { opacity: "0", transform: "translateY(10px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "holographic-motion": {
                    "0%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                    "100%": { backgroundPosition: "0% 50%" },
                },
                "float": {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                "shimmer": {
                    "0%": { backgroundPosition: "200% 0" },
                    "100%": { backgroundPosition: "-200% 0" },
                }
            },
        },
    },
    plugins: [],
}
export default config

