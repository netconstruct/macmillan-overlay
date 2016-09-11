/* eslint-disable */

require('dotenv').config();

var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: {
    main: [
      'babel-polyfill',
      './src/index',
    ]
  },
  module: {
    preLoaders: [{
      test: /\.js$/,
      loader: 'eslint',
      include: path.join(__dirname, 'src'),
    }],
    loaders: [{
      test: /\.css$/,
      loaders: ['style', 'css', 'postcss'],
    }, {
      test: /\.html$/,
      loader: 'html'
    }, {
      test: /\.js$/,
      loader: 'babel',
      include: path.join(__dirname, 'src'),
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.scss$/,
      loaders: ['style', 'css', 'postcss', 'sass'],
    }, {
      test: /node_modules[\\\/]auth0-lock[\\\/].*\.js$/,
      loaders: [
        'transform/cacheable?brfs',
        'transform/cacheable?packageify'
      ]
    }, {
      test: /node_modules[\\\/]auth0-lock[\\\/].*\.ejs$/,
      loader: 'transform/cacheable?ejsify'
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url?limit=10000&minetype=application/font-woff'
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file'
    }]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.[hash].js',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
    new webpack.DefinePlugin({
      'process.env.JUSTGIVING_APPID': JSON.stringify(process.env.JUSTGIVING_APPID),
      'process.env.JUSTGIVING_PAGESHORTNAME': JSON.stringify(process.env.JUSTGIVING_PAGESHORTNAME),
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
  postcss: function () {
    return [autoprefixer({ browsers: ['last 2 versions'] })];
  },
  resolve: {
    alias: {
      'actions': path.join(__dirname, 'src', 'actions'),
      'components': path.join(__dirname, 'src', 'components'),
      'middleware': path.join(__dirname, 'src', 'middleware'),
      'reducers': path.join(__dirname, 'src', 'reducers'),
      'sagas': path.join(__dirname, 'src', 'sagas'),
    },
  },
};
