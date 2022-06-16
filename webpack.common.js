const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // entry: "./src/index.js",
  entry: {
    "index.min.js": ["./src/initFile.js", "./src/getDomainsWithCookies.js", "./src/cookies.js"],
  },
  // watch: true,
  output: {
    filename: "[name]",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "./",
    libraryExport: "default",
    libraryTarget: "umd",
    library: "CookieConsent",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      inject: "body",
      template: path.resolve(__dirname, "./src", "index.html"),
    }),
  ],
};
