import daisyui from "daisyui";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          
"primary": "#f80080",
          
"secondary": "#00920f",
          
"accent": "#00a8ff",
          
"neutral": "#162d32",
          
"base-100": "#232b2a",
          
"info": "#0072c6",
          
"success": "#3a7d00",
          
"warning": "#f99900",
          
"error": "#fb075a",
          },
        },
      ],
    },
} satisfies Config;
