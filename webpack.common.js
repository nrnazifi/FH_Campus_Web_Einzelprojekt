const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const globals = require('./src/api/globals');

module.exports = {
    entry: path.resolve(__dirname, './src/api/index.js'),
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new FaviconsWebpackPlugin(path.resolve(__dirname, './src/assets/favicon.ico')),
        new HtmlWebpackPlugin({
            title: "Home",
            filename: 'index.html',
            template: path.resolve(__dirname, './src/pages/index.html'),
            templateParameters: globals,
        }),
        new HtmlWebpackPlugin({
            title: "Contact",
            filename: 'contact.html',
            template: path.resolve(__dirname, './src/pages/contact.html'),
            templateParameters: globals,
        }),
        new HtmlWebpackPlugin({
            title: "About us",
            filename: 'about.html',
            template: path.resolve(__dirname, './src/pages/about.html'),
            templateParameters: globals,
        })
    ],
};