// Merge this into your existing tailwind.config.ts
// Only the `theme.extend` additions are shown — keep the rest of your config as-is.

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        plaster: "#ECE6D6",
        "plaster-deep": "#E2DAC5",
        ink: "#211F1A",
        "ink-soft": "#5B5748",
        cobalt: "#1F4E5F",
        "cobalt-deep": "#163A47",
        ochre: "#C08A3E",
        clay: "#B5573C",
        cream: "#FFFDF8",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-jakarta)", "sans-serif"],
      },
      borderRadius: {
        xl2: "28px",
      },
    },
  },
  plugins: [],
};

export default config;