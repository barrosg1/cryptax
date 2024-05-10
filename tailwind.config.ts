import type { Config } from "tailwindcss"
import colors from "tailwindcss/colors"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        secondary: {
          DEFAULT: colors.neutral[200],
          hover: colors.neutral[100],
          border: colors.neutral[400],
          text: colors.neutral[500],
          dark: colors.neutral[800],
          ["light-gray"]: "#f2f1f2",
        },
      },
    },
  },
  plugins: [],
}
export default config
