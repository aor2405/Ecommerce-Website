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
        header: ['Orbitron', 'sans-serif'],
        paragraph: ['Roboto Mono', 'monospace'],
        paragraphHeading: ['Space Mono', 'monospace'],
      },
      colors: {
        burntOrange: '#EE4E34',
        peach: '#fcedda',
        grey: '#5e5e5e',
        background: 'bg-gradient-to-tl from-gray-700 via-gray-900 to-black',
      },
      screens: {
        // xs: '440px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
  variants: {
    display: ['group-hover'],
  },
};
