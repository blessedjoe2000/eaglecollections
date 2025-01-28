/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "main-purple": "#c8b6ff",
        "sharp-purple": "#7161ef",
        "main-pink": "#ff5d8f",
        "deep-pink": "#c30e59",
        "mid-pink": "#ffc8dd",
        "light-grey": "#f4f4f6",
        "sharp-pink": "#f72585",
        "main-red": "#dd0426",
        "dark-green": "#336b79",
        "light-green": "#25c7c0",
        "mid-green": "#31859b",
        "main-blue": "#006BFF",
        "dark-blue": "#01204e",
        "hover-blue": "#4158a6",
      },
      fontFamily: {
        muktaFont: ["Mukta", "sans-serif"],
        robotoFont: ["Roboto", "Rubik", "sans-serif"],
        josefinFont: ["Josefin", "Roboto", "sans-serif"],
        poppinsFont: ["Poppins", "Roboto", "sans-serif"],
        rubikFont: ["Rubik", "Poppins", "Roboto"],
      },
      keyframes: {
        pulseScale: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        pulseScale: "pulseScale 0.6s ease-in-out",
      },
    },
  },
  plugins: [],
};
