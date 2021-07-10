const path = require("path");
const common = require("./webpack.common");
const {merge} = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
  mode: "development",
  devtool: "source-map",
  output: {
    filename: "script/[name].js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: 'assets/[name]-[hash][ext]',
    library: "$story",
    libraryTarget: "umd", //commonjs-module
    globalObject: 'this',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          //"style-loader", // 3. style -> DOM
          "css-loader",   // 2. css   -> js
          "postcss-loader", // postcss plugin
          "sass-loader",  // 1. sass  -> css
        ]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style/[name].css"
    })
  ]
});
