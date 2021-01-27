module.exports = {
    comments: false,
    plugins: ["transform-vue-jsx"],
    /* presets: [["env", { modules: false }]], */
    env: {
        test: {
            presets: [["env", { targets: { node: "current" } }]],
            plugins: ["istanbul"]
        }
    }
};
