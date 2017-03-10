const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './client/src/index.js' // MAIN chunk will contain only application code (MANIFEST and VENDOR will be extracted from MAIN)
  },
  output: {
    path: './client/build',
    filename: '[name].[chunkhash].js', // this is necessary to cache non-changed vendor files and update frequently changed App code
  },
  plugins: [
    new HtmlWebpackPlugin({ // this is necessary for making HTML on-the fly (because we don't have constant assets names now)
      title: 'Battle Game LP',
      filename: 'index.html',
    }),
    new webpack.optimize.CommonsChunkPlugin({ // VENDOR chunk will contain only node_modules
      name: 'vendor',
      minChunks: function(module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({ // MANIFEST chunk will contain only webpack runtime code
      name: "manifest",
      minChunks: Infinity
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/, // All JavaScript code - into Babel
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/
      }
    ]
  }
}