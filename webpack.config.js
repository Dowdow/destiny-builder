const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const APP_DIR = path.resolve(__dirname, 'client/app');
const BUILD_DIR = path.resolve(__dirname, 'client/public');

let config = {
  entry: {
    javascript: APP_DIR + '/app.jsx',
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
  plugins: [new HtmlWebpackPlugin()]
}

module.exports = config