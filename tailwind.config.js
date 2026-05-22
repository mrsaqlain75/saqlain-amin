/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'retro-orange-1': '#ff6d00',
        'retro-orange-2': '#ff7900',
        'retro-orange-3': '#ff8500',
        'retro-orange-4': '#ff9100',
        'retro-orange-5': '#ff9e00',
        'retro-purple-1': '#240046',
        'retro-purple-2': '#3c096c',
        'retro-purple-3': '#5a189a',
        'retro-purple-4': '#7b2cbf',
        'retro-purple-5': '#9d4edd',
      },
      fontFamily: {
        'premium': ['"Playfair Display"', '"Cinema"', '"Orbitron"', 'serif'],
        'mono-premium': ['"Space Mono"', '"JetBrains Mono"', 'monospace'],
        'sans-premium': ['"Inter"', '"Montserrat"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'border-flow': 'borderFlow 3s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { textShadow: '0 0 20px rgba(255, 109, 0, 0.5)' },
          '50%': { textShadow: '0 0 40px rgba(255, 109, 0, 0.8)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        borderFlow: {
          '0%': { borderColor: '#ff6d00' },
          '33%': { borderColor: '#9d4edd' },
          '66%': { borderColor: '#ff9e00' },
          '100%': { borderColor: '#ff6d00' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      backgroundImage: {
        'retro-gradient': 'linear-gradient(135deg, #240046 0%, #5a189a 50%, #ff6d00 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(36, 0, 70, 0.8) 0%, rgba(90, 24, 154, 0.6) 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}