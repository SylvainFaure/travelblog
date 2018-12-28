const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const entry = { 
  main: './public/js/app.js'
}

const devtool = "source-map";

const output = {
  path: path.resolve(__dirname, 'dist'),
  filename: 'bundle.js'
}

const modules = {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules|vendors)/,
      use: {
        loader: "babel-loader"
      } 
    },
    {
      test: /\.scss$/,
        use: [
          // fallback to style-loader in development
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
    }
  ]
}

const optimization = {
  minimize: false
}

const plugins = [
  new CleanWebpackPlugin('dist', {}),
  new HtmlWebPackPlugin({
    template: "./public/js/index.html",
    filename: "index.html"
  }),
  new MiniCssExtractPlugin({
    filename: "style.css",
  }),
  new CopyWebpackPlugin([
    {from: './public/js/views/*', to: 'views', flatten: true},
    {from: './public/assets/img/*', to: 'assets/img', flatten: true},
    {from: './public/assets/thumb/*', to: 'assets/thumb', flatten: true},      
    {from: './public/js/components/**/*', to: 'components', flatten: true, test: /\.html$/, ignore: [ '*.js' ]},
    {from: './public/vendors/semantic/*', to: 'vendors/semantic', flatten: true},
    {from: './public/vendors/semantic/components/*', to: 'vendors/semantic/components', flatten: true},
    {from: './public/vendors/semantic/themes/default/assets/fonts/*', to: 'vendors/semantic/themes/default/assets/fonts', flatten: true},
    {from: './public/vendors/semantic/themes/default/assets/images/*', to: 'vendors/semantic/themes/default/assets/images', flatten: true},
  ]),
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery"
  })
]

module.exports = {
  entry,
  devtool,
  output,
  module: modules,
  optimization,
  plugins
};