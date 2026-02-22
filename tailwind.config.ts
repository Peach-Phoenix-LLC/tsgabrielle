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
                DEFAULT: '2px',
                sm: '1px',
            },
            backgroundImage: {
                'holo-border': 'linear-gradient(135deg, #a932bd, #667eea, #f093fb, #a932bd)',
            },
            animation: {
                "fade-in-up": "fade-in-up 0.35s ease-out forwards",
                "holographic": "holographic-motion 12s linear infinite",
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
                }
            },
        },
    },
    plugins: [],
}
export default config

