import type { Config } from 'tailwindcss';

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-quicksand)', 'Quicksand', 'sans-serif'],
        quicksand: ['var(--font-quicksand)', 'Quicksand', 'sans-serif'],
        secondary: ['var(--font-quicksand)', 'Quicksand', 'sans-serif'],
      },
      colors: {
        ink: '#0f172a',
        paper: '#f8fafc',
        accent: '#f97316',
      },
      boxShadow: {
        glow: '0 24px 80px -24px rgba(249, 115, 22, 0.45)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.22s ease-out',
        'accordion-up': 'accordion-up 0.18s ease-out',
      },
    },
  },
  plugins: [],
};

export default config;
