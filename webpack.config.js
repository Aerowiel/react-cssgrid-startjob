const HtmlWebPackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html',
});

module.exports = {
  module :{
    rules : [
      {
        test :/\.js$/,
        exclude: /node_modules/,
        use: {
          loader:"babel-loader"
        }
      },
      {
        test:/\.scss$/,
        exclude: /node_modules/,
        use:[
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS
        ]
      }
    ]
  },
  plugins:[
    htmlPlugin
  ],
  devServer: {
    historyApiFallback: true,
  }
};
