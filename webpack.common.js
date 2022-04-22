const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // entry: "./src/index.js",
  entry: {
    index: [
      // "./src/test.js",
      "./src/initFile.js",
      "./src/getDomainsWithCookies.js",
      "./src/cookies.js",
    ],
    // index2: { import: "./src/initFile.js" },
    // index3: { import: "./src/getDomainsWithCookies.js" },
    // index4: { import: "./src/cookies.js" },
    // shared: "lodash",
  },
  // watch: true,
  output: {
    filename: "[name].min.js",
    // filename: "[name]",
    path: path.resolve(__dirname, "dist"),
    publicPath: "./",
    libraryExport: "default",
    libraryTarget: "umd",
    // library: "CookieConsent",
    // library: ["MyLibrary", "[name]"],
  },
  // optimization: {
  // splitChunks: {
  //   minSize: 10000,
  //   maxSize: 250000,
  // },
  // },
  performance: {
    hints: false,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      inject: "body",
      template: path.resolve(__dirname, "src", "index.html"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /[\\/]node_modules[\\/]/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },

    ],
  },
};
