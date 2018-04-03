var webpack = require('webpack');
var path = require('path');

var APP_JS = path.resolve(__dirname, './js');
var APP_HTML = path.resolve(__dirname, './html');
var BUILD_DIR = path.resolve(__dirname, 'dist');

var config = {

    debug: true,
    devtools: 'sourcemap',


    entry: {
        javascript: APP_JS + '/app.js',
        html: APP_HTML + '/index.html'
    },

    output: {
        path: BUILD_DIR,
        filename: 'app.js'
    },

    module : {
        loaders : [
            {
                exclude: /node_modules/,
                loader: 'babel',
                test: /\.js$/,
                presets:[ 'es2015', 'react', 'stage-0' ]
            },
            {
                test: /\.html$/,
                loader: "file?name=[name].[ext]"
            },
            {
                test: /\.less$/,
                loader: 'style!css!less'
            },
            // {
            //     test: /\.css$/,
            //     loader: 'style!css'
            // }

        ]
  }

};

module.exports = config;