const path = require('path');
const { env } = require('process');
const TerserPlugin = require("terser-webpack-plugin");


module.exports = (env) => {
  return {
    entry: './src/index.js',
    mode: env.production ? 'production' : 'development',
    optimization: {
      minimize: false
    },

    output: {
      filename: env.min ? 'cookieconsent.min.js' : 'cookieconsent.js',
      path: path.resolve(__dirname, env.docs ? 'docs_src/src/assets/js' : 'build'),
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: path.resolve(__dirname, 'src'),
          exclude: /node_modules/,
          use: ['babel-loader']
        }
      ]
    },
    optimization: {
      minimize: !!env.min,
      minimizer: [new TerserPlugin()],
    },
    resolve: {
      extensions: ['*', '.js']
    },
  };
};
