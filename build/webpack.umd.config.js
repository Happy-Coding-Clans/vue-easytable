/*
编译输出umd 文件 index.js
*/

const path = require("path");
const webpack = require("webpack");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const config = require("./config");
const { libraryName } = require("./common");

module.exports = function(env) {
    return {
        mode: "production",
        entry: {
            index: ["./packages/index.js"]
        },

        output: {
            path: path.join(__dirname, "../libs/umd"),
            filename: "index.js",
            chunkFilename: "[id].js",
            libraryTarget: "umd",
            libraryExport: "default",
            library: libraryName,
            umdNamedDefine: true,
            globalObject: "typeof self !== 'undefined' ? self : this"
        },

        module: {
            rules: [
                // babel-loader
                {
                    test: /\.(js|jsx)$/,
                    use: "babel-loader",
                    exclude: /node_modules/
                },

                // vue loader
                {
                    test: /\.vue$/,
                    use: [
                        {
                            loader: "vue-loader"
                        }
                    ]
                }
            ]
        },

        optimization: {
            minimize: true
        },

        resolve: {
            extensions: [".js", ".jsx", ".vue"],
            modules: [path.resolve("./node_modules")],
            alias: config.alias
        },

        externals: {
            vue: config.externals.vue
        },

        plugins: [new ProgressBarPlugin(), new VueLoaderPlugin()]
    };
};
