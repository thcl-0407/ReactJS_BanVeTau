module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        646: "#D3A646",
        main: "#016AFF"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}