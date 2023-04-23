(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d224c89"],{e239:function(e,n,t){"use strict";t.r(n);var a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("section",{staticClass:"content example-md-doc"},[t("h2",[e._v("快速开始")]),t("anchor",{attrs:{"is-edit":"",label:"npm & yarn 安装",fileName:"start.md"}}),e._m(0),t("p",[e._v("或者")]),e._m(1),t("anchor",{attrs:{"is-edit":"",label:"使用",fileName:"start.md"}}),t("h4",[e._v("完整引入")]),t("p",[e._v("在 main.js 中写入以下内容：")]),e._m(2),t("p",[e._v("以上代码便完成了 vue-easytable 的引入。别忘了引入样式文件。")]),t("h4",[e._v("按需引入")]),t("p",[e._v("在 main.js 中写入以下内容：")]),e._m(3),t("h4",[e._v("示例")]),t("demo-block",[t("template",{slot:"source"},[t("element-demo0")],1),t("template",{slot:"highlight"},[t("pre",{pre:!0},[t("code",{pre:!0,attrs:{class:"html"}},[e._v('<template>\n    <ve-table :columns="columns" :table-data="tableData" />\n</template>\n\n<script>\n    export default {\n        data() {\n            return {\n                columns: [\n                    { field: "name", key: "a", title: "Name", align: "center" },\n                    { field: "date", key: "b", title: "Date", align: "left" },\n                    {\n                        field: "hobby",\n                        key: "c",\n                        title: "Hobby",\n                        align: "right",\n                    },\n                    {\n                        field: "address",\n                        key: "d",\n                        title: "Address",\n                    },\n                ],\n                tableData: [\n                    {\n                        name: "John",\n                        date: "1900-05-20",\n                        hobby: "coding and coding repeat",\n                        address: "No.1 Century Avenue, Shanghai",\n                    },\n                    {\n                        name: "Dickerson",\n                        date: "1910-06-20",\n                        hobby: "coding and coding repeat",\n                        address: "No.1 Century Avenue, Beijing",\n                    },\n                    {\n                        name: "Larsen",\n                        date: "2000-07-20",\n                        hobby: "coding and coding repeat",\n                        address: "No.1 Century Avenue, Chongqing",\n                    },\n                    {\n                        name: "Geneva",\n                        date: "2010-08-20",\n                        hobby: "coding and coding repeat",\n                        address: "No.1 Century Avenue, Xiamen",\n                    },\n                    {\n                        name: "Jami",\n                        date: "2020-09-20",\n                        hobby: "coding and coding repeat",\n                        address: "No.1 Century Avenue, Shenzhen",\n                    },\n                ],\n            };\n        },\n    };\n<\/script>\n')])])])],2),t("anchor",{attrs:{"is-edit":"",label:"CDN 方式使用",fileName:"start.md"}}),e._m(4),e._m(5),t("h4",[e._v("示例")]),e._m(6),t("anchor",{attrs:{"is-edit":"",label:"浏览器兼容",fileName:"start.md"}}),t("p",[e._v("默认支持现代浏览器和 IE10 及以上")])],1)},r=[function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("pre",[t("code",{staticClass:"language-javascript"},[e._v("npm install vue-easytable\n")])])},function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("pre",[t("code",{staticClass:"language-javascript"},[e._v("yarn add vue-easytable\n")])])},function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("pre",[t("code",{staticClass:"language-javascript"},[e._v('import Vue from "vue";\n// 引入样式\nimport "vue-easytable/libs/theme-default/index.css";\n// 引入组件库\nimport VueEasytable from "vue-easytable";\n\nVue.use(VueEasytable);\n\nnew Vue({\n    el: "#app",\n    render: (h) => h(App),\n});\n')])])},function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("pre",[t("code",{staticClass:"language-javascript"},[e._v('import Vue from "vue";\n// 引入样式\nimport "vue-easytable/libs/theme-default/index.css";\n// 引入组件库\nimport { VeTable, VePagination, VeIcon, VeLoading, VeLocale } from "vue-easytable";\n\nVue.use(VeTable);\nVue.use(VePagination);\nVue.use(VeIcon);\nVue.use(VeLoading);\n\nVue.prototype.$veLoading = VeLoading;\nVue.prototype.$veLocale = VeLocale;\n\nnew Vue({\n    el: "#app",\n    render: (h) => h(App),\n});\n')])])},function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("p",[e._v("通过 "),t("a",{attrs:{href:"https://unpkg.com/vue-easytable/"}},[e._v("https://unpkg.com/vue-easytable/")]),e._v(" 可以看到 vue-easytable 最新版本的资源，也可以切换版本选择需要的资源，在页面上引入 js 和 css 文件即可开始使用：")])},function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("pre",[t("code",{staticClass:"language-css"},[e._v('\x3c!-- 引入样式 --\x3e\n<link rel="stylesheet" href="https://unpkg.com/vue-easytable/libs/theme-default/index.css">\n\x3c!-- 引入Vue --\x3e\n<script src="https://cdn.jsdelivr.net/npm/vue@2"><\/script>\n\x3c!-- 引入组件库 --\x3e\n<script src="https://unpkg.com/vue-easytable/libs/umd/index.js"><\/script>\n')])])},function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("pre",[t("code",{staticClass:"language-html"},[e._v('<!DOCTYPE html>\n<html>\n    <head>\n        <meta charset="UTF-8" />\n        \x3c!-- 引入样式 --\x3e\n        <link\n            rel="stylesheet"\n            href="https://unpkg.com/vue-easytable/libs/theme-default/index.css"\n        />\n    </head>\n    <body>\n        <div id="app">\n            <ve-table :columns="columns" :table-data="tableData"></ve-table>\n        </div>\n    </body>\n    \x3c!-- 引入 Vue --\x3e\n    <script src="https://cdn.jsdelivr.net/npm/vue@2"><\/script>\n    \x3c!-- 引入组件库 --\x3e\n    <script src="https://unpkg.com/vue-easytable/libs/umd/index.js"><\/script>\n    <script>\n        new Vue({\n            el: "#app",\n            data: function () {\n                return {\n                    columns: [\n                        {\n                            field: "name",\n                            key: "a",\n                            title: "Name",\n                            align: "center",\n                        },\n                        {\n                            field: "date",\n                            key: "b",\n                            title: "Date",\n                            align: "left",\n                        },\n                        {\n                            field: "hobby",\n                            key: "c",\n                            title: "Hobby",\n                            align: "right",\n                        },\n                        { field: "address", key: "d", title: "Address" },\n                    ],\n                    tableData: [\n                        {\n                            name: "John",\n                            date: "1900-05-20",\n                            hobby: "coding and coding repeat",\n                            address: "No.1 Century Avenue, Shanghai",\n                        },\n                        {\n                            name: "Dickerson",\n                            date: "1910-06-20",\n                            hobby: "coding and coding repeat",\n                            address: "No.1 Century Avenue, Beijing",\n                        },\n                        {\n                            name: "Larsen",\n                            date: "2000-07-20",\n                            hobby: "coding and coding repeat",\n                            address: "No.1 Century Avenue, Chongqing",\n                        },\n                        {\n                            name: "Geneva",\n                            date: "2010-08-20",\n                            hobby: "coding and coding repeat",\n                            address: "No.1 Century Avenue, Xiamen",\n                        },\n                        {\n                            name: "Jami",\n                            date: "2020-09-20",\n                            hobby: "coding and coding repeat",\n                            address: "No.1 Century Avenue, Shenzhen",\n                        },\n                    ],\n                };\n            },\n        });\n    <\/script>\n</html>\n')])])}];function s(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?s(Object(t),!0).forEach((function(n){d(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):s(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function d(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var o={name:"component-doc",components:{"element-demo0":function(){var e=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[[t("ve-table",{attrs:{columns:e.columns,"table-data":e.tableData}})]],2)},n=[],t={data:function(){return{columns:[{field:"name",key:"a",title:"Name",align:"center"},{field:"date",key:"b",title:"Date",align:"left"},{field:"hobby",key:"c",title:"Hobby",align:"right"},{field:"address",key:"d",title:"Address"}],tableData:[{name:"John",date:"1900-05-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Shanghai"},{name:"Dickerson",date:"1910-06-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Beijing"},{name:"Larsen",date:"2000-07-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Chongqing"},{name:"Geneva",date:"2010-08-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Xiamen"},{name:"Jami",date:"2020-09-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Shenzhen"}]}}};return i({render:e,staticRenderFns:n},t)}()}},c=o,l=t("2877"),u=Object(l["a"])(c,a,r,!1,null,null,null);n["default"]=u.exports}}]);
//# sourceMappingURL=chunk-2d224c89.b953de96.js.map