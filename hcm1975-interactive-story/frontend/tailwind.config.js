/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      colors: {
        primary: {
          50:  '#fdf8ee',
          100: '#f9edce',
          200: '#f3d99d',
          300: '#ebbd64',
          400: '#e3a035',
          500: '#d4831d',
          600: '#b96315',
          700: '#9a4714',
          800: '#7e3917',
          900: '#693017',
        },
        dark: {
          900: '#0a0a0f',
          800: '#12121a',
          700: '#1a1a28',
          600: '#252535',
          500: '#303045',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
