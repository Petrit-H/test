const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { fileURLToPath } = require("url");

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  // entry: path.resolve(__dirname, "./src/index.js"),
  output: {
    // filename: "[name].min.js",
    filename: "[name].[contenthash].min.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: {
          map: {
            inline: true,
            annotation: true,
          },
        },
      }),
      new TerserPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true,
        },
      }),
    ],
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   path: "./src/index.html",
    // }),
    new MiniCssExtractPlugin({ filename: "[name].[hash].css" }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(s(a|c)ss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          // "style-loader",
          "css-loader",
          "sass-loader",
          "postcss-loader",
        ],
      },
      // { test: /\.html$/, use: ["html-loader"] },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: {
          options: {
            name: "[name].[contenthash].[ext]",
            outputPath: "imgs",
          },
        },
      },
    ],
  },
});
