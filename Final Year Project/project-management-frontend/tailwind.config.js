/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
              "light",
              "dark",
              {
                tol: {
                  "primary": "#332288",
                  "secondary": "#AA4499",
                  "accent": "#CC6677",
                  "base-100": "#DDCC77",
                  "info": "#88CCEE",
                  "success": "#117733",
                  "warning": "#DDCC77",
                  "error": "#882255",
                },
              },
              {
                wong: {
                  "primary": "#E69F00",
                  "secondary": "#56B4E9",
                  "accent": "#56B4E9",
                  "base-100": "#000000",
                  "info": "#0072B2",
                  "success": "#009E73",
                  "warning": "#D55E00",
                  "error": "#CC79A7"
                },
              }
    ]
  }
}

// hex codes for the Tol and Wong themes were found at: https://davidmathlogic.com/colorblind/#%23D81B60-%231E88E5-%23FFC107-%23004D40