const webpack = require('webpack');

module.exports = {
  entry: ['./client/src/index.js'],
  output: {
    path: './client/build',
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/
      }
    ]
  }
}