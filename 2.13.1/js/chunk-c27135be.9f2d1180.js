(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c27135be"],{"0d69":function(e,t,n){},"7f7e":function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h2",[e._v("Loading")]),n("Usage"),n("Container"),n("Fullscreen"),n("Custom"),n("Collection"),n("Api")],1)},a=[],r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"content example-md-doc"},[n("anchor",{attrs:{label:"Usage"}}),e._m(0),e._m(1),e._m(2),n("anchor",{attrs:{label:"Global Usage"}}),e._m(3),e._m(4),e._m(5)],1)},c=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("Import "),n("code",[e._v("veLoading")]),e._v(" where you need")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("pre",[n("code",{staticClass:"language-javascript"},[e._v('import Vue from "vue";\nimport { veLoading } from "vue-easytable";\n')])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("pre",[n("code",{staticClass:"language-javascript"},[e._v('veLoading({\n    target: "#loading-1",\n    name: "grid",\n    tip: "loading...",\n});\n')])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("Mount the "),n("code",[e._v("veLoading")]),e._v(" component to the prototype of Vue for easy global call")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("pre",[n("code",{staticClass:"language-javascript"},[e._v('import Vue from "vue";\nimport { veLoading } from "vue-easytable";\n\nVue.prototype.$veLoading = veLoading;\n')])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("pre",[n("code",{staticClass:"language-javascript"},[e._v('this.$veLoading({\n    target: "#loading-1",\n    name: "grid",\n    tip: "loading...",\n});\n')])])}],i=n("2877"),s={},l=Object(i["a"])(s,r,c,!1,null,null,null),d=l.exports,u=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"content example-md-doc"},[n("anchor",{attrs:{"is-edit":"",label:"Area Loading",fileName:"container.md"}}),n("p",[e._v("Display the Loading effect in containers such as tables")]),n("demo-block",[n("div",[n("p",[e._v("1、Specify the Loading container through the "),n("code",[e._v("target")]),e._v(" parameter. "),n("code",[e._v("target")]),e._v(" parameter is a DOM object or a string selector (a string that can be obtained through "),n("code",[e._v("document.querySelector")]),e._v(")"),n("br"),e._v("2、The "),n("code",[e._v("name")]),e._v(" parameter specifies the name of the loading effect type"),n("br"),e._v("3、The loading instance contains three methods: "),n("code",[e._v("show")]),e._v("、"),n("code",[e._v("close")]),e._v("、"),n("code",[e._v("destroy")])])]),n("template",{slot:"source"},[n("element-demo0")],1),n("template",{slot:"highlight"},[n("pre",{pre:!0},[n("code",{pre:!0,attrs:{class:"html"}},[e._v('<template>\n    <div>\n        <button class="button-demo" @click="show()">Open</button>\n        <button class="button-demo" @click="close()">Close</button>\n        <br />\n        <br />\n        <ve-table id="loading-container" :columns="columns" :table-data="tableData" />\n    </div>\n</template>\n<script>\n    export default {\n        data() {\n            return {\n                loadingInstance: null,\n                columns: [\n                    { field: "name", key: "a", title: "Name", align: "center" },\n                    { field: "date", key: "b", title: "Date", align: "left" },\n                    {\n                        field: "hobby",\n                        key: "c",\n                        title: "Hobby",\n                        align: "right",\n                    },\n                    { field: "address", key: "d", title: "Address" },\n                ],\n                tableData: [\n                    {\n                        name: "John",\n                        date: "1900-05-20",\n                        hobby: "coding and coding repeat",\n                        address: "No.1 Century Avenue, Shanghai",\n                    },\n                    {\n                        name: "Dickerson",\n                        date: "1910-06-20",\n                        hobby: "coding and coding repeat",\n                        address: "No.1 Century Avenue, Beijing",\n                    },\n                    {\n                        name: "Larsen",\n                        date: "2000-07-20",\n                        hobby: "coding and coding repeat",\n                        address: "No.1 Century Avenue, Chongqing",\n                    },\n                    {\n                        name: "Geneva",\n                        date: "2010-08-20",\n                        hobby: "coding and coding repeat",\n                        address: "No.1 Century Avenue, Xiamen",\n                    },\n                    {\n                        name: "Jami",\n                        date: "2020-09-20",\n                        hobby: "coding and coding repeat",\n                        address: "No.1 Century Avenue, Shenzhen",\n                    },\n                ],\n            };\n        },\n        methods: {\n            show() {\n                this.loadingInstance.show();\n            },\n            close() {\n                this.loadingInstance.close();\n            },\n        },\n        mounted() {\n            this.loadingInstance = this.$veLoading({\n                target: document.querySelector("#loading-container"),\n                // 等同于\n                // target:"#loading-container"\n                name: "wave",\n            });\n            this.show();\n        },\n        destroyed() {\n            this.loadingInstance.destroy();\n        },\n    };\n<\/script>\n')])])])],2)],1)},v=[];function g(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function h(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?g(Object(n),!0).forEach((function(t){m(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):g(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function m(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var b={name:"component-doc",components:{"element-demo0":function(){var e=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[[n("div",[n("button",{staticClass:"button-demo",on:{click:function(t){return e.show()}}},[e._v("Open")]),e._v(" "),n("button",{staticClass:"button-demo",on:{click:function(t){return e.close()}}},[e._v("Close")]),e._v(" "),n("br"),e._v(" "),n("br"),e._v(" "),n("ve-table",{attrs:{id:"loading-container",columns:e.columns,"table-data":e.tableData}})],1)]],2)},t=[],n={data:function(){return{loadingInstance:null,columns:[{field:"name",key:"a",title:"Name",align:"center"},{field:"date",key:"b",title:"Date",align:"left"},{field:"hobby",key:"c",title:"Hobby",align:"right"},{field:"address",key:"d",title:"Address"}],tableData:[{name:"John",date:"1900-05-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Shanghai"},{name:"Dickerson",date:"1910-06-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Beijing"},{name:"Larsen",date:"2000-07-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Chongqing"},{name:"Geneva",date:"2010-08-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Xiamen"},{name:"Jami",date:"2020-09-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Shenzhen"}]}},methods:{show:function(){this.loadingInstance.show()},close:function(){this.loadingInstance.close()}},mounted:function(){this.loadingInstance=this.$veLoading({target:document.querySelector("#loading-container"),name:"wave"}),this.show()},destroyed:function(){this.loadingInstance.destroy()}};return h({render:e,staticRenderFns:t},n)}()}},p=b,f=Object(i["a"])(p,u,v,!1,null,null,null),_=f.exports,y=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"content example-md-doc"},[n("anchor",{attrs:{"is-edit":"",label:"Full Screen Loading",fileName:"fullscreen.md"}}),n("demo-block",[n("div",[n("p",[e._v("1、通过"),n("code",[e._v("fullscreen")]),e._v("参数，指定 Loading 全屏展示"),n("br"),e._v("2、通过"),n("code",[e._v("lock")]),e._v("参数，指定禁止鼠标滚动")])]),n("template",{slot:"source"},[n("element-demo0")],1),n("template",{slot:"highlight"},[n("pre",{pre:!0},[n("code",{pre:!0,attrs:{class:"html"}},[e._v('<template>\n    <div>\n        <button class="button-demo" @click="show()">Open</button>\n    </div>\n</template>\n<script>\n    export default {\n        data() {\n            return {\n                loadingInstance: null,\n            };\n        },\n        methods: {\n            show() {\n                this.loadingInstance.show();\n\n                setTimeout(() => {\n                    this.loadingInstance.close();\n                }, 2000);\n            },\n        },\n        mounted() {\n            this.loadingInstance = this.$veLoading({\n                fullscreen: true,\n                name: "bounce",\n                lock: true,\n            });\n        },\n        destroyed() {\n            this.loadingInstance.destroy();\n        },\n    };\n<\/script>\n')])])])],2)],1)},O=[];function w(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function j(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?w(Object(n),!0).forEach((function(t){C(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):w(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function C(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var k={name:"component-doc",components:{"element-demo0":function(){var e=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[[n("div",[n("button",{staticClass:"button-demo",on:{click:function(t){return e.show()}}},[e._v("Open")])])]],2)},t=[],n={data:function(){return{loadingInstance:null}},methods:{show:function(){var e=this;this.loadingInstance.show(),setTimeout((function(){e.loadingInstance.close()}),2e3)}},mounted:function(){this.loadingInstance=this.$veLoading({fullscreen:!0,name:"bounce",lock:!0})},destroyed:function(){this.loadingInstance.destroy()}};return j({render:e,staticRenderFns:t},n)}()}},I=k,S=Object(i["a"])(I,y,O,!1,null,null,null),P=S.exports,E=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"content example-md-doc"},[n("anchor",{attrs:{"is-edit":"",label:"Custom Loading",fileName:"custom.md"}}),n("p",[e._v("You can also customize the loading text, background color and size")]),n("demo-block",[n("div",[n("p",[e._v("1、"),n("code",[e._v("color")]),e._v(" Set the color of the loading effect"),n("br"),e._v("2、"),n("code",[e._v("tip")]),e._v("Set loading text"),n("br"),e._v("2、"),n("code",[e._v("overlayBackgroundColor")]),e._v("Set mask background color，Can be specified by "),n("a",{attrs:{href:"https://www.w3schools.com/cssref/func_rgba.asp"}},[e._v("rgba")]),e._v(",Make the background transparent.")])]),n("template",{slot:"source"},[n("element-demo0")],1),n("template",{slot:"highlight"},[n("pre",{pre:!0},[n("code",{pre:!0,attrs:{class:"html"}},[e._v('<template>\n    <div>\n        <button class="button-demo" @click="show()">Open</button>\n        <button class="button-demo" @click="close()">Close</button>\n        <br />\n        <br />\n        <div\n            id="custom-loading-container"\n            style="width:100%;height:250px;background-color:#2980b9;"\n        />\n    </div>\n</template>\n<script>\n    export default {\n        data() {\n            return {\n                loadingInstance: null,\n            };\n        },\n        methods: {\n            show() {\n                this.loadingInstance.show();\n            },\n            close() {\n                this.loadingInstance.close();\n            },\n        },\n        mounted() {\n            this.loadingInstance = this.$veLoading({\n                target: document.querySelector("#custom-loading-container"),\n                name: "wave",\n                color: "#fff",\n                tip: "loading...",\n                overlayBackgroundColor: "rgba(255, 255, 255, 0.1)",\n            });\n            this.show();\n        },\n        destroyed() {\n            this.loadingInstance.destroy();\n        },\n    };\n<\/script>\n')])])])],2)],1)},L=[];function D(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function $(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?D(Object(n),!0).forEach((function(t){N(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):D(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function N(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var x={name:"component-doc",components:{"element-demo0":function(){var e=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[[n("div",[n("button",{staticClass:"button-demo",on:{click:function(t){return e.show()}}},[e._v("Open")]),e._v(" "),n("button",{staticClass:"button-demo",on:{click:function(t){return e.close()}}},[e._v("Close")]),e._v(" "),n("br"),e._v(" "),n("br"),e._v(" "),n("div",{staticStyle:{width:"100%",height:"250px","background-color":"#2980b9"},attrs:{id:"custom-loading-container"}})])]],2)},t=[],n={data:function(){return{loadingInstance:null}},methods:{show:function(){this.loadingInstance.show()},close:function(){this.loadingInstance.close()}},mounted:function(){this.loadingInstance=this.$veLoading({target:document.querySelector("#custom-loading-container"),name:"wave",color:"#fff",tip:"loading...",overlayBackgroundColor:"rgba(255, 255, 255, 0.1)"}),this.show()},destroyed:function(){this.loadingInstance.destroy()}};return $({render:e,staticRenderFns:t},n)}()}},A=x,M=Object(i["a"])(A,E,L,!1,null,null,null),T=M.exports,q=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("anchor",{attrs:{label:"Loading Collection"}},[n("div",{staticClass:"loading-container"},e._l(Object.values(e.SPIN_NAMES),(function(t){return n("div",{key:t,staticClass:"loading-item"},[n("div",{staticClass:"loading-item-spin",attrs:{id:"loading-"+t}}),n("span",{staticClass:"loading-name"},[e._v(e._s(t))])])})),0)])},B=[],F={data:function(){return{SPIN_NAMES:{PLANE:"plane",GRID:"grid",WAVE:"wave",FLOW:"flow",BOUNCE:"bounce",PULSE:"pulse"}}},mounted:function(){var e=this;Object.values(this.SPIN_NAMES).forEach((function(t){e.$veLoading({target:"#loading-".concat(t),name:t}).show()}))}},J=F,U=(n("c84a"),Object(i["a"])(J,q,B,!1,null,"cd50d50a",null)),V=U.exports,z=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"content example-md-doc"},[n("anchor",{attrs:{"is-edit":"",label:"API",fileName:"api.md"}}),n("h3",[e._v("props")]),e._m(0),n("h3",[e._v("methods")]),e._m(1)],1)},G=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("table",{staticClass:"example-table"},[n("thead",[n("tr",[n("th",[e._v("Property")]),n("th",[e._v("Description")]),n("th",[e._v("Type")]),n("th",[e._v("Optional value")]),n("th",[e._v("Default")])])]),n("tbody",[n("tr",[n("td",[e._v("name")]),n("td",[e._v("Load effect type name")]),n("td",[n("code",[e._v("String")])]),n("td",[e._v("refer to example")]),n("td",[e._v('"plane"')])]),n("tr",[n("td",[e._v("target")]),n("td",[e._v("DOM object or string that can be obtained through "),n("code",[e._v("document.querySelector")])]),n("td",[n("code",[e._v("Object | String")])]),n("td",[e._v("-")]),n("td",[e._v("-")])]),n("tr",[n("td",[e._v("fullscreen")]),n("td",[e._v("Full screen display")]),n("td",[n("code",[e._v("Boolean")])]),n("td",[e._v("-")]),n("td",[e._v("false")])]),n("tr",[n("td",[e._v("tip")]),n("td",[e._v("Loading text")]),n("td",[n("code",[e._v("String")])]),n("td",[e._v("-")]),n("td",[e._v("-")])]),n("tr",[n("td",[e._v("color")]),n("td",[e._v("The color of the loading icon")]),n("td",[n("code",[e._v("String")])]),n("td",[e._v("-")]),n("td",[e._v('"#1890ff"')])]),n("tr",[n("td",[e._v("overlayBackgroundColor")]),n("td",[e._v("Mask background color")]),n("td",[n("code",[e._v("String")])]),n("td",[e._v("-")]),n("td",[e._v('"rgba(255, 255, 255, 0.5)"')])]),n("tr",[n("td",[e._v("height")]),n("td",[e._v("The height of the loaded icon")]),n("td",[n("code",[e._v("String | Number")])]),n("td",[e._v("-")]),n("td",[e._v("40")])]),n("tr",[n("td",[e._v("width")]),n("td",[e._v("The width of the loading icon")]),n("td",[n("code",[e._v("String | Number")])]),n("td",[e._v("-")]),n("td",[e._v("40")])])])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("table",{staticClass:"example-table"},[n("thead",[n("tr",[n("th",[e._v("Methods")]),n("th",[e._v("Description")]),n("th",[e._v("Parameters")])])]),n("tbody",[n("tr",[n("td",[e._v("show")]),n("td",[e._v("Show the effect of loading")]),n("td",[e._v("-")])]),n("tr",[n("td",[e._v("close")]),n("td",[e._v("Turn off loading effect")]),n("td",[e._v("-")])]),n("tr",[n("td",[e._v("destroy")]),n("td",[e._v("It will not be destroyed by default. You need to call destroy loading manually")]),n("td",[e._v("-")])])])])}],R={},H=Object(i["a"])(R,z,G,!1,null,null,null),W=H.exports,X={components:{Usage:d,Container:_,Fullscreen:P,Custom:T,Collection:V,Api:W}},Y=X,K=Object(i["a"])(Y,o,a,!1,null,null,null);t["default"]=K.exports},c84a:function(e,t,n){"use strict";n("0d69")}}]);
//# sourceMappingURL=chunk-c27135be.9f2d1180.js.map