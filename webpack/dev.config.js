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
                use: { loader: 'html-loader', options: { attrs: [':data-src', 'img:src'] } },
            },
            { test: /\.(png|jpg|gif|svg|woff(2)?|ttf|eot)$/, loader: 'file-loader' },
        ],
    },
});
