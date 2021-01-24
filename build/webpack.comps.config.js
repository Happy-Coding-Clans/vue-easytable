/*
编译输出每个组件
*/

const path = require("path");
const webpack = require("webpack");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const Components = require("../components.json");
//const TerserPlugin = require("terser-webpack-plugin");
const config = require("./config");

module.exports = function(env) {
    return {
        mode: "production",
        entry: Components,

        output: {
            path: path.join(__dirname, "../libs"),
            filename: "[name].js",
            chunkFilename: "[id].js",
            /*
            commonjs 分配给 exports 对象;
            commonjs2 分配给 module.exports 对象;
            */
            libraryTarget: "commonjs2"
        },

        optimization: {
            minimize: true
        },

        resolve: {
            extensions: [".js", ".jsx", ".vue", ".json"],
            modules: [path.resolve("./node_modules")],
            alias: config.alias
        },

        externals: config.externals,

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
                            loader: "vue-loader",
                            options: {
                                compilerOptions: {
                                    preserveWhitespace: false
                                }
                            }
                        }
                    ]
                },

                {
                    test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
                    loader: "url-loader",
                    query: {
                        limit: 10000,
                        name: path.posix.join("static", "[name].[hash:7].[ext]")
                    }
                }
            ]
        },

        plugins: [new ProgressBarPlugin(), new VueLoaderPlugin()],

        performance: {
            hints: "warning"
        }
    };
};
