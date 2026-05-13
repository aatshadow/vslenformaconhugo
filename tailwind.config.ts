import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        fire: {
          DEFAULT: '#FF4500',
          light: '#FF6B35',
          dark: '#E63E00',
          ember: '#FF8A4C',
        },
        slate: {
          50: '#F8F9FA',
          100: '#E4E7EB',
          200: '#CBD2D9',
          300: '#9AA5B1',
          400: '#7B8794',
          500: '#616E7C',
          600: '#52606D',
          700: '#3E4C59',
          800: '#2F3437',
          900: '#1A1F23',
          950: '#0F1419',
        },
        ink: '#08090A',
      },
      fontFamily: {
        display: ['Anton', 'Impact', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'fire-sm': '0 0 20px rgba(255, 69, 0, 0.35)',
        'fire-md': '0 0 40px rgba(255, 69, 0, 0.45)',
        'fire-lg': '0 0 80px rgba(255, 69, 0, 0.55)',
        'fire-xl': '0 0 120px rgba(255, 69, 0, 0.5)',
      },
      animation: {
        'shimmer': 'shimmer 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-fire': 'pulse-fire 2.5s ease-in-out infinite',
        'marquee': 'marquee 40s linear infinite',
        'marquee-reverse': 'marquee-reverse 40s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-fire': {
          '0%, 100%': { boxShadow: '0 0 30px rgba(255, 69, 0, 0.5)' },
          '50%': { boxShadow: '0 0 60px rgba(255, 69, 0, 0.8)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      backgroundImage: {
        'fire-gradient': 'linear-gradient(135deg, #FF6B35 0%, #FF4500 50%, #E63E00 100%)',
        'fire-radial': 'radial-gradient(ellipse at center, rgba(255, 69, 0, 0.25) 0%, transparent 70%)',
        'slate-radial': 'radial-gradient(ellipse at center, #2F3437 0%, #0F1419 70%)',
        'grid-pattern': 'linear-gradient(rgba(255, 69, 0, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 69, 0, 0.03) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};

export default config;
