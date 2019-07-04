const merge = require('webpack-merge');
const baseConfig = require('./base.config');
const config = require('./config');

module.exports = merge(baseConfig, {
    devServer: {
        contentBase: config.buildPath,
        noInfo: true,
        overlay: true,
        hot: true,
    },
    plugins: [],
    module: {
        rules: [
            { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
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
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]__[local]___[hash:base64:5]',
                            },
                            sourceMap: true,
                            importLoaders: 2,
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.(html)$/,
                use: { loader: 'html-loader', options: { attrs: [':data-src', 'img:src'] } },
            },
            { test: /\.(png|jpg|gif|svg|woff(2)?|ttf|eot)$/, loader: 'file-loader' },
        ],
    },
});
