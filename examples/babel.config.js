module.exports = {
    presets: [
        // vue-cli 配合 @vue/babel-preset-jsx 使用。否则使用 babel-plugin-transform-vue-jsx
        ["@vue/babel-preset-jsx"],
        // 应用兼容性
        [
            "@vue/app",
            {
                useBuiltIns: "entry",
                corejs: 3,
                targets: {
                    ie: "11",
                    edge: "17",
                    firefox: "60",
                    chrome: "67",
                    safari: "11.1",
                },
                jsx: {
                    injectH: false,
                },
            },
        ],
    ],
    comments: false,
    plugins: [
        [
            "component",
            {
                libraryName: "element-ui",
                styleLibraryName: "theme-chalk",
            },
        ],
    ],
};
