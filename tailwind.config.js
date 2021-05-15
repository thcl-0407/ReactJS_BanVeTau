module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        646: "#D3A646",
        main: "#0091FF",
        mainFont: "#0355A6",
        872:"#BD8872",
        mainHover:"#006EDC"
      },
      minHeight: {
        screen: '85vh',
      },
      height:{ 
        120: "28rem"
      }
    },
  },
  variants: {
    extend: {
      tableLayout: ['hover', 'focus']
    },
  },
  plugins: [],
}