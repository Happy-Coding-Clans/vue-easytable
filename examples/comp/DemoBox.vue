<template>
    <div>
        <!--效果展示-->
        <div class="example-effectHtml">
            <slot name="effectHtml"></slot>
        </div>

        <!--代码描述-->
        <div class="example-codeDescription" v-show="showDemo">
            <div class="example-codeDescription-title">
                <span class="example-codeDescription-title-span">代码描述</span>
            </div>
            <slot name="codeDescription"></slot>
        </div>

        <!--代码展示-->
        <div class="example-codeHighlight" v-show="showDemo">
            <div class="example-codeHighlight-tools" v-if="showCode">
                <i @click.stop="openJSFiddle()" title="在 JSFiddle 中打开"
                   class="example-codeHighlight-tools-i iconfont icon-bug"></i>
                <!--<i title="复制代码" class="example-codeHighlight-tools-i iconfont icon-fuzhi"></i>-->
            </div>
            <slot name="codeHighlight" v-if="showCode"></slot>
            <div class="example-codeHighlight-showCode" @click="showCodeToggle()">
                <i :class="[showCode?'v-icon-up-dir':'v-icon-down-dir']"></i>
                <span>{{showCode ? '收起代码' : '显示代码'}}</span>
            </div>

        </div>

    </div>
</template>

<script>

    export default{
        name: 'demo-box',

        props: {

            showDemo: {
                type: Boolean,
                default: false
            },
            jsfiddle: {
                type: Object,
                default() {
                    return {};
                }
            }
        },

        data(){

            return {

                showCode: false

            }
        },
        methods: {
            showCodeToggle(){

                this.showCode = !this.showCode;

            },

            openJSFiddle(){

                const {script, html, style} = this.jsfiddle;

                const scriptTpl = [
                    '<script src="//unpkg.com/vue/dist/vue.js"></scr' + 'ipt>',
                    '<script src="//unpkg.com/vue-easytable/umd/js/index.js"></scr' + 'ipt>',
                ].join('\n');

                let jsTpl = (script || '').replace(/export default/, 'var Main =').replace(/import Vue from 'vue'/,'').trim();

                jsTpl = jsTpl
                    ? jsTpl + '\nvar Ctor = Vue.extend(Main)\nnew Ctor().$mount(\'#app\')'
                    : 'new Vue().$mount(\'#app\')';

                const data = {
                    js: jsTpl,
                    css: `@import url("//unpkg.com/vue-easytable/umd/css/index.css");\n${(style || '').trim()}\n`,
                    html: `${scriptTpl}\n<div id="app">\n${html.trim()}\n</div>`,
                    panel_js: 3,
                    panel_css: 1
                };

                const form = document.getElementById('fiddle-form') || document.createElement('form');
                form.innerHTML = '';
                const node = document.createElement('textarea');

                form.method = 'post';
                form.action = 'https://jsfiddle.net/api/post/library/pure/';
                form.target = '_blank';

                for (let name in data) {
                    node.name = name;
                    node.value = data[name].toString();
                    form.appendChild(node.cloneNode());
                }
                form.setAttribute('id', 'fiddle-form');
                form.style.display = 'none';
                document.body.appendChild(form);

                form.submit();
            }
        }

    }
</script>