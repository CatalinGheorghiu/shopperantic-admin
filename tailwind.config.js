/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5542F6',
        highlight: '#eae8fb'
      },
      boxShadow: {
        'border-bottom': '0rem 0.0625rem 0.0625rem #1f21241a'
      }
    }
  },
  plugins: []
};
