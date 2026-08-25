/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'arabic': ['Cairo', 'Noto Sans Arabic', 'Amiri', 'Arial', 'sans-serif'],
      },
      colors: {
        'football': {
          'green': '#00A651',
          'dark': '#1a472a',
          'light': '#e8f5e8'
        }
      }
    },
  },
  plugins: [],
}