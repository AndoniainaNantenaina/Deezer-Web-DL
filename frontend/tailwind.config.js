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
        martian: ["Martian", "monospace"],
        roboto: ["Roboto", "monospace"],
      },
      colors: {
        "purple-primary": "#713ABE",
        "purple-secondary": "#5B0888",
        "purple-gray": "#9D76C1",
        "gray-light": "#E5CFF7",
      }
    },
  },
  plugins: [],
}

