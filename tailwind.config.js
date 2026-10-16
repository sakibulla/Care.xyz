/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF6B9D",
        secondary: "#4ECDC4",
        accent: "#FFD93D",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#FF6B9D",
          "secondary": "#4ECDC4",
          "accent": "#FFD93D",
          "neutral": "#2D3748",
          "base-100": "#FFFFFF",
          "base-200": "#FFF5F7",
          "base-300": "#F0F4F8",
          "info": "#6366F1",
          "success": "#10B981",
          "warning": "#F59E0B",
          "error": "#EF4444",
        },
      },
    ],
  },
};
