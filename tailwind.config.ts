import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        espresso: "#1A120D",
        coffee: "#3F281D",
        mocha: "#68442F",
        crema: "#E8D8C4",
        cream: "#EFE0CE",
        foam: "#FFF8ED",
        wood: "#B98B61",
        charcoal: "#0E0B09",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      boxShadow: {
        glow: "0 28px 80px rgba(31, 23, 18, 0.18)",
        card: "0 20px 60px rgba(91, 58, 41, 0.14)",
      },
    },
  },
  plugins: [],
};

export default config;
