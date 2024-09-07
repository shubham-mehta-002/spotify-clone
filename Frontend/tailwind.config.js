/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily:{
        poppins:["poppins","sans-serif"]
      },
      backgroundColor:{
        customLightBlack:'rgba(18,18,18)',
        customGray:'rgb(42,42,42)',
        customOpacityBlackBg:'rgba(0,0,0,0.25)',
        customSpotifyGreen:'rgb(30,220,100)'
      },
      colors:{
        customGray:'rgb(136,136,136)',
        customSpotifyGreen:'rgb(30,220,100)'
      },
      height:{
        "1/10":"10%",
        "9/10":"90%",
        "3/20":"15%",
        "1/5":"20%"
        
      },
      active:{
        "text":"white",
        "scale":"105"
      }
    },
  },
  plugins: [],
}

