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
        peach: "#f7bda0",
        phoenix: "#cb5c31",
        night: "#0f1720",
        champagne: "#f8f2e7"
      },
      boxShadow: {
        luxe: "0 12px 35px rgba(203,92,49,0.18)"
      },
      fontFamily: {
        display: ["var(--font-cinzel)", "serif"],
        body: ["var(--font-jost)", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
