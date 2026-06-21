/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7c3aed',
        bg: '#0d1117',
        surface: '#161b22',
        border: '#30363d',
        textMain: '#c9d1d9',
        textMuted: '#8b949e',
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"DM Serif Display"', 'serif'],
      }
    },
  },
  plugins: [],
}
