/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-rose': '#C73E62',          // Main brand color, vibrant and strong
        'rose-accent': '#E6A0B3',        // Lighter, for highlights and accents
        'lavender-blush': '#FFF0F5',    // Very light pink, for backgrounds
        'charcoal': '#333333',            // Main text and dark elements
        'pastel-pink': '#FFD1DC',
        'pastel-purple': '#E0B0FF',
        'pastel-mint': '#B0E0E6',
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
      boxShadow: {
        'soft': '0 4px 15px rgba(230, 160, 179, 0.1)',
        'elegant': '0 10px 40px rgba(100, 50, 60, 0.15)',
        'glow': '0 0 25px rgba(199, 62, 98, 0.5)',
      }
    },
  },
  plugins: [],
}
