/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#16302B',
          light: '#1F433C',
          dark: '#0E211D',
        },
        paper: {
          DEFAULT: '#FBF7EF',
          dim: '#F2ECDE',
        },
        brass: {
          DEFAULT: '#B8863B',
          light: '#D3A868',
        },
        rust: {
          DEFAULT: '#A6432A',
          light: '#C25B3F',
        },
        sage: '#CFE0D6',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      backgroundImage: {
        'perf-h': 'radial-gradient(circle, transparent 0, transparent 3px, var(--tw-gradient-stops) 3px)',
      },
      boxShadow: {
        stub: '0 1px 0 rgba(22,48,43,0.08), 0 12px 24px -12px rgba(22,48,43,0.25)',
      },
      borderRadius: {
        stub: '18px',
      },
    },
  },
  plugins: [],
}
