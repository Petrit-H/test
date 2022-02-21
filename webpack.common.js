const join = require("path").join;
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // entry: join(__dirname, "src", "index.js"),
  entry: {
    index: "./src/index.js",
    // vendor: "./src/scripts.js",
    // cookies: "./src/cookies.js",
    // banenr: "./src/homeBanner.js",
  },
  output: {
    path: join(__dirname, "dist"),
    filename: "index.min.js",
    // libraryExport: "default",
    // libraryTarget: "dist",
    // library: "CookieConsent",
  },
  // experiments: {
  //   outputModule: true,
  // },
  optimization: {
    // Even in production, export clean output. Expect users to minify as needed with their own bundler
    minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        // use: ["babel-loader"],
        loader: "babel-loader",
        options: {
          root: __dirname,
          rootMode: "upward-optional",
        },
      },
      {
        test: /\.(s(a|c)ss)$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader", // compiles Sass to CSS, using Node Sass by default
          "postcss-loader",
        ],
      },
      { test: /\.html$/, use: ["html-loader"] },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "imgs",
          },
        },
      },
    ],
  },
};
