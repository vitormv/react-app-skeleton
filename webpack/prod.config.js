const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const baseConfig = require('./base.config');
const config = require('./config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const stylesExtractor = new ExtractTextPlugin({
    filename: config.targetPath.css,
    allChunks: true,
    ignoreOrder: true,
});

module.exports = merge(baseConfig, {
    mode: 'production',
    output: {
        filename: config.targetPath.js,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['react'],
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false,
                            localIdentName: '[name]__[local]___[hash:base64:5]',
                        },
                    },
                    'postcss-loader',
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true,
                            importLoaders: 2,
                            localIdentName: '[name]__[local]___[hash:base64:5]',
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: [
                            ':data-src',
                            'img:src',
                        ],
                    },
                },
            },
            {
                test: /\.(png|jpg|gif|svg|woff(2)?|ttf|eot)$/,
                loader: 'file-loader',
                options: {
                    name: config.targetPath.media,
                },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin([path.join(config.buildDirectory, '*')], {
            verbose: false,
            root: config.root,
        }),
        stylesExtractor,
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new UglifyJSPlugin(),
        new BundleAnalyzerPlugin({
            analyzerMode: 'disabled',
            generateStatsFile: true,
        }),
    ],
});
