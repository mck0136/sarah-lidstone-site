import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#FCFAF8",
        blush: "#DFAFB2",
        oxblood: "#6E2427",
        slate: "#263957",
        charcoal: "#222222",
        warmGray: "#E9E4E0",
        paper: "#FFFFFF"
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Inter", "Arial", "sans-serif"]
      },
      boxShadow: {
        editorial: "0 28px 80px rgba(38, 57, 87, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
