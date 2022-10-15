(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-259a7156"],{3697:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h2",[e._v("Contextmenu")]),n("Usage"),n("Base"),n("Api")],1)},l=[],a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"content example-md-doc"},[n("anchor",{attrs:{"is-edit":"",label:"Usage",fileName:"usage.md"}}),e._m(0),e._m(1),n("p",[e._v("use")]),e._m(2)],1)},i=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("import "),n("code",[e._v("VeContextmenu")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("pre",[n("code",{staticClass:"language-javascript"},[e._v('import Vue from "vue";\nimport { VeContextmenu } from "vue-easytable";\n\nVue.use(VeContextmenu);\n')])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("pre",[n("code",{staticClass:"language-javascript"},[e._v('<template>\n    <div>\n         <div id="contextmenu-target" ref="contextmenuTargetRef">\n            <div>Right click this area</div>\n        </div>\n        <ve-contextmenu eventTarget="#contextmenu-target" :options="options" />\n    </div>\n</template>\n<script>\nexport default {\n    data() {\n        return {\n            eventTarget:"",\n            options: [\n              [\n                    {\n                        label: "menu1",\n                        type: "menu1-type",\n                    },\n                    {\n                        label: "menu2",\n                        type: "menu2-type",\n                        children: [\n                            {\n                                label: "menu2-1",\n                                type: "menu2-1-type",\n                            },\n                            {\n                                label: "menu2-2",\n                                type: "menu2-2-type",\n                            },\n                        ],\n                    },\n                    {\n                        type: "SEPARATOR",\n                    },\n                    {\n                        label: "menu3",\n                        type: "menu3-type",\n                    },\n            ],\n        };\n    },\n     mounted() {\n            /*\n            eventTarget can be the following case:\n            1、this.eventTarget = "#contextmenu-target";\n            2、this.eventTarget = document.querySelector(\'#contextmenu-target\');\n            3、this.eventTarget = this.$refs["contextmenuTargetRef"];\n            */\n            this.eventTarget = this.$refs["contextmenuTargetRef"];\n    },\n};\n<\/script>\n')])])}],c=n("2877"),u={},o=Object(c["a"])(u,a,i,!1,null,null,null),s=o.exports,m=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"content example-md-doc"},[n("anchor",{attrs:{"is-edit":"",label:"Example",fileName:"base.md"}}),n("demo-block",[n("div",[n("p",[e._v("Split line by "),n("code",[e._v("type=SEPARATOR")])])]),n("template",{slot:"source"},[n("element-demo0")],1),n("template",{slot:"highlight"},[n("pre",{pre:!0},[n("code",{pre:!0,attrs:{class:"html"}},[e._v('<template>\n    <div>\n        <div id="contextmenu-target" ref="contextmenuTargetRef">\n            <div>Right click this area</div>\n            <div style="font-size:30px;color:red;">{{contextmenuType}}</div>\n        </div>\n\n        <ve-contextmenu\n            :eventTarget="eventTarget"\n            :options="options"\n            @on-node-click="contextmenuClick"\n        ></ve-contextmenu>\n    </div>\n</template>\n\n<script>\n    export default {\n        data() {\n            return {\n                eventTarget: "",\n                // contextmenu type\n                contextmenuType: "",\n                // contextmenu options\n                options: [\n                    {\n                        label: "menu1",\n                        type: "menu1-type",\n                    },\n                    {\n                        label: "menu2",\n                        type: "menu2-type",\n                        children: [\n                            {\n                                label: "menu2-1",\n                                type: "menu2-1-type",\n                            },\n                            {\n                                label: "menu2-2",\n                                type: "menu2-2",\n                            },\n                        ],\n                    },\n                    {\n                        type: "SEPARATOR",\n                    },\n                    {\n                        label: "menu3",\n                        type: "menu3-type",\n                    },\n                    {\n                        label: "menu4",\n                        disabled: true,\n                        children: [\n                            {\n                                label: "menu4-1",\n                                type: "menu4-1-type",\n                            },\n                        ],\n                    },\n                    {\n                        label: "menu5",\n                        type: "menu5-type",\n                        children: [\n                            {\n                                label: "menu5-1",\n                                type: "menu5-1-type",\n                                children: [\n                                    {\n                                        label: "menu5-1-1",\n                                        type: "menu5-1-1-type",\n                                    },\n                                    {\n                                        label: "menu5-2-2",\n                                        type: "menu5-2-2-type",\n                                    },\n                                ],\n                            },\n                            {\n                                label: "menu5-2",\n                                disabled: true,\n                            },\n                            {\n                                type: "SEPARATOR",\n                            },\n                            {\n                                label: "menu5-3",\n                                type: "menu5-3-type",\n                            },\n                        ],\n                    },\n                    {\n                        label: "menu6",\n                        type: "menu6-type",\n                        disabled: true,\n                    },\n                ],\n            };\n        },\n        methods: {\n            contextmenuClick(type) {\n                this.contextmenuType = type;\n            },\n        },\n        mounted() {\n            /* \n            eventTarget can be the following case:\n            1、this.eventTarget = "#contextmenu-target";\n            2、this.eventTarget = document.querySelector(\'#contextmenu-target\');\n            3、this.eventTarget = this.$refs["contextmenuTargetRef"];\n            */\n            this.eventTarget = this.$refs["contextmenuTargetRef"];\n        },\n    };\n<\/script>\n<style>\n    #contextmenu-target {\n        display: flex;\n        flex-direction: column;\n        width: 300px;\n        height: 300px;\n        justify-content: center;\n        align-items: center;\n        background: #eee;\n        border: 3px dashed #666;\n        border-radius: 8px;\n    }\n</style>\n')])])])],2)],1)},p=[];function d(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function v(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?d(Object(n),!0).forEach((function(t){y(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):d(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function y(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var b={name:"component-doc",components:{"element-demo0":function(){var e=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[[n("div",[n("div",{ref:"contextmenuTargetRef",attrs:{id:"contextmenu-target"}},[n("div",[e._v("Right click this area")]),e._v(" "),n("div",{staticStyle:{"font-size":"30px",color:"red"}},[e._v(e._s(e.contextmenuType))])]),e._v(" "),n("ve-contextmenu",{attrs:{eventTarget:e.eventTarget,options:e.options},on:{"on-node-click":e.contextmenuClick}})],1)]],2)},t=[],n={data:function(){return{eventTarget:"",contextmenuType:"",options:[{label:"menu1",type:"menu1-type"},{label:"menu2",type:"menu2-type",children:[{label:"menu2-1",type:"menu2-1-type"},{label:"menu2-2",type:"menu2-2"}]},{type:"SEPARATOR"},{label:"menu3",type:"menu3-type"},{label:"menu4",disabled:!0,children:[{label:"menu4-1",type:"menu4-1-type"}]},{label:"menu5",type:"menu5-type",children:[{label:"menu5-1",type:"menu5-1-type",children:[{label:"menu5-1-1",type:"menu5-1-1-type"},{label:"menu5-2-2",type:"menu5-2-2-type"}]},{label:"menu5-2",disabled:!0},{type:"SEPARATOR"},{label:"menu5-3",type:"menu5-3-type"}]},{label:"menu6",type:"menu6-type",disabled:!0}]}},methods:{contextmenuClick:function(e){this.contextmenuType=e}},mounted:function(){this.eventTarget=this.$refs["contextmenuTargetRef"]}};return v({render:e,staticRenderFns:t},n)}()}},h=b,_=(n("f31c"),Object(c["a"])(h,m,p,!1,null,null,null)),f=_.exports,g=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"content example-md-doc"},[n("anchor",{attrs:{"is-edit":"",label:"API",fileName:"api.md"}}),n("h3",[e._v("props")]),e._m(0),n("h3",[e._v("options")]),e._m(1),n("h3",[e._v("Event")]),e._m(2)],1)},x=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("table",{staticClass:"example-table"},[n("thead",[n("tr",[n("th",[e._v("Property")]),n("th",[e._v("Description")]),n("th",[e._v("Type")]),n("th",[e._v("Optional value")]),n("th",[e._v("Default")])])]),n("tbody",[n("tr",[n("td",[e._v("eventTarget")]),n("td",[e._v("Sets the element triggered by the contextmenu event")]),n("td",[n("code",[e._v("HTMLElement | String")])]),n("td",[e._v("-")]),n("td",[e._v("-")])]),n("tr",[n("td",[e._v("options")]),n("td",[e._v("menu item.It supports infinite hierarchical tree structure. The structure is as follows:")]),n("td",[n("code",[e._v("Array")])]),n("td",[e._v("-")]),n("td",[e._v("-")])])])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("table",{staticClass:"example-table"},[n("thead",[n("tr",[n("th",[e._v("Property")]),n("th",[e._v("Description")]),n("th",[e._v("Type")]),n("th",[e._v("Optional value")]),n("th",[e._v("Default")])])]),n("tbody",[n("tr",[n("td",[e._v("label")]),n("td",[e._v("Displayed menu name")]),n("td",[n("code",[e._v("String")])]),n("td",[e._v("-")]),n("td",[e._v("-")])]),n("tr",[n("td",[e._v("type")]),n("td",[e._v("contextmenu item type,The split line through ‘SEPARATOR’。It will be used as a parameter for callback after cliked")]),n("td",[n("code",[e._v("String")])]),n("td",[e._v("-")]),n("td",[e._v("-")])]),n("tr",[n("td",[e._v("disabled")]),n("td",[e._v("Disable the current menu, click will be invalid")]),n("td",[n("code",[e._v("String")])]),n("td",[e._v("-")]),n("td",[e._v("-")])])])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("table",{staticClass:"example-table"},[n("thead",[n("tr",[n("th",[e._v("Event Name")]),n("th",[e._v("Description")]),n("th",[e._v("Parameters")])])]),n("tbody",[n("tr",[n("td",[e._v("on-node-click")]),n("td",[e._v("menu click callback")]),n("td",[e._v("currently clicked menu type")])])])])}],T={},O=Object(c["a"])(T,g,x,!1,null,null,null),R=O.exports,E={components:{Usage:s,Base:f,Api:R}},k=E,P=Object(c["a"])(k,r,l,!1,null,null,null);t["default"]=P.exports},f31c:function(e,t,n){"use strict";n("fc2b")},fc2b:function(e,t,n){}}]);
//# sourceMappingURL=chunk-259a7156.e00f6f6f.js.map