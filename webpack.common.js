const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    "index": [
      "./src/index.js",
      "./src/init.js",
      "./src/getDomainsWithCookies.js",
      "./src/scripts.js",
      "./src/cookies.js",
      "./src/homeBanner.js",
    ],
    // index: { import: "./src/index.js", dependOn: "shared" },
    // index2: { import: "./src/init.js", dependOn: "shared" },
    // index3: { import: "./src/scripts.js", dependOn: "shared" },
    // index4: { import: "./src/cookies.js", dependOn: "shared" },
    // index5: { import: "./src/homeBanner.js", dependOn: "shared" },
    // shared: "lodash",
  },
  // watch: true,
  output: {
    filename: "[name].min.js",
    // filename: "[name]",
    path: path.resolve(__dirname, "dist"),
    publicPath: "dist",
    libraryExport: "default",
    libraryTarget: "umd",
    library: "CookieConsent",
    // library: ["MyLibrary", "[name]"],
  },
  optimization: {
    splitChunks: {
      minSize: 10000,
      maxSize: 250000,
    },
  },
  performance: {
    hints: false,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      inject: false,
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
          // options: {
          //   presets: ["@babel/preset-env", "es2015", "es2016"],
          // },
        },
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      //! {
      //!   test: /\.(jpg|png|gif|svg)$/,
      //!   loader: 'image-webpack-loader',
      //!   // Specify enforce: 'pre' to apply the loader
      //!   // before url-loader/svg-url-loader
      //!   // and not duplicate it in rules with them
      //!   enforce: 'pre'
      //! },
      // {
      //   test: /\.svg$/,
      //   use: "file-loader",
      // },
      // {
      //   test: /\.css$/,
      //   use: ["style-loader", "css-loader"],
      // },
    ],
  },
};
