/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Named course colors — for use like `text-banking`, `bg-logistics`, etc.
        banking: "#21436E",
        logistics: "#4B5563",
        mining: "#166534",
        medical: "#991B1B",
        oilgas: "#EA580C",
        aviation: "#1E40AF",
        aesthetic: "#BE185D",
        legal: "#0D9488",
        hospitality: "#1E293B",
        cabin: "#1D4ED8",
        younggenius: "#7E22CE",
        customtrack: "#0D9488",
      },
      fontFamily: {
        'Segoe_UI': ['Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
}