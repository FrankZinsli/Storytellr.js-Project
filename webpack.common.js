const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    storytellr: "./src/script.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
      scriptLoading: "blocking",
      inject: 'head' // true, false, head, body
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name]-[hash].[ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name]-[hash].[ext]'
        }
      },
    ]
  }
}
