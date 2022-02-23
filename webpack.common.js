// const join = require("path").join;
// const HtmlWebpackPlugin = require("html-webpack-plugin");

// module.exports = {
//   // entry: join(__dirname, "src", "index.js"),
// entry: {
//   index: "./src/index.js",
//   vendor1: "./src/scripts.js",
//   vendor2: "./src/cookies.js",
//   vendor3: "./src/homeBanner.js",
// },
//   output: {
//     path: join(__dirname, "dist"),
//     filename: "index_bundle.js",
//     libraryExport: "default",
//     // libraryTarget: "dist",
//     library: "CookieConsent",
//   },
//   // experiments: {
//   //   outputModule: true,
//   // },
//   plugins: [

//   ],
//   optimization: {
//     // Even in production, export clean output. Expect users to minify as needed with their own bundler
//     minimize: false,
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//         // use: ["babel-loader"],
//         loader: "babel-loader",
//         options: {
//           root: __dirname,
//           rootMode: "upward-optional",
//         },
//       },
//       {
//         test: /\.(s(a|c)ss)$/,
//         use: [
//           "style-loader", // creates style nodes from JS strings
//           "css-loader", // translates CSS into CommonJS
//           "sass-loader", // compiles Sass to CSS, using Node Sass by default
//           "postcss-loader",
//         ],
//       },
//       { test: /\.html$/, use: ["html-loader"] },
//       {
//         test: /\.(svg|png|jpg|gif)$/,
//         use: {
//           loader: "file-loader",
//           options: {
//             name: "[name].[hash].[ext]",
//             outputPath: "imgs",
//           },
//         },
//       },
//     ],
//   },
// };

// const join = require("path").join;
// const HtmlWebpackPlugin = require("html-webpack-plugin");

// module.exports = {
//   entry: join(__dirname, "src", "index.js"),

//   output: {
//     path: join(__dirname, "dist/umd"),
//     filename: "index.js",
//     libraryExport: "default",
//     libraryTarget: "umd",
//     library: "CookieConsent",
//   },
//   optimization: {
//     // Even in production, export clean output. Expect users to minify as needed with their own bundler
//     minimize: false,
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         // exclude: /node_modules/,
//         // use: ["babel-loader"],
//         loader: "babel-loader",
//         options: {
//           root: __dirname,
//           rootMode: "upward-optional",
//         },
//       },
//       {
//         test: /\.(s(a|c)ss)$/,
//         use: [
//           "style-loader", // creates style nodes from JS strings
//           "css-loader", // translates CSS into CommonJS
//           "sass-loader", // compiles Sass to CSS, using Node Sass by default
//           "postcss-loader",
//         ],
//       },
//       { test: /\.html$/, use: ["html-loader"] },
//       {
//         test: /\.(svg|png|jpg|gif)$/,
//         use: {
//           loader: "file-loader",
//           options: {
//             name: "[name].[hash].[ext]",
//             outputPath: "imgs",
//           },
//         },
//       },
//     ],
//   },
// };
const join = require("path").join;
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // entry: './src',
  entry: {
    "index.min": [
      "./src/scripts.js",
      "./src/cookies.js",
      "./src/homeBanner.js",
      "./src/index.js",
      "./src/init.js",
    ],
  },
  output: {
    // filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    libraryExport: "default",
    libraryTarget: "umd",
    library: "CookieConsent",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      inject: true,
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
    ],
  },
};
