const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: './netlify/app.js',
  output: {
    path: path.join(__dirname, 'functions'),
    publicPath: '/',
    filename: 'app.js'
  },
  target: 'node',
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false,   // if you don't put this is, __dirname
    __filename: false,  // and __filename return blank or /
  },
  externals: [nodeExternals()], // Need this to avoid error when working with Expresxs
  resolve: {
    extensions: ['.js']
  }
}