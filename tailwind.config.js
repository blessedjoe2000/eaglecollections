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
        "light-pink": "#FFCFCF",
        "main-pink": "#ff5d8f",
        "sharp-pink": "#f72585",
        "deep-pink": "#c30e59",
        "light-grey": "#f4f4f6",
        "main-blue": "#01579b",
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
