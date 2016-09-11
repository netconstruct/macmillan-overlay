/* eslint-disable */
var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');

// Initialise env variables.
require('dotenv').config();

// Get hostname and port.
const host = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 8080;

var config = require('./webpack.dev.config.js');
config.entry.main.unshift('webpack-dev-server/client?http://' + host + ':' + port +'/');
config.entry.main.unshift('react-hot-loader/patch');
var compiler = webpack(config);

// Create server.
var server = new webpackDevServer(compiler, {
  contentPath: 'dist',
  hot: true,
  publicPath: config.output.publicPath,
  stats: { colors: true },
});

server.listen(port, host, function(err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://%s:%s', host, port);
});
