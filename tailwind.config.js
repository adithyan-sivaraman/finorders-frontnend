/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        lato:'Lato',
        poppins:'Poppins',
        montserrat:'Montserrat',
        alegreya:'Alegreya Sans'
      },
    },
  },
  plugins: [],
}

