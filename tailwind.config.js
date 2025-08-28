/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './hb/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
    theme: {
      extend: {
        fontFamily: {
          title: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        },
      },
  },
  plugins: [],
}