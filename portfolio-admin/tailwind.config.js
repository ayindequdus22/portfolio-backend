/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      colors: {
      }, 
      screens: {
        'max-mdLap': { 'max': '996px' },
        'max-tab': { 'max': '778px' },
        'max-mdPhone': { 'max': '550px' },
        'max-phone': { 'max': '426px' },
      }
    },
  },
  plugins: [],
}

