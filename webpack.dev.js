const { merge } = require('webpack-merge');
const config = require('./webpack.config.js');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(config, {
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      scriptLoading: 'blocking',
      inject: 'head'
    })
  ],
  devServer: {
    watchFiles: ["./src/*"],
    static: {
      directory: path.join(__dirname, 'build'),
    },
    hot: true,
    port: 1234,
  },
});
