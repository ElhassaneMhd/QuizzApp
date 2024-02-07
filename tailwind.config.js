/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#021024",
        main: "#72D6EE",
        second: "#2DA0FA",
        light: "#A1CFFF",
        light2: "#E7F7EC",
        text: "#04235A",
        textSecond: "#8e918f",
      },
    },
  },
  plugins: [],
};

