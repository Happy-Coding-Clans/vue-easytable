
const { exec } = require('child_process');


// 将es6 转 es5
exec('babel packages --out-dir libs', (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
});



