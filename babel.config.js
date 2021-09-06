module.exports = {
    comments: false,
    presets: [
        [
            "@babel/env",
            {
                targets: {
                    ie: "11",
                    edge: "17",
                    firefox: "60",
                    chrome: "67",
                    safari: "11.1",
                },
                useBuiltIns: "entry",
                corejs: "3.6.5",
            },
        ],
    ],
    plugins: ["transform-vue-jsx"],
    env: {
        test: {
            // presets: [["env", { targets: { node: "current" } }]],
            // plugins: ["istanbul"]
        },
    },
};
