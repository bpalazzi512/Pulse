/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        gabarito: ['Gabarito', 'sans-serif'],
        sans: ['Gabarito', 'sans-serif'] // Fallback to sans-serif
      },
      colors: {
        "primary-red": "#D53F3F",
        "primary-orange": "#FEA746"
      },
    },
  },
  plugins: [],
}

