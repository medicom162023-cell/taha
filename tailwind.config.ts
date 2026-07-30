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
        primary: "#00406d",
        secondary: "#51c698",
      },
      fontFamily: {
        alexandria: ["var(--font-alexandria)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
