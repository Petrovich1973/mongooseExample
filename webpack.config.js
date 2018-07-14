var webpack = require('webpack');
require("babel-polyfill");

module.exports = {
    entry: ["babel-polyfill", "./client/index.js"],
    output: {
        path: __dirname + '/public/build/',
        publicPath: "build/",
        filename: "bundle.js"
    },
    devtool: 'eval',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['transform-class-properties', 'transform-decorators-legacy']
                }
            }
        ]
    },
    plugins:[     
        new webpack.ProvidePlugin({
            Promise: "bluebird"
        })
    ]
}