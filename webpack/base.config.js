const path = require('path');
const config = require('./config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: config.jsEntry,
    resolve: {
        alias: {
            src: path.resolve(__dirname, '../src/'),
            vendor: path.resolve(__dirname, '../node_modules/'),
        },
        extensions: ['.js', '.jsx', '.json'],
        mainFields: ['browser', 'main'],
    },
    mode: 'development',
    stats: {
        assets: false,
        chunks: false,
        children: false,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: config.htmlEntry,
        }),
    ],
    output: {
        path: config.buildPath,
    },
};
