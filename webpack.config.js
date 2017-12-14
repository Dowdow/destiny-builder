const path = require('path');
const webpack = require('webpack');
const combineLoaders = require('webpack-combine-loaders');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'client/build');
const PUBLIC_DIR = path.resolve(__dirname, 'client/public');
const SRC_DIR = path.resolve(__dirname, 'client/src');

const isDev = process.argv.indexOf('-p') === -1;

module.exports = {
  entry: {
    javascript: `${SRC_DIR}/index.js`,
  },
  output: {
    path: BUILD_DIR,
    filename: `bundle${isDev ? '' : '.[chunkhash]'}.js`,
  },
  devtool: isDev ? 'eval-source-map' : 'none',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              localIndentName: '[path][name]__[local]--[hash:base64:5]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${PUBLIC_DIR}/index.html`,
      filename: 'index.html',
      inject: 'body',
    }),
  ],
};
