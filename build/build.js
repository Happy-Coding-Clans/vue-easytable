
const path = require('path')
const fs = require('fs')
const fsExtra = require('fs-extra')

const { exec } = require('child_process');

let copyFrom = path.join(__dirname, './../packages'),
    copyTo = path.join(__dirname,  './../dist-lib/packages');

fsExtra.copy(copyFrom,copyTo, err => {
    if (err) return console.error(err)
    console.log(`Copy from ${copyFrom} to ${copyTo} success!`)
})


exec('babel packages --out-dir dist-lib/packages', (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
});

exec('babel src --out-dir dist-lib/src', (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
});