const join = require("path").join;
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

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
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: "asset",
      },
      // We recommend using only for the "production" mode
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: ImageMinimizerPlugin.loader,
            // enforce: "pre",
            options: {
              minimizer: {
                implementation: ImageMinimizerPlugin.imageminMinify,
                options: {
                  plugins: [
                    "imagemin-gifsicle",
                    "imagemin-mozjpeg",
                    "imagemin-pngquant",
                    "imagemin-svgo",
                  ],
                },
              },
            },
          },
        ],
      },
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
