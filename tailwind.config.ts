import type { Config } from "tailwindcss";

export default {
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
        menuground : "var(--menu)",
        pcolor: "#7C7C7C",
        notiti: "#F24E1E",
        pmassage :"#E7E7E7"
      },
    },
  },
  plugins: [],
} satisfies Config;
