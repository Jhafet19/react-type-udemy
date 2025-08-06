/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "header": "url('/bg.jpg')"
      },
      animation:{
        blink: 'blink 1s ease-in-out infinite'
      },
      keyframes:{

      }
    },
  },
  plugins: [],
}