import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        }
      },
      fontFamily: {
        sans: ["var(--font-orbitron)", "Rajdhani", "Segoe UI", "Arial", "sans-serif"]
      },
      boxShadow: {
        cyan: "0 0 16px rgba(0, 246, 255, .7), 0 0 42px rgba(0, 246, 255, .22)",
        magenta: "0 0 18px rgba(255, 0, 223, .7), 0 0 44px rgba(255, 0, 223, .24)",
        "card-hover": "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 246, 255, 0.12)",
      },
      keyframes: {
        // Ambient background orbs
        "orb-float-1": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)", opacity: "0.18" },
          "33%": { transform: "translate(60px, -40px) scale(1.08)", opacity: "0.22" },
          "66%": { transform: "translate(-30px, 50px) scale(0.95)", opacity: "0.15" },
        },
        "orb-float-2": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)", opacity: "0.14" },
          "40%": { transform: "translate(-50px, 30px) scale(1.05)", opacity: "0.2" },
          "70%": { transform: "translate(40px, -60px) scale(0.92)", opacity: "0.12" },
        },
        // Shimmer for skeleton
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        // Breathing glow for important elements
        "glow-breathe": {
          "0%, 100%": { opacity: "0.6", boxShadow: "0 0 8px rgba(0,246,255,0.3)" },
          "50%": { opacity: "1", boxShadow: "0 0 20px rgba(0,246,255,0.6), 0 0 40px rgba(0,246,255,0.2)" },
        },
        // Live badge dot
        "dot-breathe": {
          "0%, 100%": { opacity: "0.6", transform: "scale(0.85)" },
          "50%": { opacity: "1", transform: "scale(1.15)" },
        },
        // Scanline sweep
        "scan-sweep": {
          "0%": { top: "-2px", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { top: "100%", opacity: "0" },
        },
        // Fade up (used by framer but also as utility)
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // Slide in from left
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        // Counter bar fill
        "bar-fill": {
          "0%": { width: "0%" },
          "100%": { width: "var(--bar-width, 100%)" },
        },
        // Underline grow (tab indicator)
        "underline-grow": {
          "0%": { transform: "scaleX(0)", transformOrigin: "left" },
          "100%": { transform: "scaleX(1)", transformOrigin: "left" },
        },
      },
      animation: {
        "orb-float-1": "orb-float-1 18s ease-in-out infinite",
        "orb-float-2": "orb-float-2 24s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "glow-breathe": "glow-breathe 3s ease-in-out infinite",
        "dot-breathe": "dot-breathe 2.5s ease-in-out infinite",
        "scan-sweep": "scan-sweep 4s ease-in-out infinite",
        "fade-up": "fade-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-in-left": "slide-in-left 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "bar-fill": "bar-fill 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "underline-grow": "underline-grow 0.25s ease forwards",
      },
      transitionTimingFunction: {
        "spring": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    }
  },
  plugins: []
};

export default config;
