const join = require("path").join;
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    "index.min.js": [
      "./src/index.js",
      "./src/init.js",
      "./src/scripts.js",
      "./src/cookies.js",
      "./src/homeBanner.js",
    ],
  },
  watch: true,
  output: {
    // filename: "index.min.js",
    filename: "[name]",
    path: path.resolve(__dirname, "dist"),
    publicPath: "./dist",
    libraryExport: "default",
    libraryTarget: "umd",
    library: "CookieConsent",
    // library: ["MyLibrary", "[name]"],
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
        test: /\.(jpe?g|png|gif)$/,
        loader: 'url-loader',
        options: {
          // Images larger than 10 KB won’t be inlined
          limit: 10 * 1024
        }
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
        options: {
          // Images larger than 10 KB won’t be inlined
          limit: 10 * 1024,
          // Remove quotes around the encoded URL –
          // they’re rarely useful
          noquotes: true,
        }
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
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },

      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  }
};
