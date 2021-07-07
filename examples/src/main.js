// polyfills
import "core-js/stable";
import "regenerator-runtime/runtime";

import Vue from "vue";
import APP from "@/comp/app.vue";
import router from "@/router/index";

import NProgress from "nprogress"; // Progress 进度条

import "@/css/index.scss";
import "@/css/custom.scss";
import "@/comp/app.scss";

// Progress 进度条 样式
import "nprogress/nprogress.css";
// highlight theme
import hljs from "highlight.js";
import "highlight.js/styles/color-brewer.css";

import DemoBlock from "@/comp/demo-block.vue";
import Anchor from "@/comp/anchor.vue";
Vue.component("demo-block", DemoBlock);
Vue.component("anchor", Anchor);

// 仅用作示例
import { Switch, Row, Col, RadioButton, RadioGroup } from "element-ui";
Vue.use(Switch);
Vue.use(Row);
Vue.use(Col);
Vue.use(RadioButton);
Vue.use(RadioGroup);

// vue-lazy-container
import VueLazyContainer from "vue-lazy-container";
Vue.use(VueLazyContainer);

// product
/* import "../../libs/theme-default/index.css";
import {
    VeCheckbox,
    VeCheckboxGroup,
    VeDropdown,
    VeIcon,
    VeLoading,
    VeLocale,
    VePagination,
    VeRadio,
    VeSelect,
    VeTable
} from "../../libs/main.js";
import zhCN from "../../libs/locale/lang/zh-CN";
import enUS from "../../libs/locale/lang/en-US";
VeLocale.use(zhCN); */

// 设置当前环境
window.env = process.env.NODE_ENV === "development" ? "dev" : "pro";

/*
dev mode
1、生产环境使用已发布的样式文件，参考 theme-switch-mixins.js
*/

if (window.env === "dev") {
    require("../../packages/theme-default/index.less");
}

import {
    VeCheckbox,
    VeCheckboxGroup,
    VeDropdown,
    VeIcon,
    VeLoading,
    VeLocale,
    VePagination,
    VeRadio,
    VeSelect,
    VeTable
} from "../../packages/index.js";

Vue.use(VeCheckbox);
Vue.use(VeCheckboxGroup);
Vue.use(VeDropdown);
Vue.use(VeIcon);
Vue.use(VePagination);
Vue.use(VeRadio);
Vue.use(VeSelect);
Vue.use(VeTable);

Vue.prototype.$veLoading = VeLoading;
Vue.prototype.$veLocale = VeLocale;

// 全部引入
/* import "../../packages/theme-default/index.less";
import vueEasytable from "../../packages/index.js";
Vue.use(vueEasytable); */

/* import "../../libs/theme-default/index.css";
import vueEasytable from "../../libs/main.js";
Vue.use(vueEasytable); */

router.beforeEach((to, from, next) => {
    NProgress.start();

    next();

    NProgress.done();
});

router.afterEach(() => {
    Vue.nextTick(() => {
        const blocks = document.querySelectorAll("pre code:not(.hljs)");
        Array.prototype.forEach.call(blocks, hljs.highlightBlock);

        window.scroll(0, 0);
    });
    NProgress.done(); // 结束Progress
});

new Vue({
    el: "#app",
    router,
    render: h => h(APP)
});
