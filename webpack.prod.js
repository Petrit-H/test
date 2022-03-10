const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const commonConfig = require("./webpack.common");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const glob = require("glob");

module.exports = merge(commonConfig, {
  mode: "production",
  devtool: "source-map",
  watch:true,
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   use: [MiniCssExtractPlugin.loader, "css-loader"],
      // },
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
    new ImageminPlugin({
      externalImages: {
        context: ".",
        sources:glob.sync("./src/assets/images/**.{png,jpg,jpeg,gif,svg}"),
        destination: "dist/images",
        fileName: "[name].[ext]",
      },
    }),
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
      new TerserPlugin(),
    ],
  },
});
