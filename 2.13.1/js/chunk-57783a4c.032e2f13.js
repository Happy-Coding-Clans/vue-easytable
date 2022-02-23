(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-57783a4c"],{"89a0":function(e,n,t){"use strict";t("a771")},a1fe:function(e,n,t){"use strict";t.r(n);var o=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("h2",[e._v("Loading 加载")]),t("Usage"),t("Container"),t("Fullscreen"),t("Custom"),t("Collection"),t("Api")],1)},a=[],r=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("section",{staticClass:"content example-md-doc"},[t("anchor",{attrs:{"is-edit":"",label:"使用方法",fileName:"usage.md"}}),t("p",[e._v("在你需要的地方引用")]),e._m(0),t("p",[e._v("调用")]),e._m(1),t("anchor",{attrs:{"is-edit":"",label:"全局使用",fileName:"usage.md"}}),t("p",[e._v("将 veLoading 组件挂载到 Vue 的 prototype 原型上，便于全局调用")]),e._m(2),t("p",[e._v("调用")]),e._m(3)],1)},i=[function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("pre",[t("code",{staticClass:"language-javascript"},[e._v('import Vue from "vue";\nimport { veLoading } from "vue-easytable";\n')])])},function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("pre",[t("code",{staticClass:"language-javascript"},[e._v('veLoading({\n    target: "#loading-1",\n    name: "grid",\n    tip: "loading...",\n});\n')])])},function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("pre",[t("code",{staticClass:"language-javascript"},[e._v('import Vue from "vue";\nimport { veLoading } from "vue-easytable";\n\nVue.prototype.$veLoading = veLoading;\n')])])},function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("pre",[t("code",{staticClass:"language-javascript"},[e._v('this.$veLoading({\n    target: "#loading-1",\n    name: "grid",\n    tip: "loading...",\n});\n')])])}],c=t("2877"),s={},d=Object(c["a"])(s,r,i,!1,null,null,null),l=d.exports,u=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("section",{staticClass:"content example-md-doc"},[t("anchor",{attrs:{"is-edit":"",label:"区域加载",fileName:"container.md"}}),t("p",[e._v("在表格等容器中显示 Loading 效果")]),t("demo-block",[t("div",[t("p",[e._v("1、通过 "),t("code",[e._v("target")]),e._v(" 参数指定 Loading 的容器。"),t("code",[e._v("target")]),e._v("为 DOM 对象或 字符串选择器（可以通过"),t("code",[e._v("document.querySelector")]),e._v("获取的字符串）"),t("br"),e._v("2、"),t("code",[e._v("name")]),e._v("参数指定加载效果类型名称"),t("br"),e._v("3、Loading 实例包含"),t("code",[e._v("show")]),e._v("、"),t("code",[e._v("close")]),e._v("、"),t("code",[e._v("destroy")]),e._v("3 个方法")])]),t("template",{slot:"source"},[t("element-demo0")],1),t("template",{slot:"highlight"},[t("pre",{pre:!0},[t("code",{pre:!0,attrs:{class:"html"}},[e._v('<template>\n    <div>\n        <button class="button-demo" @click="show()">开启 Loading</button>\n        <button class="button-demo" @click="close()">关闭 Loading</button>\n        <br />\n        <br />\n        <ve-table id="loading-container" :columns="columns" :table-data="tableData" />\n    </div>\n</template>\n<script>\n    export default {\n        data() {\n            return {\n                loadingInstance: null,\n                columns: [\n                    { field: "name", key: "a", title: "Name", align: "center" },\n                    { field: "date", key: "b", title: "Date", align: "left" },\n                    {\n                        field: "hobby",\n                        key: "c",\n                        title: "Hobby",\n                        align: "right",\n                    },\n                    { field: "address", key: "d", title: "Address" },\n                ],\n                tableData: [\n                    {\n                        name: "John",\n                        date: "1900-05-20",\n                        hobby: "coding and coding repeat",\n                        address: "No.1 Century Avenue, Shanghai",\n                    },\n                    {\n                        name: "Dickerson",\n                        date: "1910-06-20",\n                        hobby: "coding and coding repeat",\n                        address: "No.1 Century Avenue, Beijing",\n                    },\n                    {\n                        name: "Larsen",\n                        date: "2000-07-20",\n                        hobby: "coding and coding repeat",\n                        address: "No.1 Century Avenue, Chongqing",\n                    },\n                    {\n                        name: "Geneva",\n                        date: "2010-08-20",\n                        hobby: "coding and coding repeat",\n                        address: "No.1 Century Avenue, Xiamen",\n                    },\n                    {\n                        name: "Jami",\n                        date: "2020-09-20",\n                        hobby: "coding and coding repeat",\n                        address: "No.1 Century Avenue, Shenzhen",\n                    },\n                ],\n            };\n        },\n        methods: {\n            show() {\n                this.loadingInstance.show();\n            },\n            close() {\n                this.loadingInstance.close();\n            },\n        },\n        mounted() {\n            this.loadingInstance = this.$veLoading({\n                target: document.querySelector("#loading-container"),\n                // 等同于\n                // target:"#loading-container"\n                name: "wave",\n            });\n            this.show();\n        },\n        destroyed() {\n            this.loadingInstance.destroy();\n        },\n    };\n<\/script>\n')])])])],2)],1)},v=[];function g(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function m(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?g(Object(t),!0).forEach((function(n){b(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):g(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function b(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var h={name:"component-doc",components:{"element-demo0":function(){var e=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[[t("div",[t("button",{staticClass:"button-demo",on:{click:function(n){return e.show()}}},[e._v("开启 Loading")]),e._v(" "),t("button",{staticClass:"button-demo",on:{click:function(n){return e.close()}}},[e._v("关闭 Loading")]),e._v(" "),t("br"),e._v(" "),t("br"),e._v(" "),t("ve-table",{attrs:{id:"loading-container",columns:e.columns,"table-data":e.tableData}})],1)]],2)},n=[],t={data:function(){return{loadingInstance:null,columns:[{field:"name",key:"a",title:"Name",align:"center"},{field:"date",key:"b",title:"Date",align:"left"},{field:"hobby",key:"c",title:"Hobby",align:"right"},{field:"address",key:"d",title:"Address"}],tableData:[{name:"John",date:"1900-05-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Shanghai"},{name:"Dickerson",date:"1910-06-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Beijing"},{name:"Larsen",date:"2000-07-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Chongqing"},{name:"Geneva",date:"2010-08-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Xiamen"},{name:"Jami",date:"2020-09-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Shenzhen"}]}},methods:{show:function(){this.loadingInstance.show()},close:function(){this.loadingInstance.close()}},mounted:function(){this.loadingInstance=this.$veLoading({target:document.querySelector("#loading-container"),name:"wave"}),this.show()},destroyed:function(){this.loadingInstance.destroy()}};return m({render:e,staticRenderFns:n},t)}()}},_=h,p=Object(c["a"])(_,u,v,!1,null,null,null),f=p.exports,y=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("section",{staticClass:"content example-md-doc"},[t("anchor",{attrs:{"is-edit":"",label:"整屏加载",fileName:"fullscreen.md"}}),t("demo-block",[t("div",[t("p",[e._v("1、通过"),t("code",[e._v("fullscreen")]),e._v("参数，指定 Loading 全屏展示"),t("br"),e._v("2、通过"),t("code",[e._v("lock")]),e._v("参数，指定禁止鼠标滚动")])]),t("template",{slot:"source"},[t("element-demo0")],1),t("template",{slot:"highlight"},[t("pre",{pre:!0},[t("code",{pre:!0,attrs:{class:"html"}},[e._v('<template>\n    <div>\n        <button class="button-demo" @click="show()">开启 Loading</button>\n    </div>\n</template>\n<script>\n    export default {\n        data() {\n            return {\n                loadingInstance: null,\n            };\n        },\n        methods: {\n            show() {\n                this.loadingInstance.show();\n\n                setTimeout(() => {\n                    this.loadingInstance.close();\n                }, 2000);\n            },\n        },\n        mounted() {\n            this.loadingInstance = this.$veLoading({\n                fullscreen: true,\n                name: "bounce",\n                lock: true,\n            });\n        },\n        destroyed() {\n            this.loadingInstance.destroy();\n        },\n    };\n<\/script>\n')])])])],2)],1)},O=[];function w(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function j(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?w(Object(t),!0).forEach((function(n){C(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):w(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function C(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var k={name:"component-doc",components:{"element-demo0":function(){var e=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[[t("div",[t("button",{staticClass:"button-demo",on:{click:function(n){return e.show()}}},[e._v("开启 Loading")])])]],2)},n=[],t={data:function(){return{loadingInstance:null}},methods:{show:function(){var e=this;this.loadingInstance.show(),setTimeout((function(){e.loadingInstance.close()}),2e3)}},mounted:function(){this.loadingInstance=this.$veLoading({fullscreen:!0,name:"bounce",lock:!0})},destroyed:function(){this.loadingInstance.destroy()}};return j({render:e,staticRenderFns:n},t)}()}},L=k,I=Object(c["a"])(L,y,O,!1,null,null,null),P=I.exports,S=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("section",{staticClass:"content example-md-doc"},[t("anchor",{attrs:{"is-edit":"",label:"自定义",fileName:"custom.md"}}),t("p",[e._v("你还可以自定义加载文案、背景色、大小")]),t("demo-block",[t("div",[t("p",[e._v("1、"),t("code",[e._v("color")]),e._v(" 设置加载效果的颜色"),t("br"),e._v("2、"),t("code",[e._v("tip")]),e._v("设置加载文案"),t("br"),e._v("2、"),t("code",[e._v("overlayBackgroundColor")]),e._v("设置遮罩背景色，可以指定 "),t("a",{attrs:{href:"https://www.w3schools.com/cssref/func_rgba.asp"}},[e._v("rgba")]),e._v("，让背景变得透明")])]),t("template",{slot:"source"},[t("element-demo0")],1),t("template",{slot:"highlight"},[t("pre",{pre:!0},[t("code",{pre:!0,attrs:{class:"html"}},[e._v('<template>\n    <div>\n        <button class="button-demo" @click="show()">开启 Loading</button>\n        <button class="button-demo" @click="close()">关闭 Loading</button>\n        <br />\n        <br />\n        <div\n            id="custom-loading-container"\n            style="width:100%;height:250px;background-color:#2980b9;"\n        />\n    </div>\n</template>\n<script>\n    export default {\n        data() {\n            return {\n                loadingInstance: null,\n            };\n        },\n        methods: {\n            show() {\n                this.loadingInstance.show();\n            },\n            close() {\n                this.loadingInstance.close();\n            },\n        },\n        mounted() {\n            this.loadingInstance = this.$veLoading({\n                target: document.querySelector("#custom-loading-container"),\n                name: "wave",\n                color: "#fff",\n                tip: "loading...",\n                overlayBackgroundColor: "rgba(255, 255, 255, 0.1)",\n            });\n            this.show();\n        },\n        destroyed() {\n            this.loadingInstance.destroy();\n        },\n    };\n<\/script>\n')])])])],2)],1)},E=[];function N(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function $(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?N(Object(t),!0).forEach((function(n){D(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):N(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function D(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var A={name:"component-doc",components:{"element-demo0":function(){var e=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[[t("div",[t("button",{staticClass:"button-demo",on:{click:function(n){return e.show()}}},[e._v("开启 Loading")]),e._v(" "),t("button",{staticClass:"button-demo",on:{click:function(n){return e.close()}}},[e._v("关闭 Loading")]),e._v(" "),t("br"),e._v(" "),t("br"),e._v(" "),t("div",{staticStyle:{width:"100%",height:"250px","background-color":"#2980b9"},attrs:{id:"custom-loading-container"}})])]],2)},n=[],t={data:function(){return{loadingInstance:null}},methods:{show:function(){this.loadingInstance.show()},close:function(){this.loadingInstance.close()}},mounted:function(){this.loadingInstance=this.$veLoading({target:document.querySelector("#custom-loading-container"),name:"wave",color:"#fff",tip:"loading...",overlayBackgroundColor:"rgba(255, 255, 255, 0.1)"}),this.show()},destroyed:function(){this.loadingInstance.destroy()}};return $({render:e,staticRenderFns:n},t)}()}},x=A,q=Object(c["a"])(x,S,E,!1,null,null,null),B=q.exports,F=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("anchor",{attrs:{label:"loading 集合","is-edit":!1}},[t("div",{staticClass:"loading-container"},e._l(Object.values(e.SPIN_NAMES),(function(n){return t("div",{key:n,staticClass:"loading-item"},[t("div",{staticClass:"loading-item-spin",attrs:{id:"loading-"+n}}),t("span",{staticClass:"loading-name"},[e._v(e._s(n))])])})),0)])},J=[],M={data:function(){return{SPIN_NAMES:{PLANE:"plane",GRID:"grid",WAVE:"wave",FLOW:"flow",BOUNCE:"bounce",PULSE:"pulse"}}},mounted:function(){var e=this;Object.values(this.SPIN_NAMES).forEach((function(n){e.$veLoading({target:"#loading-".concat(n),name:n}).show()}))}},V=M,R=(t("89a0"),Object(c["a"])(V,F,J,!1,null,"352f34cd",null)),U=R.exports,G=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("section",{staticClass:"content example-md-doc"},[t("anchor",{attrs:{"is-edit":"",label:"API",fileName:"api.md"}}),t("h3",[e._v("props")]),e._m(0),t("h3",[e._v("methods")]),e._m(1)],1)},z=[function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("table",{staticClass:"example-table"},[t("thead",[t("tr",[t("th",[e._v("参数")]),t("th",[e._v("说明")]),t("th",[e._v("类型")]),t("th",[e._v("可选值")]),t("th",[e._v("默认值")])])]),t("tbody",[t("tr",[t("td",[e._v("name")]),t("td",[e._v("加载效果类型名称")]),t("td",[t("code",[e._v("String")])]),t("td",[e._v("见“Loading 集合”示例")]),t("td",[e._v('"plane"')])]),t("tr",[t("td",[e._v("target")]),t("td",[e._v("DOM 对象 或 可以通过 document.querySelector 获取的字符串")]),t("td",[t("code",[e._v("Object | String")])]),t("td",[e._v("-")]),t("td",[e._v("-")])]),t("tr",[t("td",[e._v("fullscreen")]),t("td",[e._v("是否全屏展示")]),t("td",[t("code",[e._v("Boolean")])]),t("td",[e._v("-")]),t("td",[e._v("false")])]),t("tr",[t("td",[e._v("tip")]),t("td",[e._v("加载文案")]),t("td",[t("code",[e._v("String")])]),t("td",[e._v("-")]),t("td",[e._v("-")])]),t("tr",[t("td",[e._v("color")]),t("td",[e._v("加载图标的颜色")]),t("td",[t("code",[e._v("String")])]),t("td",[e._v("-")]),t("td",[e._v('"#1890ff"')])]),t("tr",[t("td",[e._v("overlayBackgroundColor")]),t("td",[e._v("遮罩背景色")]),t("td",[t("code",[e._v("String")])]),t("td",[e._v("-")]),t("td",[e._v('"rgba(255, 255, 255, 0.5)"')])]),t("tr",[t("td",[e._v("height")]),t("td",[e._v("加载图标的高度")]),t("td",[t("code",[e._v("String | Number")])]),t("td",[e._v("-")]),t("td",[e._v("40")])]),t("tr",[t("td",[e._v("width")]),t("td",[e._v("加载图标的宽度")]),t("td",[t("code",[e._v("String | Number")])]),t("td",[e._v("-")]),t("td",[e._v("40")])])])])},function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("table",{staticClass:"example-table"},[t("thead",[t("tr",[t("th",[e._v("方法名称")]),t("th",[e._v("说明")]),t("th",[e._v("参数")])])]),t("tbody",[t("tr",[t("td",[e._v("show")]),t("td",[e._v("展示 Loading 效果")]),t("td",[e._v("-")])]),t("tr",[t("td",[e._v("close")]),t("td",[e._v("关闭 Loading 效果")]),t("td",[e._v("-")])]),t("tr",[t("td",[e._v("destroy")]),t("td",[e._v("默认关闭不会销毁，需要手动调用销毁 Loading")]),t("td",[e._v("-")])])])])}],H={},T=Object(c["a"])(H,G,z,!1,null,null,null),W=T.exports,X={components:{Usage:l,Container:f,Fullscreen:P,Custom:B,Collection:U,Api:W}},K=X,Q=Object(c["a"])(K,o,a,!1,null,null,null);n["default"]=Q.exports},a771:function(e,n,t){}}]);
//# sourceMappingURL=chunk-57783a4c.032e2f13.js.map