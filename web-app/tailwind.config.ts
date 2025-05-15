import type { Config } from "tailwindcss";
import withMT from "@material-tailwind/react/utils/withMT";
module.exports = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#a5d6a7",
          main: "#4caf50",
          dark: "#388e3c"
        },
        secondary: {
          light: "#ddd6fe",
          main: "#a78bfa",
          dark: "#7c3aed"
        },
        info: {
          light: "#bae6fd",
          main: "#38bdf8",
          dark: "#0284c7"
        },
        success: {
          light: "#bbf7d0",
          main: "#4ade80",
          dark: "#16a34a"
        },
        warning: {
          light: "#fde68a",
          main: "#fbbf24",
          dark: "#d97706"
        },
        error: {
          light: "#fecaca",
          main: "#f87171",
          dark: "#dc2626"
        },
        background: {
          default: {
            light: "#f1f1f1",
            dark: "#161C24"
          },
          card: {
            light: "#ffffff",
            dark: "#212B36"
          }
        },
        text: {
          light: {
            primary: "#212B36",
            secondary: "#637381",
            disabled: "#919EAB"
          },
          dark: {
            primary: "#FFFFFF",
            secondary: "#919EAB",
            disabled: "#637381"
          }
        }
      }
    },
  },
  plugins: [],
} satisfies Config);


