const path = require('path');
const chalk = require('chalk');

exports.getSettings = function (env) {

    var settings = {
        // 通过代理访问的后台地址
        proxyTarget: 'http://localhost:15147/',

        // 当前启动的端口
        visitPort: '8098',

        // 是否调试模式
        isDebug: false,

        // 是否启用js、css压缩
        isMinimize: false,

        outputFolderName: '', // 发布目录名称

        path: {
            // 输出目录路径
            outputPath: '',

            /*
             * publish path
             * （发布目录）
             * */
            publicPath: '',

            // 当前路径
            srcPath: path.resolve('./'),

            /*
             * node_modules path
             */
            node_modulesPath: path.resolve('./node_modules'),

            /*
             *公共文件
             * */
            libsPath: '',
        }
    };


    if (env && env.dev) {

        settings.isDebug = true;
        settings.isMinimize = false;

        settings.outputFolderName = 'dist';

        settings.path.outputPath = "./";
        settings.path.publicPath = "/examples/"

    } else if (env && env.build) {

        settings.isDebug = false;
        settings.isMinimize = true;

        settings.outputFolderName = 'dist';

        settings.path.outputPath = "./";
        settings.path.publicPath = "./"

    } else if (env && env.dist) {


    } else {
        var msg;
        if (!env) {
            msg = 'setting.js error : In the script node of package.json, the parameter "env" can\'t be empty';

        } else {
            msg = 'setting.js error : In the script node of package.json,"env" Must be one of "build", "dev", or "dist"';

        }
        console.log(chalk.red(msg));
        return false;
    }

    return settings;
}