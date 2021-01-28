module.exports = {
    comments: false,
    plugins: ["transform-vue-jsx"],
    env: {
        test: {
            presets: [["env", { targets: { node: "current" } }]],
            /* plugins: ["istanbul"] */
        }
    }
};
