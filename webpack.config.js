'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
    cache: true,
    stats: {
        colors: true,
        reasons: false
    },
    entry: [
            'webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/only-dev-server',
            './src/index'
    ],
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    output: {
        path: path.resolve('./build/'),
        publicPath: '/build/',
        pathinfo: true,
        filename: 'bundle.js'
    },
    resolve: {
        root: path.resolve('src')
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'react-hot'
            }
        ]
    }
};

