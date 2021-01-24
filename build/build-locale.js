/*
build locale lang to umd for CDN and ES Module
*/
const fse = require("fs-extra");
const path = require("path");
const { libraryName } = require("./common");

const { resolve, basename } = path;
const localePath = resolve(__dirname, "../packages/src/locale/lang");
const fileList = fse.readdirSync(localePath);

const transform = function(filename, name, cb) {
    const moduleId = `${libraryName}/lang/${name}`;
    const moduleValue = `${libraryName}.lang.${name}`;

    require("@babel/core").transformFile(
        resolve(localePath, filename),
        {
            presets: [
                [
                    "@babel/preset-env",
                    {
                        loose: true,
                        modules: false
                    }
                ]
            ],
            plugins: [
                "@babel/plugin-external-helpers",
                [
                    "@babel/plugin-transform-modules-umd",
                    {
                        globals: {
                            [moduleId]: moduleValue
                        },
                        exactGlobals: true
                    }
                ]
            ],
            moduleId: moduleId
        },
        cb
    );
};

fileList
    .filter(function(file) {
        return /\.js$/.test(file);
    })
    .forEach(function(file) {
        const saveName = basename(file, ".js");
        const name = saveName.replace("-", "");

        transform(file, name, function(err, result) {
            if (err) {
                console.error(err);
            } else {
                let code = result.code;

                code = code.replace(
                    `global.${libraryName}.lang.${name} = mod.exports`,
                    `global.${libraryName}.lang.${name} = mod.exports.default`
                );

                const filePath = path.join(
                    __dirname,
                    `../libs/locale/lang/${saveName}.js`
                );

                fse.ensureFileSync(filePath);
                fse.writeFileSync(filePath, code);

                console.log(file);
            }
        });
    });
