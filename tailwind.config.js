module.exports = {
  content: [
    "./dist/*.html",
    "./src/**/*.{js,jsx,tsx,ts,vue}",
    "./src/*.{js,jsx,tsx,ts,vue}",
  ],
  darkMode: "media", // or 'class'
  theme: {
    extend: {
      colors: {
        petrit: "#00ff00",
        blue: {
          200: "#B0CDFB",
          300: "#667C99",
          DEFAULT: "#1D79F2",
          400: "#3a81f6",
          500: "#052D61",
        },
        black: {
          DEFAULT: "#000000",
          faded: "#2C2C2C",
        },
        gray: {
          faded: "#F6F7F9",
          light: "#E0E5EB",
          DEFAULT: "#DADFE7",
          dark: "#CACACA",
        },
      },
      fontSize: {
        xsmall: "10px",
        small: "12px",
        base: "14px",
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        bold: 700,
      },
      lineHeight: {
        DEFAULT: "18px",
        12: "12px",
      },
      boxShadow: {
        primary: "0 0 0 1px rgb(29, 121, 242)",
      },
      maxWidth: {
        "1/2": "50%",
        "3/4": "75%",
        "4/5": "80%",
        "9/10": "90%",
      },
      borders: {
        1: "1px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("postcss-import"),
    require("tailwindcss"),
    require("tailwindcss/nesting")(require("postcss-nesting")),
    require("autoprefixer"),
    require("postcss-preset-env")({
      features: { "nesting-rules": false },
    }),
    require("postcss-nested"),
  ],
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "apply",
          "variants",
          "responsive",
          "screen",
        ],
      },
    ],
    "declaration-block-trailing-semicolon": null,
    "no-descending-specificity": null,
  },
};
