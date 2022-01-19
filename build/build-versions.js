const fse = require("fs-extra");
const path = require("path");

const docVersions = require("../package.json").docVersions;

// build versions
function buildVersions() {
    fse.writeFileSync(
        path.join(__dirname, "../examples/public/versions.json"),
        JSON.stringify(docVersions),
    );
}

buildVersions();
