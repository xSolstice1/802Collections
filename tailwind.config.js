/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Simplified 2-color theme
        '802': {
          DEFAULT: '#44D62C',
          hover: '#3bc428',
          light: '#6ae04a',
          dark: '#37ad24',
        },
        'black': {
          DEFAULT: '#000000',
          900: '#0a0a0a',
          800: '#111111',
          700: '#1a1a1a',
          600: '#222222',
          500: '#333333',
          400: '#444444',
          300: '#555555',
          200: '#888888',
          100: '#cccccc',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-in': 'slideIn 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-in',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(68,214,44,0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(68,214,44,0.6), 0 0 30px rgba(68,214,44,0.4)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      boxShadow: {
        '802': '0 0 10px rgba(68,214,44,0.3), 0 0 20px rgba(68,214,44,0.2)',
        '802-lg': '0 0 15px rgba(68,214,44,0.4), 0 0 30px rgba(68,214,44,0.3), 0 0 45px rgba(68,214,44,0.2)',
        'inner-glow': 'inset 0 0 10px rgba(68,214,44,0.1)',
      },
    },
  },
  plugins: [],
}