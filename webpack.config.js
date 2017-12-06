const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'client/build');
const PUBLIC_DIR = path.resolve(__dirname, 'client/public');
const SRC_DIR = path.resolve(__dirname, 'client/src');

module.exports = {
  entry: {
    javascript: SRC_DIR + '/index.js',
  },
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({ template: `${PUBLIC_DIR}/index.html`, filename: 'index.html', inject: 'body' })]
}
