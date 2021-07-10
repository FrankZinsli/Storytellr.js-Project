const path = require("path");
const common = require("./webpack.common");
const {merge} = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "script/[name].min.js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: 'assets/[name]-[hash][ext]',
    library: "$story",
    libraryTarget: "umd",
    globalObject: 'this',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // extract css -> file
          "css-loader",   // css   -> js
          "postcss-loader", // postcss plugin
          "sass-loader"   // sass  -> css
        ]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style/[name].min.css",
    })
  ]
});
