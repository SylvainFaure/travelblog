const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const entry = { 
  'admin/bundle': './admin/js/app.admin.js',
  'public/bundle': './public/js/app.public.js'
}

const devtool = "source-map";

const output = {
  path: path.resolve(__dirname, `dist`),
  filename: '[name].js'
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
      test: /\.css|\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: `../${entry}/`
            }
            
          },
          // fallback to style-loader in development
          "css-loader",
          "sass-loader"
        ]
       
    },
    {
      test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
      loader: 'url-loader'
    },
    {
      test: /\.(png|jpg|gif)$/,
      use: [
        {
          loader: 'file-loader',
          options: {},
        },
      ],
    }
  ]
}

const optimization = {
  minimize: false
}

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      BASE_PATH: JSON.stringify(process.env.BASE_PATH)
    },
  }),
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery"
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new CleanWebpackPlugin('dist', {}),
  new MiniCssExtractPlugin({
    filename: "[name].css",
  }),
  new CopyWebpackPlugin([
    {from: './admin/js/views/*', to: 'admin/views', flatten: true},
    {from: './public/js/views/*', to: 'public/views', flatten: true},

    {from: './admin/js/index.html', to: 'admin/index.html'},
    {from: './public/index.html', to: 'public/index.html'},
    

    //{from: './admin/assets/img/*', to: 'assets/img', flatten: true},
    //{from: './admin/assets/thumb/*', to: 'assets/thumb', flatten: true},      
    {from: './admin/js/components/**/*', to: 'admin/components', flatten: true, test: /\.html$/, ignore: [ '*.js' ]},
    {from: './public/js/components/**/*', to: 'public/components', flatten: true, test: /\.html$/, ignore: [ '*.js' ]},

    {from: './admin/vendors/semantic/components/*', to: 'admin/vendors/semantic/components', flatten: true},
    {from: './admin/vendors/semantic/themes/default/assets/fonts/*', to: 'admin/vendors/semantic/themes/default/assets/fonts', flatten: true},
    {from: './admin/vendors/semantic/themes/default/assets/images/*', to: 'admin/vendors/semantic/themes/default/assets/images', flatten: true},
    {from: './server', to: 'server'}
  ])
]

module.exports = {
  entry,
  devtool,
  output,
  module: modules,
  optimization,
  plugins
};