/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: false,

  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // already included in your config
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        allpac: "#0d5694", // ✅ Your custom deep blue
      },
    },
  },
  plugins: [],
};
