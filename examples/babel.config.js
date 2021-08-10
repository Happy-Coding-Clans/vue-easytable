module.exports = {
    presets: [
        // vue0cli 配合 @vue/babel-preset-jsx 使用。否则使用 babel-plugin-transform-vue-jsx
        ["@vue/babel-preset-jsx"],
        [
            "@vue/app",
            {
                useBuiltIns: "entry",
                corejs: 3,
                targets: {
                    ie: "11",
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
