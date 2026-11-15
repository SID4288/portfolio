/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#071A43',
        'navy-light': '#0F2B5C',
        royal: '#2859E8',
        'light-blue': '#EAF3FF',
        'soft-white': '#F8FAFF',
        'muted-blue': '#526B91',
        crimson: '#C8102E',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        devanagari: ['"Noto Serif Devanagari"', 'serif'],
      },
      fontSize: {
        'name': ['4.5rem', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'name-mobile': ['2.25rem', { lineHeight: '1.1' }],
        'h2': ['1.75rem', { lineHeight: '1.3' }],
        'body': ['1.125rem', { lineHeight: '1.6' }],
      },
      spacing: {
        '128': '32rem',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'scan': 'scan 12s linear infinite',
        'scroll-dot': 'scrollDot 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scan: {
          '0%': { transform: 'translateY(-40px)' },
          '66%': { transform: 'translateY(1000px)' },
          '100%': { transform: 'translateY(1000px)' },
        },
        scrollDot: {
          '0%': { top: '8px', opacity: '1' },
          '100%': { top: '26px', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
