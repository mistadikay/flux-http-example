'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpPlugins = require('gulp-load-plugins')();

var eslint = gulpPlugins.eslint;
var jscs = gulpPlugins.jscs;

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config');

gulp.task('lint', function() {
    return gulp.src([ 'src/**/*.js' ])
        .pipe(jscs({ configPath: './jscs.json' }))
        .pipe(eslint({ configFile: '.eslintrc' }))
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('dev', function() {
    var server = new WebpackDevServer(webpack(webpackConfig), {
        publicPath: webpackConfig.output.publicPath,
        hot: true
    });

    server.listen('3000', 'localhost', function(err) {
        if (err) {
            throw new gutil.PluginError('webpack:dev', err);
        }

        gutil.log('[webpack:dev]', 'http://localhost:3000/');
    });
});
