module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  important: true,
  theme: {
    extend: {
      fontFamily: {
        sans: ['Libre Baskerville', 'serif'],
        header: ['Courgette', 'cursive'],
      },
      colors: {
        burntOrange: '#EE4E34',
        peach: '#fcedda',
        grey: '#5e5e5e',
      },
      screens: {
        xs: '380px',
      },
    },
  },
  plugins: [],
};
