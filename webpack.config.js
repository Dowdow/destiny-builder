const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'client/build');
const PUBLIC_DIR = path.resolve(__dirname, 'client/public');
const SRC_DIR = path.resolve(__dirname, 'client/src');

const isDev = process.argv.indexOf('-p') === -1;

module.exports = {
  entry: [
    'babel-polyfill',
    `${SRC_DIR}/index.js`,
  ],
  output: {
    path: BUILD_DIR,
    filename: `bundle${isDev ? '' : '.[chunkhash]'}.js`,
  },
  devtool: isDev ? 'eval-source-map' : 'none',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  optimization: {
    minimize: true,
  },
  module: {
    rules: [
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
              sourceMap: !!isDev,
              localIndentName: '[path][name]__[local]--[hash:base64:5]',
            },
          },
        ],
      },
      {
        test: /\.(png|jpg)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(BUILD_DIR),
    new HtmlWebpackPlugin({
      template: `${PUBLIC_DIR}/index.html`,
      filename: 'index.html',
      inject: 'body',
      favicon: `${PUBLIC_DIR}/favicon.png`,
    }),
  ],
};
