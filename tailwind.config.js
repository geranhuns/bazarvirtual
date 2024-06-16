/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "green-bazar": "#7E914F",
        "yellow-bazar": "#FEC969",
        "orange-bazar": "#ED974F",
        "beige-bazar": "#FFF8DC",
        "raw-sienna-50": "#FCF6F0",
        "raw-sienna-100": "#F8EADC",
        "raw-sienna-200": "#F0D2B8",
        "raw-sienna-300": "#E6B38B",
        "raw-sienna-400": "#DA8D5D",
        "raw-sienna-500": "#D37340",
        "raw-sienna-800": "#833A29",
        "raw-sienna-900": "#6A3224",
        "raw-sienna-950": "#391711",
        "avocado-200": "#D4DBBB",
        "avocado-500": "#76854C",
        "avocado-900": "#373E29",
        "patina-50": "#F5F8F7",
        "patina-100": "#DDEAE6",
        "patina-200": "#BBD4CD",
        "patina-500": "#598C83",
        "patina-900": "#283937",
      },
    },
  },
  plugins: [],
};
