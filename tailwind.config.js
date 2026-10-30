import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    fontFamily: {
      sans: ["Inter Variable", "Helvetica", "Arial", "sans-serif"],
    },
    extend: {
      screens: {
        xs: "475px",
      },
    },
  },
  darkMode: "selector",
  plugins: [forms],
};

export default config;
