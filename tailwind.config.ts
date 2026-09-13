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
    },
  },
  plugins: [],
};

export default config;
