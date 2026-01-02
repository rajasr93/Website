/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: "#00ff9d",
        // Luna Blue Palette
        "luna-blue-dark": "#0058EE",
        "luna-blue-mid": "#3593FF",
        "luna-blue-light": "#288EFF",
        "xp-beige": "#ECE9D8",
        "xp-blue-select": "#316AC5",
        "taskbar-start": "#245DDA",
        "taskbar-end": "#1841B6",
      },
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
        sans: ["Tahoma", "Verdana", "sans-serif"], // XP defaults
        dos: ["Fixedsys", "monospace"], // For Terminal
      },
      boxShadow: {
        "xp-window": "4px 4px 12px -2px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
}
