/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bgBase: "#07080A",
        bgSurface: "#0E1015",
        bgElevated: "#161820",
        bgOverlay: "#1E2029",
        accentPrimary: "#C9A84C",
        accentGlow: "#E2B95A",
        accentMuted: "#8A6E2F",
        success: "#2DD4A7",
        warning: "#F5A623",
        danger: "#E8455A",
        info: "#4F9EFF",
        textPrimary: "#F0EDE6",
        textSecondary: "#8B8E99",
        textMuted: "#4A4D5A",
      },
      fontFamily: {
        display: ["Cormorant Garamond", "serif"],
        ui: ["Syne", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
      },
      boxShadow: {
        gold: "0 8px 40px rgba(201,168,76,0.12)",
      },
      backgroundImage: {
        hero: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(201,168,76,0.12) 0%, transparent 70%)",
        card: "linear-gradient(145deg, #161820 0%, #0E1015 100%)",
      },
    },
  },
  plugins: [],
};