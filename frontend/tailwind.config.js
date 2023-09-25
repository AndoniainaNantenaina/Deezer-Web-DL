/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/*.tsx",
    "./src/pages/*.tsx",
    "./src/components/*.tsx",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      }
    },
  },
  plugins: [],
}

