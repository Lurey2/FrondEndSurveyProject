/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {

    extend: {
      colors : {
        primary : '#495AF9',
        subTittle : '#7D8B98',
        bgPrimary : '#4285F4'
      },
      flex :{
        'middle' : '1 1 50%'
      },
      animation : {
        'appear-animation' : 'appear 0.888s linear forwards'
      },
      keyframes : {
        appear : {
          '0%' : {opacity : '0'},
          '100%' : {opacity : '1'}
        }
      }
    },
  },
  plugins: [],
}

