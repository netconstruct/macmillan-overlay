/* eslint-disable */

const browserSync = require('browser-sync').create();
const gulp = require('gulp');
const gutil = require('gulp-util');
const nodemon = require('gulp-nodemon');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const devConfig = require('./webpack.dev.config');
const prdConfig = require('./webpack.prd.config');

gulp.task('build:webpack', [], function(callback) {
  webpack(prdConfig, function(err, stats) {
    if (err) throw new gutil.PluginError('webpack', err);

    gutil.log('[webpack]', stats.toString());

    callback();
  });
});

gulp.task('serve:bs', function() {

  const compiler = webpack(devConfig);

  browserSync.init({
    middleware: [
      webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: devConfig.output.publicPath,
        stats: {
          colors: true,
        },
        watchOptions: {
          poll: true,
        },
      }),
      webpackHotMiddleware(compiler)
    ],
    open: false,
    proxy: 'https://rp.rshackleton.local/',
    port: 3000
  });
});

gulp.task('build', ['build:webpack']);
gulp.task('default', ['serve:bs']);
