import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      colors: {
        retro: {
          bg: "#0d1017",
          panel: "#161b24",
          panelHover: "#1f2633",
          border: "#000000",
          green: "#22c55e",
          lime: "#84cc16",
          cyan: "#06b6d4",
          amber: "#f59e0b",
          red: "#ef4444",
          purple: "#a855f7",
          muted: "#94a3b8",
        },
      },
      boxShadow: {
        hard: "4px 4px 0px 0px #000000",
        "hard-sm": "2px 2px 0px 0px #000000",
        "hard-lg": "6px 6px 0px 0px #000000",
        "hard-cyan": "4px 4px 0px 0px #06b6d4",
        "hard-green": "4px 4px 0px 0px #22c55e",
        "hard-amber": "4px 4px 0px 0px #f59e0b",
        "hard-red": "4px 4px 0px 0px #ef4444",
      },
      animation: {
        "blink-slow": "blink 1.2s steps(2, start) infinite",
        "pulse-fast": "pulse 0.8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
