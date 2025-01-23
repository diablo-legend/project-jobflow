/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'system-ui', 'sans-serif'],
        unbounded: ['Unbounded', 'cursive'],
      },
      screens: {
        'xs': '375px',
      },
    },
  },
  plugins: [],
};