var striptags = require('./strip-tags');

var hljs = require('highlight.js');
var md = require('markdown-it')({
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str, true).value;
            } catch (__) {
            }
        }

        return ''; // use external default escaping
    }
});

function convert(str) {
    str = str.replace(/(&#x)(\w{4});/gi, function ($0) {
        return String.fromCharCode(parseInt(encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, '$2'), 16));
    });
    return str;
}

var wrap = function (render) {
    return function () {
        return render.apply(this, arguments)
            .replace('<code v-pre class="', '<code v-pre class="hljs ')
            .replace('<code>', '<code class="hljs">');
    };
};

exports.getMarkDownSetting = function () {

    return {
        // markdown-it config
        preset: 'default',
        breaks: true,
        preprocess: function (MarkdownIt, source) {
            /*// 李森森补充（可以不需要重复的书写script内容）
             var Token = require('markdown-it/lib/token');

             // 从html 里提取 <style>、<script> 标签内容
             let tag_reg=new RegExp("<(script|style)(?:[^<]|<)+<\/\\1>",'g');
             MarkdownIt.core.ruler.push('extract_style_script', function replace(state) {

             let newTokens=[];
             state.tokens.filter(token => token.type == 'fence' && token.info == 'html').forEach(token => {

             let tokens = (token.content.match(tag_reg) || []).map(content => {
             let t = new Token('html_block', '', 0);
             t.content = content;
             return t;
             });

             if (tokens.length > 0) {
             newTokens.push.apply(newTokens,tokens);
             }
             })
             state.tokens.push.apply(state.tokens, newTokens);
             });*/

            MarkdownIt.renderer.rules.table_open = function () {
                return '<table class="example-table">';
            };

            MarkdownIt.renderer.rules.fence = wrap(MarkdownIt.renderer.rules.fence);

            return source;
        },
        use: [
            /* markdown-it plugin */
            /* or */
            [require('markdown-it-container'), 'demo', {
                validate: function (params) {

                    return params.trim().match(/^demo/);
                },


                render: function (tokens, idx) {

                    var m = tokens[idx].info.trim().match(/^demo\s*(.*)$/),
                        showDemo = (m && m != 'demo,') ? true : false;


                    if (tokens[idx].nesting === 1) {
                        // opening tag
                        var content = tokens[idx + 1].content;
                        var effectHtml = convert(striptags.strip(content, ['script', 'style'])).replace(/(<[^>]*)=""(?=.*>)/g, '$1');

                        //var codeDescription = showDemo ? md.utils.escapeHtml(m[1]) : '';
                        var codeDescription = '';

                        if (showDemo) { // 换行显示

                            var descArr = m[1].split('<br>');

                            descArr.forEach(item => {

                                codeDescription += md.render(item);
                            })
                        }

                        return `<demo-box
                                    :showDemo="${showDemo}">
                                 <div slot="effectHtml">${effectHtml}</div>
                                 <div slot="codeDescription">${codeDescription}</div>
                                 <div slot="codeHighlight">
                                `

                    } else {
                        // closing tag
                        return '</div></demo-box>\n';
                    }
                }

            }]
        ]
    }
}


