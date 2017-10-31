var path = require("path");
var webpack = require("webpack");
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function (env) {


    var entry = {
        index: "./build/build-umd.js"
    };

    var output = {
        path: path.join(__dirname, '../umd'),
        filename: "js/[name].js",
        chunkFilename: "js/[name].js"
    };

    var rules = [

        // babel-loader
        {
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /node_modules/
        },

        // vue loader
        {
            test: /\.vue$/,
            use: [
                {
                    loader: 'vue-loader'
                }
            ]
        },

        // css loader
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                use: 'css-loader?minimize',
                publicPath: '../'
            })
        },

        // img loader
        {
            test: /\.(ico|png|gif|jpe?g)(\?\S*)?$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10,
                    name: 'images/[name].[ext]'
                }
            }]
        },

        // font loader
        {
            test: /\.(eot|woff|woff2|ttf|svg)(\?\S*)?$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10,
                    name: 'font/[name].[ext]'
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

        /*
         * 1、暴露到全局变量
         * 2、先找 .resolve.alias 中的属性，若没找到会找 node_modules 下的文件，直到找到为止
         * */
        new webpack.ProvidePlugin({}),

        // 清空发布目录
        new CleanWebpackPlugin(['umd'], {
            root: path.resolve(__dirname, '../'), // An absolute path for the root  of webpack.config.js  // path.resolve(__dirname, '..')
            verbose: true, // Write logs to console.
            dry: false, // Do not delete anything, good for testing.
        }),
        new webpack.optimize.UglifyJsPlugin({ // js、css都会压缩
            mangle: {
                except: ['exports', 'require', 'module']
            },
            compress: {
                warnings: false
            },
            output: {
                comments: false,
            }
        }),
        new ExtractTextPlugin('css/index.css')

    ];

    var resolve = {
        extensions: ['.js', '.css', '.scss', '.ejs', '.png', '.jpg', '.vue'],
        modules: [path.resolve('./node_modules')],
        alias: {
            'vue$': 'vue/dist/vue'
        }
    }


    var config = {
        entry: entry,

        output: output,

        resolve: resolve,

        module: {
            rules: rules
        },

        plugins: plugins
    };

    return config;
}

