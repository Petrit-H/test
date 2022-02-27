// const path = require("path");
// const common = require("./webpack.common");
// const { merge } = require("webpack-merge");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const TerserPlugin = require("terser-webpack-plugin");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const { fileURLToPath } = require("url");

// // const __dirname = path.dirname(fileURLToPath(import.meta.url));

// module.exports = merge(common, {
//   mode: "production",
//   devtool: "source-map",
//   // entry: path.resolve(__dirname, "./src/index.js"),
//   output: {
//     filename: "[name].min.js",
//     // filename: "[name].[contenthash].js",
//     path: path.resolve(__dirname, "dist"),
//   },
//   // resolve: {
//   //   extensions: ["*", ".js", ".jsx"],
//   // },
//   optimization: {
//     minimize: true,
//     minimizer: [
//       new OptimizeCssAssetsPlugin({
//         cssProcessorOptions: {
//           map: {
//             inline: true,
//             annotation: true,
//           },
//         },
//       }),
//       new TerserPlugin(),
//       new HtmlWebpackPlugin({
//         template: "./src/index.html",
//         minify: {
//           removeAttributeQuotes: true,
//           collapseWhitespace: true,
//           removeComments: true,
//         },
//       }),
//     ],
//   },
//   plugins: [
//     // new HtmlWebpackPlugin({
//     //   path: "./src/index.html",
//     // }),
//     new MiniCssExtractPlugin({ filename: "[name].css" }),
//     new CleanWebpackPlugin(),
//   ],
//   module: {
//     rules: [
//       {
//         test: /\.(s(a|c)ss)$/,
//         use: [
//           MiniCssExtractPlugin.loader,
//           // "style-loader",
//           "css-loader",
//           "sass-loader",
//           "postcss-loader",
//         ],
//       },
//       // { test: /\.html$/, use: ["html-loader"] },
//       // {
//       //   test: /\.(svg|png|jpg|gif)$/,
//       //   use: {
//       //     options: {
//       //       name: "[name].[contenthash].[ext]",
//       //       outputPath: "imgs",
//       //     },
//       //   },
//       // },
//     ],
//   },
// });

// const path = require("path");
// const common = require("./webpack.common");
// const { merge } = require("webpack-merge");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const TerserPlugin = require("terser-webpack-plugin");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const { fileURLToPath } = require("url");
// const join = require("path").join;

// // const __dirname = path.dirname(fileURLToPath(import.meta.url));

// module.exports = merge(common, {
//   mode: "production",
//   devtool: "source-map",
//   // entry: path.resolve(__dirname, "./src/index.js"),
// entry: {
//   index: join(__dirname, "src", "index.js"),
//   scripts: join(__dirname, "src", "scripts.js"),
//   cookies: join(__dirname, "src", "cookies.js"),
//   homeBanner: join(__dirname, "src", "homeBanner.js"),
// },
//   output: {
//     filename: "[name].min.js",
//     path: path.resolve(__dirname, "dist/umd"),
//     libraryTarget: "umd",
//   },
//   resolve: {
//     extensions: ["*", ".js", ".jsx"],
//   },
//   optimization: {
//     // minimize: true,
//     minimizer: [
//       new OptimizeCssAssetsPlugin({
//         cssProcessorOptions: {
//           map: {
//             inline: true,
//             annotation: true,
//           },
//         },
//       }),
//       new TerserPlugin(),
//       new HtmlWebpackPlugin({
//         template: "./src/index.html",
//         minify: {
//           removeAttributeQuotes: true,
//           collapseWhitespace: true,
//           removeComments: true,
//         },
//       }),
//     ],
//   },
//   plugins: [
//     new CleanWebpackPlugin(),
//     new MiniCssExtractPlugin({ filename: "[name].css" }),
//   ],
//   module: {
//     rules: [
//       // {
//       //   test: /\.js?$/,
//       //   loader: "string-replace-loader",
//       //   options: {
//       //     search: "(?<=>)\\n {2,}|\\n {2,}(?=<)",
//       //     replace: () => "",
//       //     flags: "g",
//       //   },
//       // },
//       {
//         test: /\.(s(a|c)ss)$/,
//         use: [
//           MiniCssExtractPlugin.loader,
//           // "style-loader",
//           "css-loader",
//           "sass-loader",
//           "postcss-loader",
//         ],
//       },
//       // { test: /\.html$/, use: ["html-loader"] },
//       // {
//       //   test: /\.(svg|png|jpg|gif)$/,
//       //   use: {
//       //     options: {
//       //       name: "[name].[contenthash].[ext]",
//       //       outputPath: "imgs",
//       //     },
//       //   },
//       // },
//     ],
//   },
// });
const path = require("path");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const commonConfig = require("./webpack.common");

module.exports = merge(commonConfig, {
  mode: "production",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            // This is required for asset imports in CSS, such as url()
            options: { publicPath: "" },
          },
          "css-loader",
          "postcss-loader",
          // according to the docs, sass-loader should be at the bottom, which
          // loads it first to avoid prefixes in your sourcemaps and other issues.
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "main.css",
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
        // terserOptions: {
        //   //? Use multi-process parallel running to improve the build speed
        //   //? Default number of concurrent runs: os.cpus().length - 1
        //   parallel: true,
        //   //? Enable file caching
        // cache: true,
        //   sourceMap: true,
        // },
      }),
    ],
  },

});
