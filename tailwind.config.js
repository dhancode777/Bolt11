/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        base: 'rgb(var(--base) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        elevated: 'rgb(var(--elevated) / <alpha-value>)',
        strong: 'rgb(var(--strong) / <alpha-value>)',
        heading: 'rgb(var(--heading) / <alpha-value>)',
        content: 'rgb(var(--content) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        faint: 'rgb(var(--faint) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        glass: 'rgb(var(--glass) / <alpha-value>)',
        night: {
          950: '#04040B',
          900: '#080812',
          800: '#0D0D1F',
          700: '#141428',
        },
        ink: {
          900: '#0B0B1A',
          800: '#101024',
          700: '#181832',
          600: '#22224a',
        },
        violet: {
          glow: '#8B5CF6',
        },
        cyan: {
          neon: '#22D3EE',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 24s linear infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        float: 'floatY 7s ease-in-out infinite',
        marquee: 'marquee 30s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
