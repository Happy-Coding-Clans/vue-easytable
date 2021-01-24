/*
fork by https://github.com/ElemeFE/element/blob/dev/build/md-loader/index.js
*/
//const { getOptions } = require("loader-utils");
const path = require("path");
const {
    stripScript,
    stripStyle,
    stripTemplate,
    genInlineComponentText
} = require("./util");
const md = require("./config");
// https://regexr.com/47jlq
const IMPORT_RE = /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from\s+?)|)(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g;

module.exports = function(source) {
    const content = md.renderContent(source, path.basename(this.resourcePath));

    const startTag = "<!--element-demo:";
    const startTagLen = startTag.length;
    const endTag = ":element-demo-->";
    const endTagLen = endTag.length;

    let componenetsString = "";
    let id = 0; // demo 的 id
    let htmlOutput = []; // 输出的html内容
    let styleOutput = []; // 输出的style内容
    let start = 0; // 字符串开始位置
    let importMods = null; // 依赖项

    let commentStart = content.indexOf(startTag);
    let commentEnd = content.indexOf(endTag, commentStart + startTagLen);
    while (commentStart !== -1 && commentEnd !== -1) {
        htmlOutput.push(content.slice(start, commentStart));

        const commentContent = content.slice(
            commentStart + startTagLen,
            commentEnd
        );
        const html = stripTemplate(commentContent);
        // add style
        const style = stripStyle(commentContent);
        let script = stripScript(commentContent);

        // 去除 import 引入
        importMods = script.match(IMPORT_RE);
        if (importMods) {
            script = script.replace(IMPORT_RE, "");
        }

        styleOutput.push(style);

        let demoComponentContent = genInlineComponentText(html, script);

        const demoComponentName = `element-demo${id}`;
        htmlOutput.push(
            `<template slot="source"><${demoComponentName} /></template>`
        );
        componenetsString += `${JSON.stringify(
            demoComponentName
        )}: ${demoComponentContent},`;

        // 重新计算下一次的位置
        id++;
        start = commentEnd + endTagLen;
        commentStart = content.indexOf(startTag, start);
        commentEnd = content.indexOf(endTag, commentStart + startTagLen);
    }

    // 仅允许在 demo 不存在时，才可以在 Markdown 中写 script 标签
    // todo: 优化这段逻辑
    let pageScript = "";
    if (componenetsString) {
        pageScript = `<script>
        ${importMods && importMods.join("\r\n")}
      export default {
        name: 'component-doc',
        components: {
          ${componenetsString}
        }
      }
    </script>`;
    } else if (content.indexOf("<script>") === 0) {
        // 硬编码，有待改善
        start = content.indexOf("</script>") + "</script>".length;
        pageScript = content.slice(0, start);
    }

    htmlOutput.push(content.slice(start));

    return `
    <template>
      <section class="content example-md-doc">
        ${htmlOutput.join("")}
      </section>
    </template>
    ${pageScript}
    <style lang="less">
      ${styleOutput.join("\r\n")}
    </style>
  `;
};
