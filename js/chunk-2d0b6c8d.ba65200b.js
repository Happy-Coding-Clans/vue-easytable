(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b6c8d"],{"1f46":function(e,t,n){"use strict";n.r(t);var l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h2",[e._v("单元格选择")]),n("Explain"),n("ShortCuts"),n("Base"),n("DisableSelection"),n("SetSelectionInstance")],1)},i=[],o=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},c=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"content example-md-doc"},[n("div",{staticClass:"tip"},[n("p",[e._v("1、单元格选中，可以方便高亮当前单元格。通过属性 "),n("code",[e._v("cellSelectionOption")]),e._v("即可实现"),n("br"),e._v(" 2、配合单元格编辑功能非常方便"),n("br"),e._v(" 3、需要指定 "),n("code",[e._v("rowKeyFieldName")]),e._v(" 属性")])])])}],a=n("2877"),r={},d=Object(a["a"])(r,o,c,!1,null,null,null),s=d.exports,f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"content example-md-doc"},[n("anchor",{attrs:{"is-edit":"",label:"快捷键",fileName:"shortcuts.md"}}),n("p",[e._v("单元格选择支持以下快捷键（参考 excel 快捷键）：")]),e._m(0)],1)},b=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("table",{staticClass:"example-table"},[n("thead",[n("tr",[n("th",{staticStyle:{"text-align":"left"}},[e._v("功能")]),n("th",{staticStyle:{"text-align":"left"}},[e._v("快捷键")])])]),n("tbody",[n("tr",[n("td",{staticStyle:{"text-align":"left"}},[e._v("向上移动活动单元格")]),n("td",{staticStyle:{"text-align":"left"}},[n("code",[e._v("↑")])])]),n("tr",[n("td",{staticStyle:{"text-align":"left"}},[e._v("向右移动活动单元格")]),n("td",{staticStyle:{"text-align":"left"}},[n("code",[e._v("→")])])]),n("tr",[n("td",{staticStyle:{"text-align":"left"}},[e._v("向下移动活动单元格")]),n("td",{staticStyle:{"text-align":"left"}},[n("code",[e._v("↓")])])]),n("tr",[n("td",{staticStyle:{"text-align":"left"}},[e._v("向左移动活动单元格")]),n("td",{staticStyle:{"text-align":"left"}},[n("code",[e._v("←")])])]),n("tr",[n("td",{staticStyle:{"text-align":"left"}},[e._v("向下移动活动单元格")]),n("td",{staticStyle:{"text-align":"left"}},[n("code",[e._v("Enter")])])]),n("tr",[n("td",{staticStyle:{"text-align":"left"}},[e._v("向上移动活动单元格")]),n("td",{staticStyle:{"text-align":"left"}},[n("code",[e._v("Shift")]),e._v(" + "),n("code",[e._v("Enter")])])]),n("tr",[n("td",{staticStyle:{"text-align":"left"}},[e._v("向右移动活动单元格")]),n("td",{staticStyle:{"text-align":"left"}},[n("code",[e._v("Tab")])])]),n("tr",[n("td",{staticStyle:{"text-align":"left"}},[e._v("向左移动活动单元格")]),n("td",{staticStyle:{"text-align":"left"}},[n("code",[e._v("Shift")]),e._v(" + "),n("code",[e._v("Tab")])])])])])}],u={},h=Object(a["a"])(u,f,b,!1,null,null,null),y=h.exports,m=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"content example-md-doc"},[n("anchor",{attrs:{"is-edit":"",label:"基本用法",fileName:"base.md"}}),n("demo-block",[n("template",{slot:"source"},[n("element-demo0")],1),n("template",{slot:"highlight"},[n("pre",{pre:!0},[n("code",{pre:!0,attrs:{class:"html"}},[e._v('<template>\n    <ve-table\n        fixed-header\n        :scroll-width="1600"\n        :max-height="380"\n        border-y\n        :columns="columns"\n        :table-data="tableData"\n        rowKeyFieldName="rowKey"\n    />\n</template>\n\n<script>\n    export default {\n        data() {\n            return {\n                columns: [\n                    {\n                        field: "col1",\n                        key: "a",\n                        title: "col1",\n                        width: 50,\n                        fixed: "left",\n                    },\n                    {\n                        title: "col2-col3",\n                        fixed: "left",\n                        children: [\n                            {\n                                field: "col2",\n                                key: "b",\n                                title: "col2",\n                                width: 50,\n                            },\n                            {\n                                field: "col3",\n                                key: "c",\n                                title: "col3",\n                                width: 50,\n                            },\n                        ],\n                    },\n                    {\n                        title: "col4-col5-col6",\n                        children: [\n                            {\n                                title: "col4-col5",\n                                children: [\n                                    {\n                                        field: "col4",\n                                        key: "d",\n                                        title: "col4",\n                                        width: 130,\n                                    },\n                                    {\n                                        field: "col5",\n                                        key: "e",\n                                        title: "col5",\n                                        width: 140,\n                                    },\n                                ],\n                            },\n                            {\n                                title: "col6",\n                                field: "col6",\n                                key: "f",\n                                width: 140,\n                            },\n                        ],\n                    },\n                    {\n                        title: "col7",\n                        fixed: "right",\n                        children: [\n                            {\n                                title: "col7-1",\n                                field: "col7",\n                                key: "g",\n                                width: 50,\n                            },\n                        ],\n                    },\n                    {\n                        field: "col8",\n                        key: "h",\n                        title: "col8",\n                        width: 50,\n                        fixed: "right",\n                    },\n                ],\n                tableData: [],\n            };\n        },\n        methods: {\n            initTableData() {\n                let data = [];\n                for (let i = 0; i < 10; i++) {\n                    data.push({\n                        rowKey: i,\n                        col1: i,\n                        col2: i,\n                        col3: i,\n                        col4: i,\n                        col5: i,\n                        col6: i,\n                        col7: i,\n                        col8: i,\n                    });\n                }\n                this.tableData = data;\n            },\n        },\n        created() {\n            this.initTableData();\n        },\n    };\n<\/script>\n')])])])],2)],1)},p=[];function v(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,l)}return n}function g(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?v(Object(n),!0).forEach((function(t){w(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):v(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function w(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var O={name:"component-doc",components:{"element-demo0":function(){var e=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[[n("ve-table",{attrs:{"fixed-header":"","scroll-width":1600,"max-height":380,"border-y":"",columns:e.columns,"table-data":e.tableData,rowKeyFieldName:"rowKey"}})]],2)},t=[],n={data:function(){return{columns:[{field:"col1",key:"a",title:"col1",width:50,fixed:"left"},{title:"col2-col3",fixed:"left",children:[{field:"col2",key:"b",title:"col2",width:50},{field:"col3",key:"c",title:"col3",width:50}]},{title:"col4-col5-col6",children:[{title:"col4-col5",children:[{field:"col4",key:"d",title:"col4",width:130},{field:"col5",key:"e",title:"col5",width:140}]},{title:"col6",field:"col6",key:"f",width:140}]},{title:"col7",fixed:"right",children:[{title:"col7-1",field:"col7",key:"g",width:50}]},{field:"col8",key:"h",title:"col8",width:50,fixed:"right"}],tableData:[]}},methods:{initTableData:function(){for(var e=[],t=0;t<10;t++)e.push({rowKey:t,col1:t,col2:t,col3:t,col4:t,col5:t,col6:t,col7:t,col8:t});this.tableData=e}},created:function(){this.initTableData()}};return g({render:e,staticRenderFns:t},n)}()}},_=O,x=Object(a["a"])(_,m,p,!1,null,null,null),S=x.exports,k=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"content example-md-doc"},[n("anchor",{attrs:{"is-edit":"",label:"禁用单元格选择",fileName:"disable-selection.md"}}),n("demo-block",[n("div",[n("p",[e._v("默认单元格选择是开启的，你可以通过 "),n("code",[e._v("cellSelectionOption.enable = false")]),e._v(" 关闭")])]),n("template",{slot:"source"},[n("element-demo0")],1),n("template",{slot:"highlight"},[n("pre",{pre:!0},[n("code",{pre:!0,attrs:{class:"html"}},[e._v('<template>\n    <ve-table\n        fixed-header\n        border-y\n        :columns="columns"\n        :table-data="tableData"\n        :cellSelectionOption="cellSelectionOption"\n        rowKeyFieldName="rowKey"\n    />\n</template>\n\n<script>\n    export default {\n        data() {\n            return {\n                cellSelectionOption: {\n                    // disble cell selection\n                    enable: false,\n                },\n                columns: [\n                    { field: "name", key: "a", title: "Name", align: "left" },\n                    { field: "date", key: "b", title: "Date", align: "left" },\n                    {\n                        field: "hobby",\n                        key: "c",\n                        title: "Hobby",\n                        align: "right",\n                    },\n                    { field: "address", key: "d", title: "Address" },\n                ],\n                tableData: [\n                    {\n                        name: "John",\n                        date: "1900-05-20",\n                        hobby: "coding and coding repeat",\n                        address: "No.1 Century Avenue, Shanghai",\n                        rowKey: 0,\n                    },\n                    {\n                        name: "Dickerson",\n                        date: "1910-06-20",\n                        hobby: "coding and coding repeat",\n                        address: "No.1 Century Avenue, Beijing",\n                        rowKey: 1,\n                    },\n                    {\n                        name: "Larsen",\n                        date: "2000-07-20",\n                        hobby: "coding and coding repeat",\n                        address: "No.1 Century Avenue, Chongqing",\n                        rowKey: 2,\n                    },\n                    {\n                        name: "Geneva",\n                        date: "2010-08-20",\n                        hobby: "coding and coding repeat",\n                        address: "No.1 Century Avenue, Xiamen",\n                        rowKey: 3,\n                    },\n                    {\n                        name: "Jami",\n                        date: "2020-09-20",\n                        hobby: "coding and coding repeat",\n                        address: "No.1 Century Avenue, Shenzhen",\n                        rowKey: 4,\n                    },\n                ],\n            };\n        },\n    };\n<\/script>\n')])])])],2)],1)},j=[];function D(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,l)}return n}function K(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?D(Object(n),!0).forEach((function(t){C(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):D(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function C(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var P={name:"component-doc",components:{"element-demo0":function(){var e=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[[n("ve-table",{attrs:{"fixed-header":"","border-y":"",columns:e.columns,"table-data":e.tableData,cellSelectionOption:e.cellSelectionOption,rowKeyFieldName:"rowKey"}})]],2)},t=[],n={data:function(){return{cellSelectionOption:{enable:!1},columns:[{field:"name",key:"a",title:"Name",align:"left"},{field:"date",key:"b",title:"Date",align:"left"},{field:"hobby",key:"c",title:"Hobby",align:"right"},{field:"address",key:"d",title:"Address"}],tableData:[{name:"John",date:"1900-05-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Shanghai",rowKey:0},{name:"Dickerson",date:"1910-06-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Beijing",rowKey:1},{name:"Larsen",date:"2000-07-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Chongqing",rowKey:2},{name:"Geneva",date:"2010-08-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Xiamen",rowKey:3},{name:"Jami",date:"2020-09-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Shenzhen",rowKey:4}]}}};return K({render:e,staticRenderFns:t},n)}()}},N=P,E=Object(a["a"])(N,k,j,!1,null,null,null),$=E.exports,A=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"content example-md-doc"},[n("anchor",{attrs:{"is-edit":"",label:"单元格选中实例方法",fileName:"set-selection-instance.md"}}),n("demo-block",[n("div",[n("p",[e._v("你可以通过实例方法"),n("code",[e._v("setCellSelection")]),e._v("设置单元格选中")])]),n("template",{slot:"source"},[n("element-demo0")],1),n("template",{slot:"highlight"},[n("pre",{pre:!0},[n("code",{pre:!0,attrs:{class:"html"}},[e._v('<template>\n    <div>\n        <button class="button-demo" @click="setCellSelection(29,\'e\')">选中第30行第5列</button>\n        <button class="button-demo" @click="setCellSelection(1,\'a\')">选中第2行第1列</button>\n        <br />\n        <br />\n        <ve-table\n            ref="tableRef"\n            fixed-header\n            :scroll-width="1600"\n            :max-height="380"\n            border-y\n            :columns="columns"\n            :table-data="tableData"\n            rowKeyFieldName="rowKey"\n        />\n    </div>\n</template>\n\n<script>\n    export default {\n        data() {\n            return {\n                cellSelectionOption: {\n                    // disble cell selection\n                    enable: true,\n                },\n                columns: [\n                    {\n                        field: "col1",\n                        key: "a",\n                        title: "col1",\n                        width: 50,\n                        fixed: "left",\n                    },\n                    {\n                        title: "col2-col3",\n                        fixed: "left",\n                        children: [\n                            {\n                                field: "col2",\n                                key: "b",\n                                title: "col2",\n                                width: 50,\n                            },\n                            {\n                                field: "col3",\n                                key: "c",\n                                title: "col3",\n                                width: 50,\n                            },\n                        ],\n                    },\n                    {\n                        title: "col4-col5-col6",\n                        children: [\n                            {\n                                title: "col4-col5",\n                                children: [\n                                    {\n                                        field: "col4",\n                                        key: "d",\n                                        title: "col4",\n                                        width: 130,\n                                    },\n                                    {\n                                        field: "col5",\n                                        key: "e",\n                                        title: "col5",\n                                        width: 140,\n                                    },\n                                ],\n                            },\n                            {\n                                title: "col6",\n                                field: "col6",\n                                key: "f",\n                                width: 140,\n                            },\n                        ],\n                    },\n                    {\n                        title: "col7",\n                        fixed: "right",\n                        children: [\n                            {\n                                title: "col7-1",\n                                field: "col7",\n                                key: "g",\n                                width: 50,\n                            },\n                        ],\n                    },\n                    {\n                        field: "col8",\n                        key: "h",\n                        title: "col8",\n                        width: 50,\n                        fixed: "right",\n                    },\n                ],\n                tableData: [],\n            };\n        },\n        methods: {\n            // set cell selection\n            setCellSelection(rowKey, colKey) {\n                this.$refs["tableRef"].setCellSelection({ rowKey, colKey });\n            },\n            initTableData() {\n                let data = [];\n                for (let i = 0; i < 50; i++) {\n                    data.push({\n                        rowKey: i,\n                        col1: i,\n                        col2: i,\n                        col3: i,\n                        col4: i,\n                        col5: i,\n                        col6: i,\n                        col7: i,\n                        col8: i,\n                    });\n                }\n                this.tableData = data;\n            },\n        },\n        created() {\n            this.initTableData();\n        },\n    };\n<\/script>\n')])])])],2)],1)},F=[];function T(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,l)}return n}function R(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?T(Object(n),!0).forEach((function(t){J(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):T(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function J(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var B={name:"component-doc",components:{"element-demo0":function(){var e=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[[n("div",[n("button",{staticClass:"button-demo",on:{click:function(t){return e.setCellSelection(29,"e")}}},[e._v("选中第30行第5列")]),e._v(" "),n("button",{staticClass:"button-demo",on:{click:function(t){return e.setCellSelection(1,"a")}}},[e._v("选中第2行第1列")]),e._v(" "),n("br"),e._v(" "),n("br"),e._v(" "),n("ve-table",{ref:"tableRef",attrs:{"fixed-header":"","scroll-width":1600,"max-height":380,"border-y":"",columns:e.columns,"table-data":e.tableData,rowKeyFieldName:"rowKey"}})],1)]],2)},t=[],n={data:function(){return{cellSelectionOption:{enable:!0},columns:[{field:"col1",key:"a",title:"col1",width:50,fixed:"left"},{title:"col2-col3",fixed:"left",children:[{field:"col2",key:"b",title:"col2",width:50},{field:"col3",key:"c",title:"col3",width:50}]},{title:"col4-col5-col6",children:[{title:"col4-col5",children:[{field:"col4",key:"d",title:"col4",width:130},{field:"col5",key:"e",title:"col5",width:140}]},{title:"col6",field:"col6",key:"f",width:140}]},{title:"col7",fixed:"right",children:[{title:"col7-1",field:"col7",key:"g",width:50}]},{field:"col8",key:"h",title:"col8",width:50,fixed:"right"}],tableData:[]}},methods:{setCellSelection:function(e,t){this.$refs["tableRef"].setCellSelection({rowKey:e,colKey:t})},initTableData:function(){for(var e=[],t=0;t<50;t++)e.push({rowKey:t,col1:t,col2:t,col3:t,col4:t,col5:t,col6:t,col7:t,col8:t});this.tableData=e}},created:function(){this.initTableData()}};return R({render:e,staticRenderFns:t},n)}()}},q=B,z=Object(a["a"])(q,A,F,!1,null,null,null),G=z.exports,H={name:"cell-selection",components:{Explain:s,ShortCuts:y,Base:S,DisableSelection:$,SetSelectionInstance:G}},I=H,L=Object(a["a"])(I,l,i,!1,null,null,null);t["default"]=L.exports}}]);
//# sourceMappingURL=chunk-2d0b6c8d.ba65200b.js.map