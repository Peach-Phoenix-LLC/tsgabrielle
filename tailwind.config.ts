import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#a932bd",
          light: "#e7e7e7",
          bg: "#ffffff"
        },
        primary: "#a932bd",
        secondary: "#7f6783",
        "background-light": "#ffffff",
        "background-dark": "#1d131f",
        "accent-gray": "#e7e7e7",
        charcoal: "#161217",
        peach: "#f7bda0",
        phoenix: "#cb5c31",
        night: "#0f1720",
        champagne: "#f8f2e7"
      },
      boxShadow: {
        luxe: "0 12px 35px rgba(203,92,49,0.18)"
      },
      fontFamily: {
        sans: ["var(--font-lato)", "sans-serif"],
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-lato)", "sans-serif"]
      },
      keyframes: {
        liquid: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" }
        },
        iridescent: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        }
      },
      animation: {
        liquid: "liquid 8s ease-in-out infinite",
        iridescent: "iridescent 3s linear infinite",
        float: "float 6s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
