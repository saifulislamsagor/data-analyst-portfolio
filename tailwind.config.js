/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Lab-notebook style: deep dark charcoal backgrounds with amber/gold accents
        darkBg: '#0d0e12',
        panelBg: '#16181f',
        accentGold: '#d4af37',
        accentAmber: '#ffb300',
      }
    },
  },
  plugins: [],
}
