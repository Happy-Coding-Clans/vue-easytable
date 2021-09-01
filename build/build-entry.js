const fse = require("fs-extra");
const path = require("path");
const uppercamelize = require("uppercamelcase");

const Components = require("./common/get-components")();
const themesName = require("./common/themes-name");

const version = process.env.VERSION || require("../package.json").version;
const tips = "// This file is auto gererated by build/build-entry.js";

// build componenst json liast
function buildComponentsJson() {
    const importList = Components.map((name, index) => {
        return (
            `"${name}":"./packages/${name}/index.js"` +
            (index === Components.length - 1 ? "" : ",")
        );
    });
    const content = `
{
${importList.join("\n")}
}
`;

    fse.writeFileSync(path.join(__dirname, "../components.json"), content);
}

// build comps install entry
function buildCompsInstallEntry() {
    const uninstallComponents = [
        /*'demo'*/
    ];

    const importCompList = Components.map(
        (name) => `import ${uppercamelize(name)} from './${name}';`,
    );
    const exportList = Components.map((name) => `${uppercamelize(name)}`);
    const installList = exportList.filter(
        (name) => !~uninstallComponents.indexOf(uppercamelize(name)),
    );

    const content = `${tips}\r\n
${importCompList.join("\n")}


const version = '${version}';
const components = [
  ${installList.join(",\n  ")}
];

const install = Vue => {
  components.forEach(Component => {
    Vue.use(Component);
  });

  Vue.prototype.$veLoading = VeLoading;
  Vue.prototype.$veLocale = VeLocale;
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export {
  install,
  version,
  ${exportList.join(",\n  ")}
};

export default {
  install,
  version,
  ${exportList.join(",\n  ")}
};
`;

    fse.writeFileSync(path.join(__dirname, "../packages/index.js"), content);
}

// 创建主题入口
function buildCompsThemeEntry() {
    const outputFileName = ["index.less"];
    const excludesFileNames = ["var.less"];

    themesName.forEach((themeName) => {
        const dirs = fse.readdirSync(
            path.resolve(__dirname, `../packages/${themeName}`),
        );

        const compCssImportList = dirs
            .filter((name) => {
                return (
                    name != outputFileName &&
                    !excludesFileNames.includes(name) &&
                    !isDir(
                        path.join(
                            __dirname,
                            `../packages/${themeName}/${name}`,
                        ),
                    )
                );
            })
            .map((name) => `@import "./${name}";`);

        //const compCssImportList = compCssNames.filter(name => `import "./${name}";`);

        const content = `${tips}
        ${compCssImportList.join("\n  ")}
        `;

        fse.writeFileSync(
            path.join(__dirname, `../packages/${themeName}/index.less`),
            content,
        );
    });
}

function isDir(dir) {
    return fse.lstatSync(dir).isDirectory();
}

// build componenst json liast
buildComponentsJson();

// build comps install entry
buildCompsInstallEntry();

// build comps theme entry
buildCompsThemeEntry();
