// const join = require("path").join;
// const path = require("path");
// const { merge } = require("webpack-merge");
// const common = require("./webpack.common");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const HtmlWebpackPlugin = require("html-webpack-plugin");

// // const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// module.exports = merge(common, {
//   mode: "development",
//   // entry: path.resolve(__dirname, "./src/index.js"),
//   devtool: "eval-source-map",
//   watch: true,
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: "./src/index.html",
//       minify: {
//         removeComments: true,
//         removeAttributeQuotes: true,
//         collapseWhitespace: false,
//       },
//     }),
//     new CleanWebpackPlugin(),
//   ],
//   // module: {
//   //   rules: [
//   //     {
//   //       test: /\.(js|jsx)$/,
//   //       exclude: /node_modules/,
//   //       // use: ["babel-loader"],
//   //       loader: "babel-loader",
//   //       options: {
//   //         root: __dirname,
//   //         rootMode: "upward-optional",
//   //       },
//   //     },
//   //     {
//   //       test: /\.(s(a|c)ss)$/,
//   //       use: [
//   //         "style-loader", // creates style nodes from JS strings
//   //         "css-loader", // translates CSS into CommonJS
//   //         "sass-loader", // compiles Sass to CSS, using Node Sass by default
//   //         "postcss-loader",
//   //       ],
//   //     },
//   //   ],
//   // },
//   resolve: {
//     extensions: ["*", ".js", ".jsx"],
//   },
//   // output: {
//   // path: path.resolve(__dirname, "./public"),
//   // filename: "bundle.js",
//   // },
//   // devServer: {
//   //   contentBase: path.resolve(__dirname, "./dist"),
//   //   hot: true,
//   // },
// });





// const join = require("path").join;
// const path = require("path");
// const { merge } = require("webpack-merge");
// const common = require("./webpack.common");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const HtmlWebpackPlugin = require("html-webpack-plugin");

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// module.exports = merge(common, {
//   mode: "development",
//   // entry: path.resolve(__dirname, "./src/index.js"),
//   devtool: "eval-source-map",
//   watch: true,
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: "./src/index.html",
//       minify: {
//         removeComments: true,
//         removeAttributeQuotes: true,
//         collapseWhitespace: false,
//       },
//     }),
//     new CleanWebpackPlugin(),
//   ],
//   // module: {
//   //   rules: [
//   //     {
//   //       test: /\.(js|jsx)$/,
//   //       exclude: /node_modules/,
//   //       // use: ["babel-loader"],
//   //       loader: "babel-loader",
//   //       options: {
//   //         root: __dirname,
//   //         rootMode: "upward-optional",
//   //       },
//   //     },
//   //     {
//   //       test: /\.(s(a|c)ss)$/,
//   //       use: [
//   //         "style-loader", // creates style nodes from JS strings
//   //         "css-loader", // translates CSS into CommonJS
//   //         "sass-loader", // compiles Sass to CSS, using Node Sass by default
//   //         "postcss-loader",
//   //       ],
//   //     },
//   //   ],
//   // },
//   resolve: {
//     extensions: ["*", ".js", ".jsx"],
//   },
//   // output: {
//   // path: path.resolve(__dirname, "./public"),
//   // filename: "bundle.js",
//   // },
//   // devServer: {
//   //   contentBase: path.resolve(__dirname, "./dist"),
//   //   hot: true,
//   // },
// });



const {merge} = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
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
      new TerserPlugin({
        // Use multi-process parallel running to improve the build speed
        // Default number of concurrent runs: os.cpus().length - 1
        parallel: true,
        // Enable file caching
        cache: true,
        sourceMap: true,
      }),
    ],
  },
});