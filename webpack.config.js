const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


const mode = process.env.NODE_ENV

const entry = { 
  'admin/bundle': './admin/js/app.admin.js',
  //'public/bundle': './public/js/app.public.js'
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
      BASE_PATH: JSON.stringify(process.env.BASE_PATH),
      AWS_BUCKET_PATH: JSON.stringify(process.env.AWS_BUCKET_PATH)
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

    {from: './admin/js/index.html', to: 'admin/index.html'},
    {from: './nuxt.config.js', to: 'nuxt.config.js'},

    {from: './admin/js/components/**/*', to: 'admin/components', flatten: true, test: /\.html$/, ignore: [ '*.js' ]},

    {from: './admin/js/vendors/semantic/components/*', to: 'admin/vendors/semantic/components', flatten: true},
    {from: './admin/js/vendors/semantic/themes/default/assets/fonts/*', to: 'admin/vendors/semantic/themes/default/assets/fonts', flatten: true},
    {from: './admin/js/vendors/semantic/themes/default/assets/images/*', to: 'admin/vendors/semantic/themes/default/assets/images', flatten: true},
    {from: './admin/js/vendors/semantic/semantic.min.css', to: 'admin/vendors/semantic'},

    {from: './server', to: 'server'},
    {from: './nuxt-dist', to: 'nuxt-dist'}
  ])
]

if (process.env.REPORT) {
  plugins.push(new BundleAnalyzerPlugin({
    analyzerMode: 'server',
    generateStatsFile: true,
    statsOptions: { source: false }
  }))
}

module.exports = {
  mode,
  entry,
  devtool,
  output,
  module: modules,
  optimization,
  plugins
};