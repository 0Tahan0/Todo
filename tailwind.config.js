/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: ["selector", '[data-mode="dark"]'],
  theme: {
    extend: {
      colors: {
        dark: "#222",
        primary: "var(--mainColor)",
      },
    },
  },
  plugins: [],
};
