import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "24px", md: "28px" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        bg: "#f6f5f2",
        "bg-alt": "#eeece6",
        "bg-steel": "#e3e5e8",
        surface: "#ffffff",
        line: "#d6d3cc",
        "line-strong": "#b9b5ad",
        ink: "#1a1f2b",
        "ink-soft": "#3a4150",
        muted: "#6b7280",
        navy: "#102a43",
        "navy-2": "#243b53",
        "steel-blue": "#486581",
        accent: "#c2410c",
        "accent-soft": "#ea580c",
        ok: "#2f6f4f",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-barlow)", "Barlow Condensed", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      maxWidth: { container: "1280px" },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "none" },
        },
      },
      animation: {
        "fade-up": "fade-up .7s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;
