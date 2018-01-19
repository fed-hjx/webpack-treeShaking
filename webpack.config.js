const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const config = {
    entry: {
        pa: './a.js',
        pb: './b.js'
    },
    output:{
        path: path.resolve(__dirname,'dist'),
        filename: '[name][chunkhash:8].js'
    },
    module:{

    },
    plugins:[
        new webpack.optimize.ModuleConcatenationPlugin(), //scope hoisting 模块作用域提升
        new UglifyJSPlugin(), //tree shaking 配合es6 module
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: 2,
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html',
            // allChunks: true,
            chunks: ['manifest', 'vendor','pa'],
            // minify: {
            //     removeAttributeQuotes: true
            // },
            // hash: true,
        }),
    ]
}

module.exports = config;