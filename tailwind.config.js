/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#FF6B9D", // Warm pink - caring and friendly
          "secondary": "#4ECDC4", // Turquoise - trust and calm
          "accent": "#FFD93D", // Sunny yellow - joy and energy
          "neutral": "#2D3748",
          "base-100": "#FFFFFF",
          "base-200": "#FFF5F7", // Soft pink tint
          "base-300": "#F0F4F8", // Light blue-gray
          "info": "#6366F1", // Indigo
          "success": "#10B981", // Green
          "warning": "#F59E0B", // Amber
          "error": "#EF4444", // Red
        },
      },
    ],
  },
};
