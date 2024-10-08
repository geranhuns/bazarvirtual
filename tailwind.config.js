/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/img/**/*.{js,ts,jsx,tsx,mdx}", // Nueva ruta agregada
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        landing1: "url('/img/Opcion_1.jpg')",
        landing2: "url('/img/Landing2.png')",
        ecoShopping: "url('/img/EcoShopping.png')",
        panaBeer: "url('/img/BeerPana.png')",
        teamPana: "url('/img/TeamPana.png')",
        safePlatform: "url('/img/Safe.png')",
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

        customGreen: "#2C4440",
        "patina-50": "#F5F8F7",
        "patina-100": "#DDEAE6",
        "patina-200": "#BBD4CD",
        "patina-500": "#598C83",
        "patina-900": "#283937",
        "color-text": "#FFF",
        "color-btnUnete": "#99461A",
        KombuGreen: "#4A532F",
        facebook: "#1877F2",
        customBlue: "#3E635E",
        "raw-sienna-custom": "#DD8E64",
        "form-newDate-green": "#76854C",
        instagram: {
          pink: "#E4405F",
          purple: "#C13584",
          gradient: "linear-gradient(45deg, #833AB4, #E1306C, #F77737)",
        },
        tiktok: {
          turquoise: "#69C9D0",
          red: "#EE1D52",
          gradient: "linear-gradient(45deg, #69C9D0, #EE1D52)",
        },
      },
      screens: {
        custom: "1120px",
      },

      height: {
        custom1: "575px",
        custom2: "495px",
        "85vh": "85vh",
        "65vh": "65vh",
        "95vh": "95vh",
      },
      fontFamily: {
        sans: ["var(--font-noto )"],
      },
      fontSize: {
        // sm: "0.8rem",
        // base: "1rem",
        "20px": "1.25rem",
        "28px": "1.75rem",
        "32px": "2rem",
        "40px": "2.5rem",
        "48px": "3rem",
        "60px": "3.75rem",
        "68px": "4.25rem",
        // custom1: "40px",
        // custom2: "32px",
      },
      lineHeight: {
        custom: "62.4px",
        custom2: "25px",
        custom3: "45px",
        custom4: "41.6px",
      },
      borderRadius: {
        custom1: "56px",
        custom2: "100%",
      },
    },
  },
  plugins: [],
};
