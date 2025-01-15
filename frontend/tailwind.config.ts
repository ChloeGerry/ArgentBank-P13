/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: "#6458F6",
        lightGrey: "#E0E6EE",
        darkGrey: "#2c3e50",
      },
    },
  },
  plugins: [],
};
