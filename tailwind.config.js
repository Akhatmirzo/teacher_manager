/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", flowbite.content()],
  theme: {
    extend: {
      boxShadow:{
        'blade': "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"
      }
    },
    screens: {
      xl: { min: "1279px" },
      // => @media (min-width: 1279px) { ... }

      lg: { min: "1023px" },
      // => @media (min-width: 1023px) { ... }

      md: { min: "767px" },
      // => @media (min-width: 767px) { ... }

      sm: { min: "540px" },
      // => @media (min-width: 639px) { ... }

      'myxl': { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      'mylg': { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      'mymd': { max: "767px" },
      // => @media (max-width: 767px) { ... }

      'mysm': { max: "540px" },
      // => @media (max-width: 639px) { ... }
    },
  },
  plugins: [flowbite.plugin()],
};
