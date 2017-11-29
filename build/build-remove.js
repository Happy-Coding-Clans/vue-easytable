
const fs = require('fs');
const path = require('path');
const directory = path.join(__dirname, './../libs');

let rmDir = function (dirPath) {
    try {
        var files = fs.readdirSync(dirPath);
    }
    catch (e) {
        return;;
    }
    if (files.length > 0) {

        for (var i = 0; i < files.length; i++) {

            var filePath = dirPath + '/' + files[i];

            if (fs.statSync(filePath).isFile()) {

                fs.unlinkSync(filePath);
            }
            else {

                rmDir(filePath);
            }
        }
    }

    fs.rmdirSync(dirPath);

};

rmDir(directory,true);