const CompressionPlugin = require("compression-webpack-plugin");
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new CompressionPlugin({
            test: /\.js$|\.css$|\.html$/,
            algorithm: "gzip",
            threshold: 10240,
            minRatio: 0.8
        }),
    ],
});


