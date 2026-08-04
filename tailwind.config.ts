import type { Config } from "tailwindcss";

// Tailwind v4: design tokens are defined via @theme {} in app/globals.css.
// This file is kept only for the content paths used by the v4 PostCSS plugin.
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./data/**/*.{js,ts}",
  ],
};

export default config;
