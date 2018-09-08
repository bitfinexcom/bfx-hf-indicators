/* global __dirname, require, module */

const webpack = require('webpack')
const path = require('path')

const config = {
  bail: true,
  entry: {
    index: path.join(__dirname, 'index.js'),
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'hfs'
  },

  externals: {
    'lodash': 'lodash',
  },

  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: 'babel-loader'
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]
}

module.exports = function (env) {
  console.log('Env:', env)
  return config
}
