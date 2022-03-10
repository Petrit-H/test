const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const commonConfig = require("./webpack.common");

module.exports = merge(commonConfig, {
  mode: "development",
  devtool: "source-map",
  watch: true,
});
