const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin'); // plugin to remove previously built files
const path = require('path'); // required by CleanWebpackPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin'); // plugin to make HTML on the fly

module.exports = {
  entry: {
    dev_main: './client/src/index.js' // MAIN chunk will contain only application code (MANIFEST and VENDOR will be extracted from MAIN)
  },
  output: {
    path: './client/build',
    filename: '[name].[chunkhash].js', // this is necessary to cache non-changed vendor files and update frequently changed App code
    publicPath: '/'
  },
  plugins: [
    new CleanWebpackPlugin(['build'], { // remove previously built files
      root: path.join(__dirname, '..')
    }),
    new HtmlWebpackPlugin({ // this is necessary for making HTML on-the fly (because we don't have constant assets names now)
      title: 'Battle Game'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/, // All JavaScript code - into Babel
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            ['es2015', {
              modules: false // webpack understands the native import syntax, and uses it for tree shaking
            }],
            'stage-2',
            'react'
          ]
        }
      }
    ]
  }
}