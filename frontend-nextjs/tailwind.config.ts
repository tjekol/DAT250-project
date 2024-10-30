import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3490dc", // Set your desired primary color
        "primary-foreground": "#ffffff", // Set your desired text color for primary button
        background: "#f0f0f0", // Global background color
        ring: "#3490dc", // Ring color for focus states
        secondary: "#ffed4a", // Optional secondary color
        "secondary-foreground": "#1a202c", // Text color for secondary buttons
        destructive: "#e3342f", // Optional color for destructive actions
        "destructive-foreground": "#ffffff", // Text color for destructive actions
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
