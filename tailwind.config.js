// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          600: "#0d9488",
        },
        amber: {
          500: "#f59e0b",
        },
        emerald: {
          900: "#024c05", // your dashboard sidebar color
        },
        burgundy: {
          600: "#800020",
        },
      },
    },
  },
  plugins: [],
};