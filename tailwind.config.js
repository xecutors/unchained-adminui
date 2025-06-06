module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/modules/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'blue-ribbon': {
          50: '#f7f7fe',
          100: '#eff0fe',
          200: '#d8d9fc',
          300: '#c1c2f9',
          400: '#9294f5',
          500: '#6366f1',
          600: '#595cd9',
          700: '#4a4db5',
          800: '#3b3d91',
          900: '#313276',
        },
      },
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
