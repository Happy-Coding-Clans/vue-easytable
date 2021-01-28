/* webpack config */
var path = require("path");
var Components = require("../components.json");

let externals = {
    vue: {
        root: "Vue",
        commonjs: "vue",
        commonjs2: "vue",
        amd: "vue"
    },
    lodash: {
        root: "_",
        commonjs: "lodash",
        commonjs2: "lodash",
        amd: "lodash"
    }
};

externals["vue-easytable/packages/src/locale/lang/en-US"] =
    "vue-easytable/libs/locale/lang/en-US";

Object.keys(Components).forEach(function(key) {
    externals[`vue-easytable/packages/${key}`] = `vue-easytable/libs/${key}`;
});

let alias = {
    "vue-easytable": path.resolve(__dirname, "../")
};

exports.externals = externals;
exports.alias = alias;
