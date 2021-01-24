/*
编译输出引用的入口文件 main.js
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
            path: path.join(__dirname, "../libs"),
            filename: "main.js",
            chunkFilename: "[id].js",
            libraryExport: "default",
            library: libraryName,
            /*
            commonjs 分配给 exports 对象;
            commonjs2 分配给 module.exports 对象;
            */
            libraryTarget: "commonjs2"
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

        externals: config.externals,

        plugins: [new ProgressBarPlugin(), new VueLoaderPlugin()]
    };
};
