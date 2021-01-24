module.exports = {
    presets: [
        [
            "@vue/app",
            {
                useBuiltIns: "entry",
                corejs: 3,
                targets: {
                    ie: "11"
                },
                jsx: {
                    injectH: false
                }
            }
        ]
    ],
    comments: false,
    plugins: ["transform-vue-jsx"]
};
