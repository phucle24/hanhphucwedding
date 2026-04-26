/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          300: '#f0d080',
          400: '#e8c050',
          500: '#d4af37',
          600: '#b8960c',
          700: '#9a7b0a',
        },
        blush: {
          50:  '#fdf5f7',
          100: '#fce8ee',
          200: '#f9d0dc',
          300: '#f4adc0',
          400: '#ec7d9b',
          500: '#e05578',
          600: '#cc3460',
        },
        cream: '#fdf8f0',
        parchment: '#faf3e0',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        script: ['"Dancing Script"', 'cursive'],
        sans: ['"Nunito"', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'petal-fall': 'petalFall linear infinite',
        'fade-in-up': 'fadeInUp 0.8s ease forwards',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        petalFall: {
          '0%':   { transform: 'translateY(-10vh) rotate(0deg)', opacity: '0.9' },
          '100%': { transform: 'translateY(110vh) rotate(720deg)', opacity: '0' },
        },
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
