/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      mobile:{'max' : "400px"},
      tablet:{'max' :  "768px"},
      // => @media (min-width: 768px) { ... }

      laptop: "768px",
      // => @media (min-width: 1024px) { ... }
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
