/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        mont: "Montserrat",
      },
      colors: {
        brand: {
          900: "#179c5e",
          800: "#1db46e",
          700: "#1dbf73",
        },
      },
    },
  },
  plugins: [],
};
