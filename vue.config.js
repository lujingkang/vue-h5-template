module.exports = {
    lintOnSave: false,
    outputDir: 'web',
    css: {
        loaderOptions: {
            css: {
                // 这里的选项会传递给 css-loader
            },
            postcss: {
                // 这里的选项会传递给 postcss-loader
                plugins: [
                    require('postcss-px2rem-exclude')({
                        remUnit: 75.0,
                        exclude: /node_modules/,
                    }),
                ]
            },
            sass: {
                prependData: `@import "~@/styles/_vars.scss";@import "~@/styles/_mixin.scss";`
            }
        }
    },
};
