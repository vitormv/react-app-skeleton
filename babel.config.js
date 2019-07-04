module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                // Minimum browser versions we should support.
                // Base on this list of target browsers, plus the polyfills we use (in the code),
                // webpack will know which polyfills to add to the bundle.
                targets: {
                    ios: 9,
                    safari: 9,
                    chrome: 49,
                    android: 49,
                    firefox: 46,
                    samsung: 4,
                },
                useBuiltIns: 'usage', // add polyfills automatically, but only for things we actually use
                corejs: 3,
            },
        ],
        '@babel/preset-react',
    ],
    plugins: [
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-object-rest-spread',
        [
            '@babel/plugin-transform-runtime',
            {
                regenerator: true,
            },
        ],
    ],
};
