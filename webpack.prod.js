const { merge } = require("webpack-merge");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const commonConfig = require("./webpack.common");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const glob = require("glob");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = merge(commonConfig, {
  mode: "production",
  devtool: "source-map",
  module: {
    rules: [
      {
        type: "javascript/auto",
        test: /\.json$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "lang/[name].[ext]",
            },
          },
        ],
        include: [path.resolve(__dirname, "src/lang")],
        // include: /\/src\/lang\/.*\.json$/,
        // include: /\/src\/.*\.json$/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /[\\/]node_modules[\\/]/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: "" },
          },
          "css-loader",
          "sass-loader",
          "postcss-loader",
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "main.min.css",
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: {
          map: {
            inline: true,
            annotation: false,
          },
        },
      }),
      new TerserPlugin(),
    ],
  },
});
