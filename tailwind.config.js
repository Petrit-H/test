// const GjTailwindConfig = require("@gjirafatech/gjirafa-tailwind");

module.exports = {
  content: [
    // Example content paths...
    "./public/**/*.html",
    "./src/**/*.{js,jsx,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      boxShadow: {
        primary: "0 0 0 1px rgb(29, 121, 242)",
      },
      colors: {
        primary: {
          light: "#667C99",
          DEFAULT: "#052D61",
          // dark: "#009eeb",
        },
        black: {
          DEFAULT: "#000000",
          faded: "#A3B0C2",
        },
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
