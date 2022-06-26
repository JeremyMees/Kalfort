/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/*.{vue,js}', './layouts/*.{vue,js}', './components/**/*.{vue,js}', './plugins/*.{js,ts}'],
  darkMode: true,
  theme: {
    extend: {
      fontFamily: {
        title: ['Roboto Mono', 'sans-serif'],
        text: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
