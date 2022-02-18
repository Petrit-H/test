// "use strict";
// const join = require("path").join;

// module.exports = {
//   entry: join(__dirname, "src", "index.js"),
//   output: {
//     path: join(__dirname, "dist/umd"),
//     // filename: "index.min.js",
//     libraryExport: "default",
//     libraryTarget: "umd",
//     library: "CookieConsent",
//   },
//   optimization: {
//     // Even in production, export clean output. Expect users to minify as needed with their own bundler
//     minimize: true,
//   },
//   module: {
//     rules: [
// {
//   test: /\.js?$/,
//   loader: "babel-loader",
//   options: {
//     root: __dirname,
//     rootMode: "upward-optional",
//   },
// },
// {
//   /* WHY??! */
//   test: /\.js?$/,
//   loader: "babel-loader",
//   // loader: "string-replace-loader",
//   options: {
//     search: "(?<=>)\\n {2,}|\\n {2,}(?=<)",
//     replace: () => "",
//     flags: "g",
//   },
// },

// {
//   test: /\.js$/,
//   exclude: /(node_modules|bower_components)/,
//   use: {
//     loader: "babel-loader",
//     options: {
//       presets: ["@babel/preset-env"],
//     },
//   },
// },
//       {
//         test: /\.s[ac]ss$/i,
//         exclude: /(node_modules|bower_components)/,
//         use: [
//           "style-loader", // creates style nodes from JS strings
//           "css-loader", // translates CSS into CommonJS
//           "sass-loader", // compiles Sass to CSS, using Node Sass by default
//           // "postcss-loader",
//         ],
//       },
//       {
//         test: /\.html$/,
//         use: ["html-loader"],
//       },
//       {
//         test: /\.(svg|png|jpg|gif)$/,
//         use: {
//           options: {
//             name: "[name].[hash].[ext]",
//             outputPath: "imgs",
//           },
//         },
//       },
//     ],
//   },
// };

// "use strict";
// const join = require("path").join;

// module.exports = {
//   entry: join(__dirname, "src", "index.js"),
//   output: {
//     path: join(__dirname, "dist/umd"),
//     filename: "index.min.js",
//     libraryExport: "default",
//     libraryTarget: "umd",
//     library: "CookieConsent",
//   },
// module: {
//   rules: [
//     {
//       test: /\.scss$/,
//       use: [
//         // [style-loader](/loaders/style-loader)
//         { loader: 'style-loader' },
//         // [css-loader](/loaders/css-loader)
//         {
//           loader: 'css-loader',
//           options: {
//             modules: true
//           }
//         },
//         // [sass-loader](/loaders/sass-loader)
//         { loader: 'sass-loader' }
//       ]
//     },
//     {
//       test: /\.m?js$/,
//       exclude: /node_modules/,
//       use: {
//         loader: "babel-loader",
//         options: {
//           presets: [["@babel/preset-env", { targets: "defaults" }]],
//           plugins: ["@babel/plugin-transform-runtime"],
//         },
//       },
//     },
//     // {
//     //   test: /\.js?$/,
//     //   loader: "babel-loader",
//     //   exclude: /(node_modules|bower_components)/,
//     //   options: {
//     //     root: __dirname,
//     //     rootMode: "upward-optional",
//     //   },
//     // },
//   ],
// },
//   optimization: {
//     // Even in production, export clean output. Expect users to minify as needed with their own bundler
//     minimize: false,
//   },
// };

"use strict";
const join = require("path").join;
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: join(__dirname, "src", "index.js"),
  output: {
    path: join(__dirname, "dist"),
    filename: "index.min.js",
    libraryExport: "default",
    libraryTarget: "dist",
    library: "CookieConsent",
  },

  optimization: {
    // Even in production, export clean output. Expect users to minify as needed with their own bundler
    minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        // use: ["babel-loader"],
        loader: "babel-loader",
        options: {
          root: __dirname,
          rootMode: "upward-optional",
        },
      },
      {
        test: /\.(s(a|c)ss)$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader", // compiles Sass to CSS, using Node Sass by default
          "postcss-loader",
        ],
      },
      //todo {
      //todo   test: /\.(js|jsx)$/,
      //todo   exclude: /node_modules/,
      //todo   use: ["babel-loader"],
      //todo },
      // {
      //   test: /\.(s(a|c)ss)$/,
      //   use: ["style-loader", "css-loader", "sass-loader", "postcss-loader"],
      // },

    ],
  },
};
