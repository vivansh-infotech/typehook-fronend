/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const rem = (px) => {
  return px * 0.0625 + "rem";
};
module.exports = {
  darkMode: "class",

  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./containers/**/*.{js,ts,jsx,tsx}",
    "./page-components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      "SF-Pro": ["SF Pro Display", "sans-serif"],
    },
    container: {
      center: true,
    },
    fontWeight: {
      100: 100,
      200: 200,
      300: 300,
      400: 400,
      500: 500,
      600: 600,
      700: 700,
      800: 800,
      900: 900,
    },
    fontSize: {
      10: rem(10),
      12: rem(12),
      14: rem(14),
      16: rem(16),
      18: rem(18),
      20: rem(20),
      22: rem(22),
      24: rem(24),
      26: rem(26),
      28: rem(28),
      32: rem(32),
      36: rem(36),
      40: rem(40),
      42: rem(42),
      48: rem(48),
      52: rem(52),
    },
    extend: {
      animation: {
        "slide-in": "slide-in 200ms cubic-bezier(.41,.73,.51,1.02)",
        "slide-out": "slide-out 150ms cubic-bezier(.41,.73,.51,1.02)",
        enter: "enter 200ms ease-out",
        leave: "leave 150ms ease-in forwards",
      },
      keyframes: {
        enter: {
          "0%": { transform: "scale(0.9)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        leave: {
          "0%": { transform: "scale(1)", opacity: 1 },
          "100%": { transform: "scale(0.9)", opacity: 0 },
        },
        "slide-in": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-out": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      colors: {
        success: {
          DEFAULT: "#5cb85c",
        },

        primary: {
          DEFAULT: "#212223",
        },
        gray: {
          DEFAULT: "#D3D3D3",
          50: "#F5F5F5",
          100: "#BABABA",
          200: "#959595",
          250: "#818181",
          150: "#B7B7B7",
          350: "#363738",
          300: "#777777",
          400: "#292A2A",
          450: "#1E1E1E",
          500: "#6D6D6D",
          600: "#F5F5F7",
          700: "#B7B7B8",
          800: "#5A5A5A",
        },
        blue: {
          DEFAULT: "#69A7E3",
        },
      },
      spacing: {
        "10px": "10px",
      },
      borderRadius: {
        "10px": "10px",
        "20px": "20px",
      },
      boxShadow: {
        main: "0px 0px 30px -1px rgba(0, 0, 0, 0.1)",
        c2: "-23px 25px 30px -1px rgba(0, 0, 0, 0.1)",
        c3: "1px 0px 4px -1px rgb(0 0 0 / 12%)",
        c4: "0px 4px 20px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
