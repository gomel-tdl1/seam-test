import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      screens: {
        sm: '320px',
        md: '810px',
        lg: '1200px',
        xl: '1500px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      boxShadow: {
        "button": "4px 4px 8px #36363F"
      },
      colors: {
        background: "#FBFBFB",
        typography: {
          dark: "#353642",
          hover: "#4C4C5D",
          light: "#6A6B82",
          lightest: "#ffffff"
        },
        grey: {
          dark: "#96969f",
          middle: "#9E9EB4",
          light: "#E0E0E5"
        },
        green: {
          light: "#4ADE80"
        },
        red: {
          light: "#EF4444"
        },
        smartlock: {
          border: "#35353E",
          background: "#3B3B45",
          outline: "#56566E",
          gradientDarkSide: "#3A3A44",
          gradientLightSide: "#41414C"
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwindcss-border-image"),
  ],
};
export default config;
