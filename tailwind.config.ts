import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        cwb: {
          dark: "#08090C",
          surface: "#101218",
          card: "#141720",
          border: "rgba(255, 255, 255, 0.08)",
          accent: "#D4AF37", // Metallic Champagne Gold
          accentLight: "#F3E5AB",
          accentDark: "#997A15",
          muted: "#8A91A5",
          highlight: "#6366F1", // Futuristic indigo
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        glow: {
          "0%": { opacity: "0.4", filter: "blur(20px)" },
          "100%": { opacity: "0.8", filter: "blur(30px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
