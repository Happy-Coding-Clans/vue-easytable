/*
build locale lang
暂未使用！！
*/

/* const { exec } = require("child_process"); */

/*
compile locale lang
need pkgs: @babel/cli @babel/preset-env
*/
/* function compileLocaleLang() {
    exec(
        "babel packages/src/locale --out-dir libs/locale --presets=@babel/env --ignore packages/src/locale/index.js",
        (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`compile locale lang: \r\n${stdout}`);
        }
    );
}

compileLocaleLang(); */
