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

externals["ve-table/packages/src/locale/lang/en-US"] =
    "ve-table/libs/locale/lang/en-US";

Object.keys(Components).forEach(function(key) {
    externals[`ve-table/packages/${key}`] = `ve-table/libs/${key}`;
});

let alias = {
    "ve-table": path.resolve(__dirname, "../")
};

exports.externals = externals;
exports.alias = alias;
