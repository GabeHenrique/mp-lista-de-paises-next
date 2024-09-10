import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        forestgreen: "var(--forest-green)",
        lightgreen: "var(--light-green)",
        salmon: "var(--salmon)",
        darksalmon: "var(--dark-salmon)",
      },
    },
  },
  plugins: [],
};
export default config;
