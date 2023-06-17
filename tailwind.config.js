/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        'bg': '#f8f8f8'
      }
    },
    container: {
      center: true,
      padding: '1.2rem',
    }
  },
  plugins: [],
}