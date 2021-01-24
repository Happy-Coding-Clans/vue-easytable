const Config = require("markdown-it-chain");
const anchorPlugin = require("markdown-it-anchor");
const slugify = require("transliteration").slugify;
const containers = require("./containers");
const overWriteFenceRule = require("./fence");

const config = new Config();

function renderContent(source, resourceFileName) {
    config.options
        .html(true)
        .end()

        /*  .plugin("anchor")
    .use(anchorPlugin, [
        {
            slugify: slugify,
            permalink: true,
            permalinkBefore: true,
            permalinkClass: "header-anchor",
            permalinkSymbol: "#"
        }
    ])
    .end() */

        .plugin("containers")
        .use(containers, [{ resourceFileName }])
        .end();

    const md = config.toMd();
    overWriteFenceRule(md);
    return md.render(source);
}

module.exports = { renderContent };
