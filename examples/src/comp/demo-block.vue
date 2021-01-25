<template>
    <div
        class="demo-block"
        :class="[{ hover: hovering }]"
        @mouseenter="hovering = true"
        @mouseleave="hovering = false"
    >
        <div class="source">
            <slot name="source"></slot>
        </div>
        <div v-if="$slots.default" class="description">
            <div class="title-container">
                <span class="title"> {{ demoLangInfo.description }}</span>
            </div>
            <div class="content">
                <slot></slot>
            </div>
        </div>
        <div ref="meta" class="meta">
            <div class="highlight">
                <slot name="highlight"></slot>
            </div>
        </div>
        <div
            ref="control"
            class="demo-block-control"
            :style="{ width: getDemoBlockControlWidth }"
            :class="{ 'is-fixed': fixedControl }"
            @click="isExpanded = !isExpanded"
        >
            <i
                :class="['arraw-slide-icon', iconClass, { hovering: hovering }]"
            ></i>
            <transition name="text-slide">
                <span v-show="hovering" class="slide-content">{{
                    controlText
                }}</span>
            </transition>
            <transition name="text-slide">
                <div
                    v-show="hovering || isExpanded"
                    size="small"
                    type="text"
                    class="slide-content codePenBtn"
                    @click.stop="goCodepen"
                >
                    {{ demoLangInfo.runInline }}
                </div>
            </transition>
        </div>
    </div>
</template>

<script type="text/babel">
import { stripScript, stripStyle, stripTemplate } from "@/utils/index";
// 最外层
import { version } from "../../../package.json";

import locale from "./locale";
import I18nMixins from "./mixins/i18n-mixins";

export default {
    mixins: [I18nMixins],
    data() {
        return {
            codepen: {
                script: "",
                html: "",
                style: ""
            },
            hovering: false,
            isExpanded: false,
            fixedControl: false,
            scrollParent: null
        };
    },

    computed: {
        // demo lang info
        demoLangInfo() {
            return locale[this.currentDocLang]["demo"];
        },

        iconClass() {
            return this.isExpanded
                ? "iconfont icon-arrow-up"
                : "iconfont icon-arrow-down";
        },

        controlText() {
            return this.isExpanded
                ? this.demoLangInfo.foldCode
                : this.demoLangInfo.expandCode;
        },

        codeArea() {
            return this.$el.getElementsByClassName("meta")[0];
        },

        codeAreaHeight() {
            if (this.$el.getElementsByClassName("description").length > 0) {
                return this.$el.getElementsByClassName("highlight")[0]
                    .clientHeight;
            }
            return this.$el.getElementsByClassName("highlight")[0].clientHeight;
        },

        getDemoBlockControlWidth() {
            let result = "100%";

            if (this.fixedControl) {
                result =
                    document.querySelector(".demo-block").clientWidth + "px";
            }

            return result;
        }
    },

    watch: {
        isExpanded(val) {
            this.codeArea.style.height = val
                ? `${this.codeAreaHeight + 1}px`
                : "0";
            if (!val) {
                this.fixedControl = false;
                this.$refs.control.style.left = "0";
                this.removeScrollHandler();
                return;
            }
            setTimeout(() => {
                document.addEventListener("scroll", this.scrollHandler);
                this.scrollHandler();
            }, 200);
        }
    },

    methods: {
        goCodepen() {
            const { script, html, style } = this.codepen;
            const resourcesTpl =
                "<scr" +
                'ipt src="//unpkg.com/vue/dist/vue.js"></scr' +
                "ipt>" +
                "\n<scr" +
                `ipt src="//unpkg.com/vue-easytable@${version}/libs/umd/index.js"></scr` +
                "ipt>";
            let jsTpl = (script || "")
                .replace(/export default/, "var Main =")
                .trim();
            let htmlTpl = `${resourcesTpl}\n<div id="app">\n${html.trim()}\n</div>`;
            let cssTpl = `@import url("//unpkg.com/vue-easytable@${version}/libs/theme-default/index.css");\n${(
                style || ""
            ).trim()}\n`;
            jsTpl = jsTpl
                ? jsTpl +
                  "\nvar Ctor = Vue.extend(Main)\nnew Ctor().$mount('#app')"
                : "new Vue().$mount('#app')";
            const data = {
                js: jsTpl,
                css: cssTpl,
                html: htmlTpl
            };
            const form =
                document.getElementById("fiddle-form") ||
                document.createElement("form");
            while (form.firstChild) {
                form.removeChild(form.firstChild);
            }
            form.method = "POST";
            form.action = "https://codepen.io/pen/define/";
            form.target = "_blank";
            form.style.display = "none";

            const input = document.createElement("input");
            input.setAttribute("name", "data");
            input.setAttribute("type", "hidden");
            input.setAttribute("value", JSON.stringify(data));

            form.appendChild(input);
            document.body.appendChild(form);

            form.submit();
        },

        scrollHandler() {
            const {
                top,
                bottom,
                left
            } = this.$refs.meta.getBoundingClientRect();
            // 44px 为自身高度
            this.fixedControl =
                bottom > document.documentElement.clientHeight &&
                top + 44 <= document.documentElement.clientHeight;

            this.$refs.control.style.left = this.fixedControl
                ? `${left}px`
                : "0";
        },

        removeScrollHandler() {
            document.removeEventListener("scroll", this.scrollHandler);
        }
    },

    created() {
        const highlight = this.$slots.highlight;
        if (highlight && highlight[0]) {
            let code = "";
            let cur = highlight[0];
            if (cur.tag === "pre" && cur.children && cur.children[0]) {
                cur = cur.children[0];
                if (cur.tag === "code") {
                    code = cur.children[0].text;
                }
            }
            if (code) {
                this.codepen.html = stripTemplate(code);
                this.codepen.script = stripScript(code);
                this.codepen.style = stripStyle(code);
            }
        }
    },

    mounted() {
        this.$nextTick(() => {
            let highlight = this.$el.getElementsByClassName("highlight")[0];
            if (this.$el.getElementsByClassName("description").length === 0) {
                highlight.style.width = "100%";
                highlight.borderRight = "none";
            }
        });
    },

    beforeDestroy() {
        this.removeScrollHandler();
    }
};
</script>

