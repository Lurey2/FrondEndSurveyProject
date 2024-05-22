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
        subTittle : 'hsl(210, 16%, 76%)',
        bgPrimary : '#4285F4',
        'background-gray' : "#F1F4F8",
        'border-gray': '#E2E8F0',
        'input-bg-gray' : '#F1F5F9',
        'text-title-color' :'#2D4864',
        'input-label-color' : '#98A7BB',
        'secondary' : 'rgba(0,0,0,0.6)'


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

