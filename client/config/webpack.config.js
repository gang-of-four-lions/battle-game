const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './client/src/index.js'
  },
  output: {
    path: './client/build',
    filename: '[name].[chunkhash].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Battle Game LP',
      filename: 'index.html',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor', // vendor chunk name
      minChunks: function(module) {
        return module.context && module.context.indexOf('node_modules') !== -1; // this assumes your vendor imports exist in the node_modules directory
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
      minChunks: Infinity
    })
  ],
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