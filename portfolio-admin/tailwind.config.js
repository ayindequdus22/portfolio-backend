/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}",],
  theme: {
    extend: {
      colors: {
        primary: '#007BFF',
        mytext: '#282938'
      }, fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
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
