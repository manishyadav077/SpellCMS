/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
       colors: {
        "dark-bg": "rgb(16, 23, 42)",
      },
    },
  },
  plugins: [],
};
