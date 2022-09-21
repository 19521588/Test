/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      spacing: {
        "5px": "5px",
        "15px": "15px",
        "20px": "20px",
        "25px": "25px",
        "25px": "25px",
        "49px": "49px",
        "6e": "6em",
        "12e": "12em",
      },
       colors:{
      buttonYellow:'#FFB400',
      color_Blue:'#00477D',
      textYellow:'#E6A100',

      primarygray:'#E2E7F1',
      primaryblue:'#00477D'

    }
    },
   
  },
  plugins: [],
};
