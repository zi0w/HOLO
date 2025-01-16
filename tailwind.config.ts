import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        custom: "0px 4px 10px 0px rgba(0, 0, 0, 0.15)",
      },
      fontFamily: {
        gmarket: ["GmarketSansMedium"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          50: "#FFF4E5",
          100: "#FFE4CC",
          200: "#FFD1A3",
          300: "#FFB870",
          400: "#FF9E40",
          500: "#FF7600",
          600: "#E66800",
          700: "#CC5800",
          800: "#B24800",
          900: "#8F3600",
        },
        link: "#2889FF",
        base: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#EEEEEE",
          300: "#E0E0E0",
          400: "#BDBDBD",
          500: "#999E98",
          600: "#909090",
          700: "#616161",
          800: "#424242",
          900: "#222222",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
export default config;
