const OpenBrowserPlugin = require("open-browser-webpack-plugin");
const path = require("path");

const PORT = 8111;

module.exports = {
    // 发布资源文件引用方式
    publicPath: "./",
    devServer: {
        port: PORT
    },

    transpileDependencies: ["highlight.js"],

    runtimeCompiler: true,

    configureWebpack: config => {
        return {
            devtool: "source-map",
            module: {
                rules: [
                    {
                        test: /\.md$/,
                        use: [
                            {
                                loader: "vue-loader",
                                options: {
                                    compilerOptions: {
                                        preserveWhitespace: false
                                    }
                                }
                            },
                            {
                                loader: path.resolve(
                                    __dirname,
                                    //`./build/md-loader/index.js?v=${new Date().getTime()}` // disable loader cache.
                                    `./build/md-loader/index.js` // disable loader cache.
                                )
                            }
                        ]
                    }
                ]
            },
            resolve: {
                alias: {
                    // 需要和组件库 alias 名称一致
                    "vue-easytable": path.resolve(__dirname, "../")
                }
            },
            plugins: [
                new OpenBrowserPlugin({ url: `http://localhost:${PORT}` })
            ]
        };
    }
};
