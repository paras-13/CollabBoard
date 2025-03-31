/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js, ts, tsx, jsx}"],
  theme: {
    extend: {
      spacing: {
        "5px": "5px",
        "30px": "30px",
      },
    },
  },
  plugins: [],
};
