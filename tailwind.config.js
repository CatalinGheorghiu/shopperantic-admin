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
        primary: 'rgb(77, 124, 15)',
        highlight: '#eae8fb',
        error: 'rgb(220, 38, 38)'
      },
      boxShadow: {
        'border-bottom': '0rem 0.0625rem 0.0625rem #1f21241a'
      }
    }
  },
  plugins: []
};
