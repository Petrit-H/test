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
  // entry: [
  //   "./src/index.js",
  //   "./src/total.js",
  // , [
  //   "./src/scripts.js",
  //   "./src/cookies.js",
  //   "./src/homeBanner.js",
  //   "./src/init.js",

  // ],
  // ],

  // entry: "./src/total.js",
  // entry: {
  //   "index.min.js": [
  //     // join(__dirname, "src", "index.js"),
  //     path.resolve(__dirname, "src/init.js"),
  //     // join(__dirname, "src", "init.js"),
  //     path.resolve(__dirname, "src/scripts.js"),
  //     // join(__dirname, "src", "scripts.js"),
  //     path.resolve(__dirname, "src/cookies.js"),
  //     // join(__dirname, "src", "cookies.js"),
  //     path.resolve(__dirname, "src/homeBanner.js"),
  //     // join(__dirname, "src", "homeBanner.js")
  //   ],
  // },
  entry: {
    "index.min.js": [
      "./src/index.js",
      "./src/init.js",
      "./src/scripts.js",
      "./src/cookies.js",
      "./src/homeBanner.js",
    ],
  },
  // entry:{
  //   a:"./src/index.js",
  //   c:"./src/scripts.js",
  //   d:"./src/cookies.js",
  //   e:"./src/homeBanner.js",
  //   b:"/src/init.js",
  // },
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
  // experiments: {
  //   outputModule: true,
  // },
  // output: {
  //   module: true,
  // },
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
        test: /\.svg$/,
        use: "file-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
      // {
      //   test: /\.png$/,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         mimetype: 'image/png'
      //       }
      //     }
      //   ]
      // },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 5500,
  },
};
