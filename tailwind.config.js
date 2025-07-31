/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "./node_modules/@ionic/**/*.{js}"
  ],
  theme: {
    extend: {
      colors: {
        ionic: {
          primary: '#3880ff',
          secondary: '#3dc2ff',
          tertiary: '#5260ff',
          success: '#2dd36f',
          warning: '#ffc409',
          danger: '#eb445a',
          medium: '#92949c',
          light: '#f4f5f8',
          dark: '#222428',
        }
      }
    },
  },
  plugins: [],
}