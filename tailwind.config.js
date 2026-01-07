/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary backgrounds
        parchment: {
          DEFAULT: '#F5E6D3',
          dark: '#E8D4B8',
        },
        // Character/Adventure colors
        adventure: {
          red: '#E63946',
          blue: '#457B9D',
          green: '#06A77D',
          yellow: '#FFB703',
        },
        // Supporting colors
        dragon: '#FF6B35',
        castle: '#6C757D',
        forest: '#2D6A4F',
        sky: '#90D5FF',
        cloud: '#FFFCF9',
        // Text colors
        text: {
          primary: '#2B2D42',
          secondary: '#5A5C6E',
          light: '#8D8F9E',
        },
        // Border colors
        border: {
          dark: '#3D2E1F',
          medium: '#8B7355',
          light: '#D4C4AE',
        },
      },
      fontFamily: {
        heading: ['var(--font-fredoka)', 'Comic Sans MS', 'cursive'],
        body: ['var(--font-nunito)', 'Segoe UI', 'sans-serif'],
        special: ['var(--font-baloo)', 'var(--font-fredoka)', 'cursive'],
      },
      fontSize: {
        'xs': ['14px', { lineHeight: '1.5' }],
        'sm': ['16px', { lineHeight: '1.5' }],
        'base': ['18px', { lineHeight: '1.6' }],
        'lg': ['22px', { lineHeight: '1.5' }],
        'xl': ['28px', { lineHeight: '1.3' }],
        '2xl': ['36px', { lineHeight: '1.2' }],
        '3xl': ['48px', { lineHeight: '1.1' }],
        '4xl': ['64px', { lineHeight: '1.1' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderWidth: {
        '3': '3px',
        '5': '5px',
      },
      borderRadius: {
        'xl': '1.5rem',
        '2xl': '2rem',
        '3xl': '2.5rem',
      },
      boxShadow: {
        // Storybook-style shadows
        'outline': '0 0 0 4px #3D2E1F',
        'sm': '0 2px 0 0 #3D2E1F, 0 0 0 2px #3D2E1F',
        'DEFAULT': '0 4px 0 0 #3D2E1F, 0 0 0 3px #3D2E1F',
        'md': '0 4px 0 0 #3D2E1F, 0 0 0 3px #3D2E1F',
        'lg': '0 6px 0 0 #3D2E1F, 0 0 0 4px #3D2E1F',
        'xl': '0 8px 0 0 #3D2E1F, 0 0 0 4px #3D2E1F',
        'pressed': '0 0 0 3px #3D2E1F, inset 0 2px 4px rgba(0, 0, 0, 0.1)',
        'float': '0 8px 16px rgba(0, 0, 0, 0.15), 0 0 0 4px #3D2E1F',
        'inner': 'inset 0 2px 6px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'bounce-gentle': 'bounce-gentle 1s ease-in-out infinite',
        'bounce-slow': 'bounce 2s ease-in-out infinite',
        'wiggle': 'wiggle 0.5s ease-in-out',
        'celebrate': 'celebrate 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'dice-roll': 'dice-roll 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'fadeIn': 'fadeIn 0.3s ease-in',
      },
      keyframes: {
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'wiggle': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-3deg)' },
          '75%': { transform: 'rotate(3deg)' },
        },
        'celebrate': {
          '0%': { transform: 'scale(1) rotate(0deg)' },
          '25%': { transform: 'scale(1.2) rotate(-5deg)' },
          '50%': { transform: 'scale(1.3) rotate(5deg)' },
          '75%': { transform: 'scale(1.2) rotate(-3deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)' },
        },
        'heartbeat': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        'dice-roll': {
          '0%, 100%': { transform: 'rotate(0deg) scale(1)' },
          '25%': { transform: 'rotate(90deg) scale(1.1)' },
          '50%': { transform: 'rotate(180deg) scale(1.2)' },
          '75%': { transform: 'rotate(270deg) scale(1.1)' },
        },
        'fadeIn': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
