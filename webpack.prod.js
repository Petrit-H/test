"use strict";
const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, "./src/index.js"),
  devtool: "source-map",
  module: {
    rules: [
      // {
      //   test: /\.(js|jsx)$/,
      //   exclude: /node_modules/,
      //   // use: ["babel-loader"],
      //   loader: "babel-loader",
      //   options: {
      //     root: __dirname,
      //     rootMode: "upward-optional",
      //   },
      // },
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
      { test: /\.html$/, use: ["html-loader"] },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: {
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "imgs",
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      path: "./src/index.html",
    }),
    new MiniCssExtractPlugin({ filename: "[name].[hash].css" }),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: {
          map: {
            inline: false,
            annotation: true,
          },
        },
      }),
      new TerserPlugin(),
    ],
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "index.min.js",
  },
};
