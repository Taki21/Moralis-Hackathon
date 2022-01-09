module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'tahiti': {
        100: '#cffafe',
        200: '#a5f3fc',
        300: '#67e8f9',
        400: '#22d3ee',
        500: '#06b6d4',
        600: '#0891b2',
        700: '#0e7490',
        800: '#155e75',
        900: '#164e63',
      },
      'beige': {
        100: '#F6F7DD',
        200: '#DECFAC',
        300: '#C9AD7F',
        400: '#B5926D',
        500: '#A67C5B',
        600: '#E1B78D'
      }
    },
    extend: {
      backgroundImage: {
        'intro-bg': "url('../public/bg.png')",
      }
    },
  },
  plugins: [],
}