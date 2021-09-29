const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPreconnectPlugin = require('html-webpack-preconnect-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const RobotstxtPlugin = require("robotstxt-webpack-plugin");
const globals = require('./src/api/globals');

module.exports = {
    entry: {
        index: path.resolve(__dirname, './src/api/index.js'),
        contact: path.resolve(__dirname, './src/api/contact.js'),
        favorites: path.resolve(__dirname, './src/api/favorites.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        clean: true,
        filename: '[name].bundle.js',
        chunkFilename: '[id].bundle_[chunkhash].js',
        sourceMapFilename: '[file].map'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: './assets/images/'
                          }
                    },
                ],
            },
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
            chunks: ['index'],
            preconnect: [
                'https://images.dog.ceo',
            ],
        }),
        new HtmlWebpackPlugin({
            title: "Contact",
            filename: 'contact.html',
            template: path.resolve(__dirname, './src/pages/contact.html'),
            templateParameters: globals,
            chunks: ['contact'],
            preconnect: [
                'https://images.dog.ceo',
            ],
        }),
        new HtmlWebpackPlugin({
            title: "Favorites dogs",
            filename: 'favorites.html',
            template: path.resolve(__dirname, './src/pages/favorites.html'),
            templateParameters: globals,
            chunks: ['favorites'],
            preconnect: [
                'https://images.dog.ceo',
            ],
        }),
        // enabled preconnect plugin
        new HtmlWebpackPreconnectPlugin(),
        new RobotstxtPlugin({}),
    ],
};