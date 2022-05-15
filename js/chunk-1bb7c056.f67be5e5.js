(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1bb7c056"],{2258:function(t,e,l){"use strict";l.r(e);var n=function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",[l("h2",[t._v("Instance Methods")]),l("Explain"),l("ScrollTo"),l("ScrollToColKey"),l("ScrollToRowKey"),l("API",{attrs:{title:"API",anchor:"API",desc:"Instance Methods"}})],1)},o=[],c=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},i=[function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("section",{staticClass:"content example-md-doc"},[l("div",{staticClass:"tip"},[l("p",[t._v("1、Instance methods can be accessed directly through "),l("a",{attrs:{href:"https://vuejs.org/v2/guide/components-edge-cases.html#Accessing-Child-Component-Instances-amp-Child-Elements"}},[t._v("ref")])])])])}],r=l("2877"),a={},s=Object(r["a"])(a,c,i,!1,null,null,null),d=s.exports,u=function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("section",{staticClass:"content example-md-doc"},[l("anchor",{attrs:{"is-edit":"",label:"scrollTo",fileName:"scroll-to.md"}}),l("demo-block",[l("div",[l("p",[t._v("1、Scroll the table to the specified location(px)"),l("br"),t._v("2、Params refer to "),l("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollTo"}},[t._v("scrollTo")])])]),l("template",{slot:"source"},[l("element-demo0")],1),l("template",{slot:"highlight"},[l("pre",{pre:!0},[l("code",{pre:!0,attrs:{class:"html"}},[t._v('<template>\n    <div>\n        <div style="margin-bottom:20px;line-height:3.0;">\n            <button class="button-demo" @click="scrollY(1000)">Scroll vertically to 1000px</button>\n            <button class="button-demo" @click="scrollY(500)">Scroll vertically to 500px</button>\n            <button class="button-demo" @click="scrollY(0)">Scroll vertically to 0px</button>\n            <button class="button-demo" @click="scrollX(500)">Scroll horizontally to 300px</button>\n            <button class="button-demo" @click="scrollX(300)">Scroll horizontally to 200px</button>\n            <button class="button-demo" @click="scrollX(0)">Scroll horizontally to 0px</button>\n        </div>\n        <ve-table\n            ref="tableRef"\n            style="width:1000px"\n            :scroll-width="1600"\n            :max-height="350"\n            border-y\n            :columns="columns"\n            :table-data="tableData"\n            rowKeyFieldName="rowKey"\n        />\n    </div>\n</template>\n\n<script>\n    export default {\n        data() {\n            return {\n                columns: [\n                    {\n                        field: "col1",\n                        key: "a",\n                        title: "col1",\n                        width: 50,\n                        fixed: "left",\n                    },\n                    {\n                        title: "col2-col3",\n                        fixed: "left",\n                        children: [\n                            {\n                                field: "col2",\n                                key: "b",\n                                title: "col2",\n                                width: 50,\n                            },\n                            {\n                                field: "col3",\n                                key: "c",\n                                title: "col3",\n                                width: 50,\n                            },\n                        ],\n                    },\n                    {\n                        title: "col4-col5-col6",\n                        children: [\n                            {\n                                title: "col4-col5",\n                                children: [\n                                    {\n                                        field: "col4",\n                                        key: "d",\n                                        title: "col4",\n                                        width: 130,\n                                    },\n                                    {\n                                        field: "col5",\n                                        key: "e",\n                                        title: "col5",\n                                        width: 140,\n                                    },\n                                ],\n                            },\n                            {\n                                title: "col6",\n                                field: "col6",\n                                key: "f",\n                                width: 140,\n                            },\n                        ],\n                    },\n                    {\n                        title: "col7",\n                        fixed: "right",\n                        children: [\n                            {\n                                title: "col7-1",\n                                field: "col7",\n                                key: "g",\n                                width: 50,\n                            },\n                        ],\n                    },\n                    {\n                        field: "col8",\n                        key: "h",\n                        title: "col8",\n                        width: 50,\n                        fixed: "right",\n                    },\n                ],\n            };\n        },\n        methods: {\n            initTableData() {\n                let data = [];\n                for (let i = 0; i < 80; i++) {\n                    data.push({\n                        rowKey: i,\n                        col1: i,\n                        col2: i,\n                        col3: i,\n                        col4: i,\n                        col5: i,\n                        col6: i,\n                        col7: i,\n                        col8: i,\n                        col9: i,\n                        col10: i,\n                    });\n                }\n                this.tableData = data;\n            },\n            // scroll y\n            scrollY(val) {\n                this.$refs["tableRef"].scrollTo({ top: val, behavior: "smooth" });\n            },\n            // scroll x\n            scrollX(val) {\n                this.$refs["tableRef"].scrollTo({ left: val, behavior: "smooth" });\n            },\n        },\n        created() {\n            this.initTableData();\n        },\n    };\n<\/script>\n')])])])],2)],1)},h=[];function f(t,e){var l=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),l.push.apply(l,n)}return l}function b(t){for(var e=1;e<arguments.length;e++){var l=null!=arguments[e]?arguments[e]:{};e%2?f(Object(l),!0).forEach((function(e){m(t,e,l[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(l)):f(Object(l)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(l,e))}))}return t}function m(t,e,l){return e in t?Object.defineProperty(t,e,{value:l,enumerable:!0,configurable:!0,writable:!0}):t[e]=l,t}var y={name:"component-doc",components:{"element-demo0":function(){var t=function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",[[l("div",[l("div",{staticStyle:{"margin-bottom":"20px","line-height":"3.0"}},[l("button",{staticClass:"button-demo",on:{click:function(e){return t.scrollY(1e3)}}},[t._v("Scroll vertically to 1000px")]),t._v(" "),l("button",{staticClass:"button-demo",on:{click:function(e){return t.scrollY(500)}}},[t._v("Scroll vertically to 500px")]),t._v(" "),l("button",{staticClass:"button-demo",on:{click:function(e){return t.scrollY(0)}}},[t._v("Scroll vertically to 0px")]),t._v(" "),l("button",{staticClass:"button-demo",on:{click:function(e){return t.scrollX(500)}}},[t._v("Scroll horizontally to 300px")]),t._v(" "),l("button",{staticClass:"button-demo",on:{click:function(e){return t.scrollX(300)}}},[t._v("Scroll horizontally to 200px")]),t._v(" "),l("button",{staticClass:"button-demo",on:{click:function(e){return t.scrollX(0)}}},[t._v("Scroll horizontally to 0px")])]),t._v(" "),l("ve-table",{ref:"tableRef",staticStyle:{width:"1000px"},attrs:{"scroll-width":1600,"max-height":350,"border-y":"",columns:t.columns,"table-data":t.tableData,rowKeyFieldName:"rowKey"}})],1)]],2)},e=[],l={data:function(){return{columns:[{field:"col1",key:"a",title:"col1",width:50,fixed:"left"},{title:"col2-col3",fixed:"left",children:[{field:"col2",key:"b",title:"col2",width:50},{field:"col3",key:"c",title:"col3",width:50}]},{title:"col4-col5-col6",children:[{title:"col4-col5",children:[{field:"col4",key:"d",title:"col4",width:130},{field:"col5",key:"e",title:"col5",width:140}]},{title:"col6",field:"col6",key:"f",width:140}]},{title:"col7",fixed:"right",children:[{title:"col7-1",field:"col7",key:"g",width:50}]},{field:"col8",key:"h",title:"col8",width:50,fixed:"right"}]}},methods:{initTableData:function(){for(var t=[],e=0;e<80;e++)t.push({rowKey:e,col1:e,col2:e,col3:e,col4:e,col5:e,col6:e,col7:e,col8:e,col9:e,col10:e});this.tableData=t},scrollY:function(t){this.$refs["tableRef"].scrollTo({top:t,behavior:"smooth"})},scrollX:function(t){this.$refs["tableRef"].scrollTo({left:t,behavior:"smooth"})}},created:function(){this.initTableData()}};return b({render:t,staticRenderFns:e},l)}()}},p=y,w=Object(r["a"])(p,u,h,!1,null,null,null),v=w.exports,k=function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("section",{staticClass:"content example-md-doc"},[l("anchor",{attrs:{"is-edit":"",label:"scrollToColKey Column scroll method",fileName:"scroll-to-col-key.md"}}),l("p",[t._v("When there are fixed columns, you can use this method to display the specified columns in the visual area")]),l("demo-block",[l("div",[l("p",[t._v("1、Scroll to the specified column position")])]),l("template",{slot:"source"},[l("element-demo0")],1),l("template",{slot:"highlight"},[l("pre",{pre:!0},[l("code",{pre:!0,attrs:{class:"html"}},[t._v('<template>\n    <div>\n        <div style="margin-bottom:20px;line-height:3.0;">\n            <button class="button-demo" @click="scrollToColKey(\'col4\')">\n                Scroll to col4 column\n            </button>\n            <button class="button-demo" @click="scrollToColKey(\'col5\')">\n                Scroll to col5 column\n            </button>\n            <button class="button-demo" @click="scrollToColKey(\'col6\')">\n                Scroll to col6 column\n            </button>\n        </div>\n        <ve-table\n            ref="tableRef"\n            style="width:1000px"\n            :scroll-width="1600"\n            :max-height="350"\n            border-y\n            :columns="columns"\n            :table-data="tableData"\n            rowKeyFieldName="rowKey"\n        />\n    </div>\n</template>\n\n<script>\n    export default {\n        data() {\n            return {\n                columns: [\n                    {\n                        field: "col1",\n                        key: "a",\n                        title: "col1",\n                        width: 50,\n                        fixed: "left",\n                    },\n                    {\n                        title: "col2-col3",\n                        fixed: "left",\n                        children: [\n                            {\n                                field: "col2",\n                                key: "b",\n                                title: "col2",\n                                width: 50,\n                            },\n                            {\n                                field: "col3",\n                                key: "c",\n                                title: "col3",\n                                width: 50,\n                            },\n                        ],\n                    },\n                    {\n                        title: "col4-col5-col6",\n                        children: [\n                            {\n                                title: "col4-col5",\n                                children: [\n                                    {\n                                        field: "col4",\n                                        key: "col4",\n                                        title: "col4",\n                                        width: 130,\n                                    },\n                                    {\n                                        field: "col5",\n                                        key: "col5",\n                                        title: "col5",\n                                        width: 140,\n                                    },\n                                ],\n                            },\n                            {\n                                title: "col6",\n                                field: "col6",\n                                key: "col6",\n                                width: 140,\n                            },\n                        ],\n                    },\n                    {\n                        title: "col7",\n                        fixed: "right",\n                        children: [\n                            {\n                                title: "col7-1",\n                                field: "col7",\n                                key: "g",\n                                width: 50,\n                            },\n                        ],\n                    },\n                    {\n                        field: "col8",\n                        key: "h",\n                        title: "col8",\n                        width: 50,\n                        fixed: "right",\n                    },\n                ],\n            };\n        },\n        methods: {\n            initTableData() {\n                let data = [];\n                for (let i = 0; i < 80; i++) {\n                    data.push({\n                        rowKey: i,\n                        col1: i,\n                        col2: i,\n                        col3: i,\n                        col4: i,\n                        col5: i,\n                        col6: i,\n                        col7: i,\n                        col8: i,\n                    });\n                }\n                this.tableData = data;\n            },\n            // scroll y\n            scrollToColKey(colKey) {\n                this.$refs["tableRef"].scrollToColKey({ colKey });\n            },\n        },\n        created() {\n            this.initTableData();\n        },\n    };\n<\/script>\n')])])])],2)],1)},g=[];function x(t,e){var l=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),l.push.apply(l,n)}return l}function O(t){for(var e=1;e<arguments.length;e++){var l=null!=arguments[e]?arguments[e]:{};e%2?x(Object(l),!0).forEach((function(e){_(t,e,l[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(l)):x(Object(l)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(l,e))}))}return t}function _(t,e,l){return e in t?Object.defineProperty(t,e,{value:l,enumerable:!0,configurable:!0,writable:!0}):t[e]=l,t}var K={name:"component-doc",components:{"element-demo0":function(){var t=function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",[[l("div",[l("div",{staticStyle:{"margin-bottom":"20px","line-height":"3.0"}},[l("button",{staticClass:"button-demo",on:{click:function(e){return t.scrollToColKey("col4")}}},[t._v("\n                Scroll to col4 column\n            ")]),t._v(" "),l("button",{staticClass:"button-demo",on:{click:function(e){return t.scrollToColKey("col5")}}},[t._v("\n                Scroll to col5 column\n            ")]),t._v(" "),l("button",{staticClass:"button-demo",on:{click:function(e){return t.scrollToColKey("col6")}}},[t._v("\n                Scroll to col6 column\n            ")])]),t._v(" "),l("ve-table",{ref:"tableRef",staticStyle:{width:"1000px"},attrs:{"scroll-width":1600,"max-height":350,"border-y":"",columns:t.columns,"table-data":t.tableData,rowKeyFieldName:"rowKey"}})],1)]],2)},e=[],l={data:function(){return{columns:[{field:"col1",key:"a",title:"col1",width:50,fixed:"left"},{title:"col2-col3",fixed:"left",children:[{field:"col2",key:"b",title:"col2",width:50},{field:"col3",key:"c",title:"col3",width:50}]},{title:"col4-col5-col6",children:[{title:"col4-col5",children:[{field:"col4",key:"col4",title:"col4",width:130},{field:"col5",key:"col5",title:"col5",width:140}]},{title:"col6",field:"col6",key:"col6",width:140}]},{title:"col7",fixed:"right",children:[{title:"col7-1",field:"col7",key:"g",width:50}]},{field:"col8",key:"h",title:"col8",width:50,fixed:"right"}]}},methods:{initTableData:function(){for(var t=[],e=0;e<80;e++)t.push({rowKey:e,col1:e,col2:e,col3:e,col4:e,col5:e,col6:e,col7:e,col8:e});this.tableData=t},scrollToColKey:function(t){this.$refs["tableRef"].scrollToColKey({colKey:t})}},created:function(){this.initTableData()}};return O({render:t,staticRenderFns:e},l)}()}},S=K,T=Object(r["a"])(S,k,g,!1,null,null,null),j=T.exports,D=function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("section",{staticClass:"content example-md-doc"},[l("anchor",{attrs:{"is-edit":"",label:"scrollToRowKey",fileName:"scroll-to-row-key.md"}}),l("demo-block",[l("div",[l("p",[t._v("1、Scroll the table to the location of the row key")])]),l("template",{slot:"source"},[l("element-demo0")],1),l("template",{slot:"highlight"},[l("pre",{pre:!0},[l("code",{pre:!0,attrs:{class:"html"}},[t._v('<template>\n    <div>\n        <div style="margin-bottom:20px;line-height:3.0;">\n            <button class="button-demo" @click="scrollToRowKey(9999)">\n                Scroll to the row with rowkey 9999\n            </button>\n            <button class="button-demo" @click="scrollToRowKey(9989)">\n                Scroll to the row with rowkey 9989\n            </button>\n            <button class="button-demo" @click="scrollToRowKey(5000)">\n                Scroll to the row with rowkey 5000\n            </button>\n            <button class="button-demo" @click="scrollToRowKey(0)">\n                Scroll to the row with rowkey 0\n            </button>\n        </div>\n        <ve-table\n            ref="tableRef"\n            style="width:1000px"\n            :scroll-width="1600"\n            :max-height="400"\n            border-y\n            :columns="columns"\n            :table-data="tableData"\n            rowKeyFieldName="rowKey"\n            :virtual-scroll-option="virtualScrollOption"\n        />\n    </div>\n</template>\n\n<script>\n    export default {\n        data() {\n            return {\n                virtualScrollOption: {\n                    // 是否开启\n                    enable: true,\n                    minRowHeight: 40,\n                },\n                tableData: [],\n                columns: [\n                    {\n                        field: "col1",\n                        key: "a",\n                        title: "col1",\n                        width: 50,\n                        fixed: "left",\n                    },\n                    {\n                        title: "col2-col3",\n                        fixed: "left",\n                        children: [\n                            {\n                                field: "col2",\n                                key: "b",\n                                title: "col2",\n                                width: 50,\n                            },\n                            {\n                                field: "col3",\n                                key: "c",\n                                title: "col3",\n                                width: 50,\n                            },\n                        ],\n                    },\n                    {\n                        title: "col4-col5-col6",\n                        children: [\n                            {\n                                title: "col4-col5",\n                                children: [\n                                    {\n                                        field: "col4",\n                                        key: "d",\n                                        title: "col4",\n                                        width: 130,\n                                    },\n                                    {\n                                        field: "col5",\n                                        key: "e",\n                                        title: "col5",\n                                        width: 140,\n                                    },\n                                ],\n                            },\n                            {\n                                title: "col6",\n                                field: "col6",\n                                key: "f",\n                                width: 140,\n                            },\n                        ],\n                    },\n                    {\n                        title: "col7",\n                        fixed: "right",\n                        children: [\n                            {\n                                title: "col7-1",\n                                field: "col7",\n                                key: "g",\n                                width: 50,\n                            },\n                        ],\n                    },\n                    {\n                        field: "col8",\n                        key: "h",\n                        title: "col8",\n                        width: 50,\n                        fixed: "right",\n                    },\n                ],\n            };\n        },\n        methods: {\n            getRandom(min, max) {\n                return Math.floor(Math.random() * (max - min) + min);\n            },\n            initTableData() {\n                for (let i = 0; i < 10000; i++) {\n                    this.tableData.push({\n                        rowKey: i,\n                        col1: i,\n                        col2: i,\n                        col3: i,\n                        col4: i,\n                        col5: i,\n                        col6: i,\n                        col7: i,\n                        col8: i,\n                    });\n                }\n            },\n            // scroll y\n            scrollToRowKey(rowKey) {\n                this.$refs["tableRef"].scrollToRowKey({ rowKey: rowKey });\n            },\n        },\n        created() {\n            this.initTableData();\n        },\n    };\n<\/script>\n')])])])],2)],1)},C=[];function R(t,e){var l=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),l.push.apply(l,n)}return l}function P(t){for(var e=1;e<arguments.length;e++){var l=null!=arguments[e]?arguments[e]:{};e%2?R(Object(l),!0).forEach((function(e){E(t,e,l[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(l)):R(Object(l)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(l,e))}))}return t}function E(t,e,l){return e in t?Object.defineProperty(t,e,{value:l,enumerable:!0,configurable:!0,writable:!0}):t[e]=l,t}var $={name:"component-doc",components:{"element-demo0":function(){var t=function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",[[l("div",[l("div",{staticStyle:{"margin-bottom":"20px","line-height":"3.0"}},[l("button",{staticClass:"button-demo",on:{click:function(e){return t.scrollToRowKey(9999)}}},[t._v("\n                Scroll to the row with rowkey 9999\n            ")]),t._v(" "),l("button",{staticClass:"button-demo",on:{click:function(e){return t.scrollToRowKey(9989)}}},[t._v("\n                Scroll to the row with rowkey 9989\n            ")]),t._v(" "),l("button",{staticClass:"button-demo",on:{click:function(e){return t.scrollToRowKey(5e3)}}},[t._v("\n                Scroll to the row with rowkey 5000\n            ")]),t._v(" "),l("button",{staticClass:"button-demo",on:{click:function(e){return t.scrollToRowKey(0)}}},[t._v("\n                Scroll to the row with rowkey 0\n            ")])]),t._v(" "),l("ve-table",{ref:"tableRef",staticStyle:{width:"1000px"},attrs:{"scroll-width":1600,"max-height":400,"border-y":"",columns:t.columns,"table-data":t.tableData,rowKeyFieldName:"rowKey","virtual-scroll-option":t.virtualScrollOption}})],1)]],2)},e=[],l={data:function(){return{virtualScrollOption:{enable:!0,minRowHeight:40},tableData:[],columns:[{field:"col1",key:"a",title:"col1",width:50,fixed:"left"},{title:"col2-col3",fixed:"left",children:[{field:"col2",key:"b",title:"col2",width:50},{field:"col3",key:"c",title:"col3",width:50}]},{title:"col4-col5-col6",children:[{title:"col4-col5",children:[{field:"col4",key:"d",title:"col4",width:130},{field:"col5",key:"e",title:"col5",width:140}]},{title:"col6",field:"col6",key:"f",width:140}]},{title:"col7",fixed:"right",children:[{title:"col7-1",field:"col7",key:"g",width:50}]},{field:"col8",key:"h",title:"col8",width:50,fixed:"right"}]}},methods:{getRandom:function(t,e){return Math.floor(Math.random()*(e-t)+t)},initTableData:function(){for(var t=0;t<1e4;t++)this.tableData.push({rowKey:t,col1:t,col2:t,col3:t,col4:t,col5:t,col6:t,col7:t,col8:t})},scrollToRowKey:function(t){this.$refs["tableRef"].scrollToRowKey({rowKey:t})}},created:function(){this.initTableData()}};return P({render:t,staticRenderFns:e},l)}()}},N=$,F=Object(r["a"])(N,D,C,!1,null,null,null),I=F.exports,z=l("252e"),M={name:"basic-main",components:{Explain:d,ScrollTo:v,ScrollToColKey:j,ScrollToRowKey:I,API:z["a"]}},X=M,Y=Object(r["a"])(X,n,o,!1,null,null,null);e["default"]=Y.exports},"252e":function(t,e,l){"use strict";var n=function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",[l("tpl",{attrs:{desc:t.desc,anchor:t.anchor,"table-data":t.db.instanceMethods.data,columns:t.db.instanceMethods.columns}})],1)},o=[],c=l("3ef3"),i=l("7eb4"),r={components:{tpl:c["a"]},props:{anchor:{type:String,default:"Table instance methods"},desc:{type:String,default:"Table instance methods"}},data:function(){return{db:i["a"]}}},a=r,s=l("2877"),d=Object(s["a"])(a,n,o,!1,null,null,null);e["a"]=d.exports}}]);
//# sourceMappingURL=chunk-1bb7c056.f67be5e5.js.map