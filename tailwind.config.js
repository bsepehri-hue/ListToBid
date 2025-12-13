// tailwind.config.js
module.exports = {
  darkMode: 'class', // ✅ enables class-based dark mode
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
/* globals.css or tailwind.css */

/* Base fade-in */
.fade-in {
  @apply opacity-0 transition-opacity duration-700 ease-in-out;
}
.fade-in.show {
  @apply opacity-100;
}

/* Optional staggered delays */
.fade-delay-1 {
  transition-delay: 200ms;
}
.fade-delay-2 {
  transition-delay: 400ms;
}
.fade-delay-3 {
  transition-delay: 600ms;
}