<style lang="scss">
.demo-block {
    border: solid 1px #ebebeb;
    border-radius: 3px;
    transition: 0.2s;

    &.hover {
        box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
            0 2px 4px 0 rgba(232, 237, 250, 0.5);
    }

    &.demo-icon {
        .source > div i {
            margin: 0 24px;
            font-size: 30px;
        }
    }

    code {
        font-family: Menlo, Monaco, Consolas, Courier, monospace;
    }

    .demo-button {
        float: right;
    }

    .source {
        padding: 24px;
    }

    .description {
        box-sizing: border-box;
        border-radius: 3px;
        font-size: 14px;
        line-height: 22px;
        color: #666;
        word-break: break-word;
        margin-top: 50px;
        background-color: #fff;

        .title-container {
            font-weight: 500;
            position: relative;
            &:before {
                content: "";
                display: block;
                width: 100%;
                height: 1px;
                background: #eee;
                position: absolute;
                top: 10px;
                left: 0;
            }
            .title {
                display: inline-block;
                background: #fff;
                padding: 0 10px 0 10px;
                position: relative;
                margin-left: 30px;
                font-size: 14px;
            }
        }

        .content {
            margin: 20px;
            p {
                margin: 0;
                line-height: 26px;
            }

            code {
                color: #5e6d82;
                background-color: #e6effb;
                margin: 0 4px;
                display: inline-block;
                padding: 1px 5px;
                font-size: 12px;
                border-radius: 3px;
                height: 18px;
                line-height: 18px;
            }
        }
    }

    .meta {
        background-color: #fff;
        overflow: hidden;
        height: 0;
        transition: height 0.2s;

        .highlight {
            pre {
                margin: 0;
            }

            code.hljs {
                margin: 0;
                max-height: none;
                border-radius: 0;
                border-bottom: none;
                &::before {
                    content: none;
                }
            }
        }
    }

    .demo-block-control {
        border-top: solid 1px #eaeefb;
        height: 44px;
        box-sizing: border-box;
        background-color: #fff;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        text-align: center;
        margin-top: -1px;
        color: #d3dce6;
        cursor: pointer;
        position: relative;

        &.is-fixed {
            position: fixed;
            bottom: 0;
            width: 868px;
        }

        .arraw-slide-icon {
            display: inline-block;
            font-size: 16px;
            line-height: 44px;
            transition: 0.3s;
            &.hovering {
                transform: translateX(-40px);
            }
        }

        .slide-content {
            position: absolute;
            transform: translateX(-30px);
            font-size: 14px;
            line-height: 44px;
            transition: 0.3s;
            display: inline-block;
        }

        &:hover {
            color: #409eff;
            background-color: #f9fafc;
        }

        & .text-slide-enter,
        & .text-slide-leave-active {
            opacity: 0;
            transform: translateX(10px);
        }

        .codePenBtn {
            line-height: 44px;
            position: absolute;
            top: 0;
            right: 0;
            font-size: 14px;
            padding-right: 20px;
        }
    }
}
</style>
