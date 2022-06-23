module.exports = {
  content: ["./dist/*.html", "./src/**/*.{js,jsx,tsx,ts,vue}", "./src/*.{js,jsx,tsx,ts,vue}"],
  darkMode: "media", // or 'class'
  theme: {
    extend: {
      colors: {
        petrit: "#1A1A1A",
        blue: {
          100: "#B0CDFB",
          200: "#A3B0C2",
          300: "#667C99",
          DEFAULT: "#1D79F2",
          400: "#3a81f6",
          500: "#052D61",
        },
        black: {
          DEFAULT: "#000000",
          300: "#2C2C2C",
          400: "#1A1A1A",
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
        2: "0px 2px 16px rgba(0, 0, 0, 0.08)",
        3: "0px 4px 16px rgba(44, 44, 44, 0.16)",
      },
      maxWidth: {
        "1/2": "50%",
        "1/3": "30%",
        "6/10": "60%",
        "7/10": "70%",
        "3/4": "75%",
        "4/5": "80%",
        "9/10": "90%",
        100: "100px",
      },
      borderWidth: {
        1: "1px",
      },
      borderRadius: {
        4: "4px",
      },
      width: {
        100: "100px",
      },
      screens: {
        xs: "475px",
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
        ignoreAtRules: ["tailwind", "apply", "variants", "responsive", "screen"],
      },
    ],
    "declaration-block-trailing-semicolon": null,
    "no-descending-specificity": null,
  },
};
