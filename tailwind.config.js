/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,elm}"],
  theme: {
    extend: {},
  },
  plugins: [
      require("@tailwindcss/forms")
  ],
}

