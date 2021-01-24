const fs = require("fs");
const path = require("path");
const themeNames = require("./themes-name");

module.exports = function() {
    const dirs = fs.readdirSync(path.resolve(__dirname, "../../packages"));
    let excludes = ["font", "src", "style", "index.js"];
    excludes = excludes.concat(themeNames);
    return dirs.filter(dirName => excludes.indexOf(dirName) === -1);
};
