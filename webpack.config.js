var path = require("path");
var webpack = require("webpack");

// 将 manifest 提取到一个单独的 JSON 文件（类似的插件有 webpack-manifest-plugin、chunk-manifest-webpack-plugin、assets-webpack-plugin）
var ManifestPlugin = require('webpack-manifest-plugin');

// 基于 'chunk-manifest-webpack-plugin' 的插件，解决 manifest.js 版本号不变化 导致 long-term caching 的问题
var InlineChunkManifestHtmlWebpackPlugin = require('inline-chunk-manifest-html-webpack-plugin');


// 根据文件内容生成hash值（同类的插件还有webpack-md5-hash）
var WebpackChunkHash = require("webpack-chunk-hash");

// 生成包含引用资源的html
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 将css 提取到单独的文件
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// 清除发布目录
var CleanWebpackPlugin = require('clean-webpack-plugin');

// 自动打开浏览器
var OpenBrowserPlugin = require('open-browser-webpack-plugin');


var settings = require('./build/webpack.settings.js');

var markdown = require('./build/webpack.markdown.js');


module.exports = function (env) {


    // 获取配置常量
    var SETTINGS = settings.getSettings(env);


    var entry = {
        app: "./examples/app.js", // application code
        vendors: [
            'babel-polyfill',
            'vue',
            'vue-router'
        ]
    };

    var output = {
        path: path.join(__dirname, SETTINGS.path.outputPath, SETTINGS.outputFolderName),
        filename: SETTINGS.isDebug ? "js/[name].js" : "js/[name].[chunkhash:8].js",
        chunkFilename: SETTINGS.isDebug ? "js/[name].js" : "js/[name].[chunkhash:8].js"
    };

    var rules = [

        // babel-loader
        {
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /node_modules/
        },

        /*markdown 配置*/
        {
            test: /\.md$/,
            use: [
                {
                    loader: 'vue-markdown-loader',
                    options: markdown.getMarkDownSetting()
                }
            ]
        },

        // vue loader
        {
            test: /\.vue$/,
            use: [
                {
                    loader: 'vue-loader',
                    options: {
                        extractCSS: true
                    }
                }
            ]

        },

        // css loader
        {
            test: /\.css$/,
            use: SETTINGS.isDebug ? [
                'style-loader',
                'css-loader'
            ] : ExtractTextPlugin.extract({
                use: SETTINGS.isMinimize ? 'css-loader?minimize' : 'css-loader',
                publicPath: '../'
            })
        },

        // img loader
        {
            test: /\.(ico|png|gif|jpe?g)(\?\S*)?$/,
            use: [{
                loader: 'url-loader',
                options: {
                    /*
                     *  limit=10000 ： 10kb
                     *  图片小于10kb 采用内联的形式，否则输出图片
                     * */
                    limit: 10000,
                    name: 'images/[name]-[hash:8].[ext]'
                }
            }]
        },

        // font loader
        {
            test: /\.(eot|woff|woff2|ttf|svg)(\?\S*)?$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 5000,
                    name: 'font/[name]-[hash:8].[ext]'
                }
            }]

        },

        // csv|tsv loader
        {
            test: /\.(csv|tsv)$/,
            use: [
                'csv-loader'
            ]
        },

        // xml loader
        {
            test: /\.xml$/,
            use: [
                'xml-loader'
            ]
        }
    ];

    var plugins = [
        // 将公共库(vendor)和应用程序代码分离开来，并创建一个显式的 vendor chunk 以防止它频繁更改
        new webpack.optimize.CommonsChunkPlugin({
            name: ["vendors", "manifest"], // vendor libs   extracted manifest
            minChunks: Infinity,
        }),

        // 生成保存在构建中的标识符（开发模式用NamedModulesPlugin）
        new webpack.HashedModuleIdsPlugin(),

        // 根据文件内容生成hash值
        new WebpackChunkHash(),

        // 生成文件与版本号映射文件
        new ManifestPlugin({
            fileName: 'fileMaps.json',
            basePath: ''
        }),

        // 全局标识
        new webpack.DefinePlugin({
            // 开发标识
            __DEV__: SETTINGS.isDebug,

            // 代理的标识
            __DEVAPI__: SETTINGS.isDebug ? "/devApi/" : "''", // 热更新和后端服务结合的标识

            // 去除vue的所有警告代码：http://vue-loader.vuejs.org/en/workflow/production.html
            'process.env': SETTINGS.isDebug ? {
                NODE_ENV: '"production"'
            } : {}
        }),

        /*
         * 1、暴露到全局变量
         * 2、先找 .resolve.alias 中的属性，若没找到会找 node_modules 下的文件，直到找到为止
         * */
        new webpack.ProvidePlugin({}),

        // 清空发布目录
        new CleanWebpackPlugin([SETTINGS.outputFolderName], {
            root: path.resolve(__dirname, SETTINGS.path.outputPath), // An absolute path for the root  of webpack.config.js  // path.resolve(__dirname, '..')
            verbose: true, // Write logs to console.
            dry: false, // Do not delete anything, good for testing.
        }),

        // 创建html
        new HtmlWebpackPlugin({
            filename: 'app.html',
            template: __dirname + '/examples/app.html',
            inject: 'true',

            // 需要依赖的模块
            chunks: ['app', 'vendors', 'manifest'],

            // 根据依赖自动排序
            chunksSortMode: 'dependency'
        }),
        new InlineChunkManifestHtmlWebpackPlugin({
            dropAsset: true, // 不产生文件
        })

    ];

    var resolve = {
        extensions: ['.js', '.css', '.scss', '.ejs', '.png', '.jpg', '.vue'],
        modules: [SETTINGS.path.node_modulesPath],
        alias: {
            'vue$': 'vue/dist/vue'
        }
    }

    var devServer = {};

    if (SETTINGS.isDebug) {


        // 启用 HMR
        plugins.push(new webpack.HotModuleReplacementPlugin());

        // 编译完成自动打开浏览器
        plugins.push(new OpenBrowserPlugin({url: 'http://localhost:' + SETTINGS.visitPort + SETTINGS.path.publicPath + 'app.html'}));


        devServer = {
            hot: true, // 告诉 dev-server 我们在使用 HMR
            contentBase: path.join(__dirname, SETTINGS.path.outputPath, SETTINGS.outputFolderName),
            publicPath: SETTINGS.path.publicPath,
            port: SETTINGS.visitPort,
            compress: true,
            inline: true,
            stats: "errors-only",

            /*
             *  设置代理访问
             */
            proxy: {
                '/devApi': {
                    target: SETTINGS.proxyTarget,
                    /*
                     * rewrite 的方式扩展性更强，不限制服务的名称
                     * */
                    pathRewrite: {'^/devApi': ''}
                }
            }
        }

        plugins.push(new ExtractTextPlugin('css/style.css'))
    } else {

        // 将css 提取到单独的文件中
        plugins.push(new ExtractTextPlugin('css/[name]-[contenthash:8].css'))

    }

    if (SETTINGS.isMinimize) {
        plugins.push(
            // 启用压缩
            new webpack.optimize.UglifyJsPlugin({ // js、css都会压缩
                mangle: {
                    except: ['$super', '$', 'exports', 'require', 'module', '_']
                },
                compress: {
                    warnings: false
                },
                output: {
                    comments: false,
                }
            })
        )
    }


    var config = {
        entry: entry,

        output: output,

        resolve: resolve,

        module: {
            rules: rules
        },

        plugins: plugins,

        devServer: devServer
    };

    return config;
}

