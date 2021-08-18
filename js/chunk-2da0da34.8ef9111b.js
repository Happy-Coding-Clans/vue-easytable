(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2da0da34"],{1738:function(e,n,t){"use strict";t("7c1c")},"3fef":function(e,n,t){},"439b":function(e,n,t){"use strict";t("bb82")},"50f7":function(e,n,t){"use strict";t.r(n);var l=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("h2",[e._v("单元格样式")]),t("Explain"),t("BodyCellStyle"),t("BodyRowStyle"),t("HeaderCellStyle"),t("HeaderRowStyle"),t("FooterRowStyle"),t("API",{attrs:{title:"API",anchor:"API",desc:"cellStyleOption 单元格样式配置"}})],1)},o=[],a=function(){var e=this,n=e.$createElement;e._self._c;return e._m(0)},r=[function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("section",{staticClass:"content example-md-doc"},[t("div",{staticClass:"tip"},[t("p",[e._v("1、通过配置对象"),t("code",[e._v("cellStyleOption")]),e._v("设置单元格的样式"),t("br"),e._v(" 2、回调函数属性"),t("code",[e._v("bodyCellClass({ row, column, rowIndex })")]),e._v("设置符合条件的表体单元格 class"),t("br"),e._v(" 3、回调函数属性"),t("code",[e._v("headerCellClass({column, rowIndex})")]),e._v("设置符合条件的表头单元格 class"),t("br"),e._v(" 4、回调函数属性"),t("code",[e._v("footerCellClass({row,column, rowIndex})")]),e._v("设置符合条件的 footer 单元格 class"),t("br"),e._v(" 5、"),t("code",[e._v("<style>")]),e._v("标签不可以使用"),t("code",[e._v("scoped")]),e._v("属性"),t("br"),e._v(" 6、当然你也可以通过"),t("code",[e._v("renderBodyCell")]),e._v("、"),t("code",[e._v("renderHeaderCell")]),e._v("、"),t("code",[e._v("renderFooterCell")]),e._v("等实现单元格样式的自定义功能")])])])}],c=t("2877"),i={},d=Object(c["a"])(i,a,r,!1,null,null,null),s=d.exports,b=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("section",{staticClass:"content example-md-doc"},[t("anchor",{attrs:{"is-edit":"",label:"表体单元格样式",fileName:"body-cell-style.md"}}),t("demo-block",[t("div",[t("p",[e._v("1、回调函数"),t("code",[e._v("bodyCellClass({ row, column, rowIndex })")]),e._v("接收 3 个参数，row：当前行数据、column：当前列配置、rowIndex：行索引"),t("br"),e._v("2、将符合条件的单元格返回指定的 class 名称。class 名称自定义"),t("br"),e._v("3、如果需要给单元格设置背景色或字体颜色需要加上"),t("code",[e._v("!important")])])]),t("template",{slot:"source"},[t("element-demo0")],1),t("template",{slot:"highlight"},[t("pre",{pre:!0},[t("code",{pre:!0,attrs:{class:"html"}},[e._v('<template>\n    <ve-table :columns="columns" :table-data="tableData" :cell-style-option="cellStyleOption" />\n</template>\n\n<style>\n    .table-body-cell-class1 {\n        background: #91d5ff !important;\n        color: #fff !important;\n    }\n\n    .table-body-cell-class2 {\n        background: orange !important;\n        color: #fff !important;\n    }\n</style>\n\n<script>\n    export default {\n        data() {\n            return {\n                cellStyleOption: {\n                    bodyCellClass: ({ row, column, rowIndex }) => {\n                        if (column.field === "hobby") {\n                            return "table-body-cell-class1";\n                        }\n\n                        if (column.field === "name" && rowIndex === 2) {\n                            return "table-body-cell-class2";\n                        }\n                    },\n                },\n                columns: [\n                    { field: "name", key: "a", title: "Name", align: "left" },\n                    { field: "date", key: "b", title: "Date", align: "left" },\n                    { field: "hobby", key: "c", title: "Hobby", align: "left" },\n                    {\n                        field: "address",\n                        key: "d",\n                        title: "Address",\n                        width: "",\n                        align: "left",\n                    },\n                ],\n                tableData: [\n                    {\n                        name: "John",\n                        date: "1900-05-20",\n                        hobby: "coding",\n                        address: "No.1 Century Avenue, Shanghai",\n                    },\n                    {\n                        name: "Dickerson",\n                        date: "1910-06-20",\n                        hobby: "coding",\n                        address: "No.1 Century Avenue, Beijing",\n                    },\n                    {\n                        name: "Larsen",\n                        date: "2000-07-20",\n                        hobby: "coding and coding repeat",\n                        address: "No.1 Century Avenue, Chongqing",\n                    },\n                    {\n                        name: "Geneva",\n                        date: "2010-08-20",\n                        hobby: "coding and coding repeat",\n                        address: "No.1 Century Avenue, Xiamen",\n                    },\n                    {\n                        name: "Jami",\n                        date: "2020-09-20",\n                        hobby: "coding and coding repeat",\n                        address: "No.1 Century Avenue, Shenzhen",\n                    },\n                ],\n            };\n        },\n    };\n<\/script>\n')])])])],2)],1)},u=[];function f(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);n&&(l=l.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,l)}return t}function y(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?f(Object(t),!0).forEach((function(n){m(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):f(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function m(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var p={name:"component-doc",components:{"element-demo0":function(){var e=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[[t("ve-table",{attrs:{columns:e.columns,"table-data":e.tableData,"cell-style-option":e.cellStyleOption}})]],2)},n=[],t={data:function(){return{cellStyleOption:{bodyCellClass:function(e){e.row;var n=e.column,t=e.rowIndex;return"hobby"===n.field?"table-body-cell-class1":"name"===n.field&&2===t?"table-body-cell-class2":void 0}},columns:[{field:"name",key:"a",title:"Name",align:"left"},{field:"date",key:"b",title:"Date",align:"left"},{field:"hobby",key:"c",title:"Hobby",align:"left"},{field:"address",key:"d",title:"Address",width:"",align:"left"}],tableData:[{name:"John",date:"1900-05-20",hobby:"coding",address:"No.1 Century Avenue, Shanghai"},{name:"Dickerson",date:"1910-06-20",hobby:"coding",address:"No.1 Century Avenue, Beijing"},{name:"Larsen",date:"2000-07-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Chongqing"},{name:"Geneva",date:"2010-08-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Xiamen"},{name:"Jami",date:"2020-09-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Shenzhen"}]}}};return y({render:e,staticRenderFns:n},t)}()}},h=p,v=(t("439b"),Object(c["a"])(h,b,u,!1,null,null,null)),g=v.exports,O=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("section",{staticClass:"content example-md-doc"},[t("anchor",{attrs:{"is-edit":"",label:"表体行样式",fileName:"body-row-style.md"}}),t("demo-block",[t("div",[t("p",[e._v("1、行样式，仍然可以通过"),t("code",[e._v("bodyCellClass({ row, column, rowIndex })")]),e._v("实现")])]),t("template",{slot:"source"},[t("element-demo0")],1),t("template",{slot:"highlight"},[t("pre",{pre:!0},[t("code",{pre:!0,attrs:{class:"html"}},[e._v('<template>\n    <ve-table :columns="columns" :table-data="tableData" :cell-style-option="cellStyleOption" />\n</template>\n\n<style>\n    .table-body-cell-class {\n        background: #91d5ff !important;\n        color: #fff !important;\n    }\n</style>\n\n<script>\n    export default {\n        data() {\n            return {\n                cellStyleOption: {\n                    bodyCellClass: ({ row, column, rowIndex }) => {\n                        if (rowIndex === 2) {\n                            return "table-body-cell-class";\n                        }\n                    },\n                },\n                columns: [\n                    { field: "name", key: "a", title: "Name", align: "left" },\n                    { field: "date", key: "b", title: "Date", align: "left" },\n                    { field: "hobby", key: "c", title: "Hobby", align: "left" },\n                    {\n                        field: "address",\n                        key: "d",\n                        title: "Address",\n                        width: "",\n                        align: "left",\n                    },\n                ],\n                tableData: [\n                    {\n                        name: "John",\n                        date: "1900-05-20",\n                        hobby: "coding",\n                        address: "No.1 Century Avenue, Shanghai",\n                    },\n                    {\n                        name: "Dickerson",\n                        date: "1910-06-20",\n                        hobby: "coding",\n                        address: "No.1 Century Avenue, Beijing",\n                    },\n                    {\n                        name: "Larsen",\n                        date: "2000-07-20",\n                        hobby: "coding and coding repeat",\n                        address: "No.1 Century Avenue, Chongqing",\n                    },\n                    {\n                        name: "Geneva",\n                        date: "2010-08-20",\n                        hobby: "coding and coding repeat",\n                        address: "No.1 Century Avenue, Xiamen",\n                    },\n                    {\n                        name: "Jami",\n                        date: "2020-09-20",\n                        hobby: "coding and coding repeat",\n                        address: "No.1 Century Avenue, Shenzhen",\n                    },\n                ],\n            };\n        },\n    };\n<\/script>\n')])])])],2)],1)},w=[];function C(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);n&&(l=l.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,l)}return t}function _(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?C(Object(t),!0).forEach((function(n){k(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):C(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function k(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var j={name:"component-doc",components:{"element-demo0":function(){var e=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[[t("ve-table",{attrs:{columns:e.columns,"table-data":e.tableData,"cell-style-option":e.cellStyleOption}})]],2)},n=[],t={data:function(){return{cellStyleOption:{bodyCellClass:function(e){e.row,e.column;var n=e.rowIndex;if(2===n)return"table-body-cell-class"}},columns:[{field:"name",key:"a",title:"Name",align:"left"},{field:"date",key:"b",title:"Date",align:"left"},{field:"hobby",key:"c",title:"Hobby",align:"left"},{field:"address",key:"d",title:"Address",width:"",align:"left"}],tableData:[{name:"John",date:"1900-05-20",hobby:"coding",address:"No.1 Century Avenue, Shanghai"},{name:"Dickerson",date:"1910-06-20",hobby:"coding",address:"No.1 Century Avenue, Beijing"},{name:"Larsen",date:"2000-07-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Chongqing"},{name:"Geneva",date:"2010-08-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Xiamen"},{name:"Jami",date:"2020-09-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Shenzhen"}]}}};return _({render:e,staticRenderFns:n},t)}()}},D=j,S=(t("7a53"),Object(c["a"])(D,O,w,!1,null,null,null)),x=S.exports,P=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("section",{staticClass:"content example-md-doc"},[t("anchor",{attrs:{"is-edit":"",label:"表头单元格样式",fileName:"header-cell-style.md"}}),t("demo-block",[t("div",[t("p",[e._v("1、回调函数"),t("code",[e._v("headerCellClass({ column, rowIndex })")]),e._v("接收 2 个参数，column：当前列配置、rowIndex：表头行索引"),t("br"),e._v("2、将符合条件的单元格返回指定的 class 名称。class 名称自定义"),t("br"),e._v("3、如果需要给单元格设置背景色或字体颜色需要加上"),t("code",[e._v("!important")])])]),t("template",{slot:"source"},[t("element-demo0")],1),t("template",{slot:"highlight"},[t("pre",{pre:!0},[t("code",{pre:!0,attrs:{class:"html"}},[e._v('<template>\n    <ve-table :columns="columns" :table-data="tableData" :cell-style-option="cellStyleOption" />\n</template>\n\n<style>\n    .table-header-cell-class {\n        background: orange !important;\n        color: #fff !important;\n    }\n</style>\n\n<script>\n    export default {\n        data() {\n            return {\n                cellStyleOption: {\n                    headerCellClass: ({ column, rowIndex }) => {\n                        if (column.field === "hobby") {\n                            return "table-header-cell-class";\n                        }\n                    },\n                },\n                columns: [\n                    { field: "name", key: "a", title: "Name", align: "left" },\n                    { field: "date", key: "b", title: "Date", align: "left" },\n                    { field: "hobby", key: "c", title: "Hobby", align: "left" },\n                    {\n                        field: "address",\n                        key: "d",\n                        title: "Address",\n                        width: "",\n                        align: "left",\n                    },\n                ],\n                tableData: [\n                    {\n                        name: "John",\n                        date: "1900-05-20",\n                        hobby: "coding",\n                        address: "No.1 Century Avenue, Shanghai",\n                    },\n                    {\n                        name: "Dickerson",\n                        date: "1910-06-20",\n                        hobby: "coding",\n                        address: "No.1 Century Avenue, Beijing",\n                    },\n                    {\n                        name: "Larsen",\n                        date: "2000-07-20",\n                        hobby: "coding and coding repeat",\n                        address: "No.1 Century Avenue, Chongqing",\n                    },\n                    {\n                        name: "Geneva",\n                        date: "2010-08-20",\n                        hobby: "coding and coding repeat",\n                        address: "No.1 Century Avenue, Xiamen",\n                    },\n                    {\n                        name: "Jami",\n                        date: "2020-09-20",\n                        hobby: "coding and coding repeat",\n                        address: "No.1 Century Avenue, Shenzhen",\n                    },\n                ],\n            };\n        },\n    };\n<\/script>\n')])])])],2)],1)},N=[];function A(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);n&&(l=l.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,l)}return t}function I(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?A(Object(t),!0).forEach((function(n){E(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):A(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function E(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var F={name:"component-doc",components:{"element-demo0":function(){var e=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[[t("ve-table",{attrs:{columns:e.columns,"table-data":e.tableData,"cell-style-option":e.cellStyleOption}})]],2)},n=[],t={data:function(){return{cellStyleOption:{headerCellClass:function(e){var n=e.column;e.rowIndex;if("hobby"===n.field)return"table-header-cell-class"}},columns:[{field:"name",key:"a",title:"Name",align:"left"},{field:"date",key:"b",title:"Date",align:"left"},{field:"hobby",key:"c",title:"Hobby",align:"left"},{field:"address",key:"d",title:"Address",width:"",align:"left"}],tableData:[{name:"John",date:"1900-05-20",hobby:"coding",address:"No.1 Century Avenue, Shanghai"},{name:"Dickerson",date:"1910-06-20",hobby:"coding",address:"No.1 Century Avenue, Beijing"},{name:"Larsen",date:"2000-07-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Chongqing"},{name:"Geneva",date:"2010-08-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Xiamen"},{name:"Jami",date:"2020-09-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Shenzhen"}]}}};return I({render:e,staticRenderFns:n},t)}()}},J=F,$=(t("a6df"),Object(c["a"])(J,P,N,!1,null,null,null)),H=$.exports,B=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("section",{staticClass:"content example-md-doc"},[t("anchor",{attrs:{"is-edit":"",label:"表头行样式",fileName:"header-row-style.md"}}),t("demo-block",[t("div",[t("p",[e._v("1、表头行样式，仍然可以通过 "),t("code",[e._v("headerCellClass({ column, rowIndex })")]),e._v("实现")])]),t("template",{slot:"source"},[t("element-demo0")],1),t("template",{slot:"highlight"},[t("pre",{pre:!0},[t("code",{pre:!0,attrs:{class:"html"}},[e._v('<template>\n    <ve-table :columns="columns" :table-data="tableData" :cell-style-option="cellStyleOption" />\n</template>\n\n<style>\n    .table-header-cell-class {\n        background: #91d5ff !important;\n        color: #fff !important;\n    }\n</style>\n\n<script>\n    export default {\n        data() {\n            return {\n                cellStyleOption: {\n                    headerCellClass: ({ column, rowIndex }) => {\n                        if (rowIndex === 0) {\n                            return "table-header-cell-class";\n                        }\n                    },\n                },\n                columns: [\n                    { field: "col1", key: "a", title: "col1", width: "10%" },\n                    {\n                        title: "col2-col3",\n                        children: [\n                            {\n                                field: "col2",\n                                key: "b",\n                                title: "col2",\n                                width: 100,\n                            },\n                            {\n                                field: "col3",\n                                key: "c",\n                                title: "col3",\n                                width: 110,\n                            },\n                        ],\n                    },\n                    {\n                        title: "col4-col5-col6",\n                        children: [\n                            {\n                                title: "col4-col5",\n                                children: [\n                                    {\n                                        field: "col4",\n                                        key: "d",\n                                        title: "col4",\n                                        width: 130,\n                                    },\n                                    {\n                                        field: "col5",\n                                        key: "e",\n                                        title: "col5",\n                                        width: 140,\n                                    },\n                                ],\n                            },\n                            {\n                                title: "col6",\n                                field: "col6",\n                                key: "f",\n                                width: 140,\n                            },\n                        ],\n                    },\n                    { field: "col7", key: "g", title: "col7", width: 150 },\n                    { field: "col8", key: "h", title: "col8", width: 160 },\n                ],\n                tableData: [\n                    {\n                        col1: "1",\n                        col2: "2",\n                        col3: "3",\n                        col4: "4",\n                        col5: "5",\n                        col6: "6",\n                        col7: "7",\n                        col8: "8",\n                    },\n                    {\n                        col1: "1",\n                        col2: "2",\n                        col3: "3",\n                        col4: "4",\n                        col5: "5",\n                        col6: "6",\n                        col7: "7",\n                        col8: "8",\n                    },\n                    {\n                        col1: "1",\n                        col2: "2",\n                        col3: "3",\n                        col4: "4",\n                        col5: "5",\n                        col6: "6",\n                        col7: "7",\n                        col8: "8",\n                    },\n                    {\n                        col1: "1",\n                        col2: "2",\n                        col3: "3",\n                        col4: "4",\n                        col5: "5",\n                        col6: "6",\n                        col7: "7",\n                        col8: "8",\n                    },\n                    {\n                        col1: "1",\n                        col2: "2",\n                        col3: "3",\n                        col4: "4",\n                        col5: "5",\n                        col6: "6",\n                        col7: "7",\n                        col8: "8",\n                    },\n                ],\n            };\n        },\n    };\n<\/script>\n')])])])],2)],1)},R=[];function q(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);n&&(l=l.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,l)}return t}function z(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?q(Object(t),!0).forEach((function(n){G(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):q(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function G(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var L={name:"component-doc",components:{"element-demo0":function(){var e=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[[t("ve-table",{attrs:{columns:e.columns,"table-data":e.tableData,"cell-style-option":e.cellStyleOption}})]],2)},n=[],t={data:function(){return{cellStyleOption:{headerCellClass:function(e){e.column;var n=e.rowIndex;if(0===n)return"table-header-cell-class"}},columns:[{field:"col1",key:"a",title:"col1",width:"10%"},{title:"col2-col3",children:[{field:"col2",key:"b",title:"col2",width:100},{field:"col3",key:"c",title:"col3",width:110}]},{title:"col4-col5-col6",children:[{title:"col4-col5",children:[{field:"col4",key:"d",title:"col4",width:130},{field:"col5",key:"e",title:"col5",width:140}]},{title:"col6",field:"col6",key:"f",width:140}]},{field:"col7",key:"g",title:"col7",width:150},{field:"col8",key:"h",title:"col8",width:160}],tableData:[{col1:"1",col2:"2",col3:"3",col4:"4",col5:"5",col6:"6",col7:"7",col8:"8"},{col1:"1",col2:"2",col3:"3",col4:"4",col5:"5",col6:"6",col7:"7",col8:"8"},{col1:"1",col2:"2",col3:"3",col4:"4",col5:"5",col6:"6",col7:"7",col8:"8"},{col1:"1",col2:"2",col3:"3",col4:"4",col5:"5",col6:"6",col7:"7",col8:"8"},{col1:"1",col2:"2",col3:"3",col4:"4",col5:"5",col6:"6",col7:"7",col8:"8"}]}}};return z({render:e,staticRenderFns:n},t)}()}},X=L,T=(t("1738"),Object(c["a"])(X,B,R,!1,null,null,null)),K=T.exports,M=t("5df0"),Q=t("9d46"),U={name:"custom-cell",components:{Explain:s,BodyCellStyle:g,BodyRowStyle:x,HeaderCellStyle:H,HeaderRowStyle:K,FooterRowStyle:M["a"],API:Q["a"]}},V=U,W=Object(c["a"])(V,l,o,!1,null,null,null);n["default"]=W.exports},"5df0":function(e,n,t){"use strict";var l=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("section",{staticClass:"content example-md-doc"},[t("anchor",{attrs:{"is-edit":"",label:"footer 单元格样式",fileName:"cell-style.md"}}),t("demo-block",[t("div",[t("p",[e._v("1、回调函数"),t("code",[e._v("footerCellClass({ row, column, rowIndex })")]),e._v("接收 3 个参数，row：当前行数据、column：当前列配置、rowIndex：行索引"),t("br"),e._v("2、将符合条件的单元格返回指定的 class 名称。class 名称自定义"),t("br"),e._v("3、如果需要给单元格设置背景色或字体颜色需要加上"),t("code",[e._v("!important")])])]),t("template",{slot:"source"},[t("element-demo0")],1),t("template",{slot:"highlight"},[t("pre",{pre:!0},[t("code",{pre:!0,attrs:{class:"html"}},[e._v('<template>\n    <ve-table\n        border-y\n        fixed-header\n        :max-height="300"\n        :columns="columns"\n        :table-data="tableData"\n        :footer-data="footerData"\n        :cell-style-option="cellStyleOption"\n        rowKeyFieldName="rowkey"\n    />\n</template>\n\n<style>\n    .table-footer-cell-class1 {\n        background: #91d5ff !important;\n        color: #fff !important;\n    }\n\n    .table-footer-cell-class2 {\n        background: orange !important;\n        color: #fff !important;\n    }\n</style>\n\n<script>\n    export default {\n        data() {\n            return {\n                cellStyleOption: {\n                    footerCellClass: ({ row, column, rowIndex }) => {\n                        if (column.field === "address") {\n                            return "table-footer-cell-class1";\n                        }\n\n                        if (column.field === "date" && rowIndex === 1) {\n                            return "table-footer-cell-class2";\n                        }\n                    },\n                },\n                columns: [\n                    { field: "name", key: "a", title: "Name", align: "left" },\n                    { field: "date", key: "b", title: "Date", align: "left" },\n                    { field: "hobby", key: "c", title: "Hobby", align: "left" },\n                    {\n                        field: "address",\n                        key: "d",\n                        title: "Address",\n                        width: "",\n                        align: "left",\n                    },\n                ],\n                tableData: [],\n            };\n        },\n        methods: {\n            initTableData() {\n                let data = [];\n                for (let i = 0; i < 15; i++) {\n                    data.push({\n                        rowkey: i,\n                        name: i,\n                        date: i,\n                        hobby: i,\n                        address: i,\n                    });\n                }\n                this.tableData = data;\n            },\n\n            initFooterData() {\n                this.footerData = [\n                    {\n                        rowkey: 0,\n                        name: "平均值",\n                        date: 213,\n                        hobby: 355,\n                        address: 189,\n                    },\n                    {\n                        rowkey: 1,\n                        name: "汇总值",\n                        date: 1780,\n                        hobby: 890,\n                        address: 2988,\n                    },\n                ];\n            },\n        },\n        created() {\n            this.initTableData();\n            this.initFooterData();\n        },\n    };\n<\/script>\n')])])])],2)],1)},o=[];function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);n&&(l=l.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,l)}return t}function r(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){c(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var i={name:"component-doc",components:{"element-demo0":function(){var e=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[[t("ve-table",{attrs:{"border-y":"","fixed-header":"","max-height":300,columns:e.columns,"table-data":e.tableData,"footer-data":e.footerData,"cell-style-option":e.cellStyleOption,rowKeyFieldName:"rowkey"}})]],2)},n=[],t={data:function(){return{cellStyleOption:{footerCellClass:function(e){e.row;var n=e.column,t=e.rowIndex;return"address"===n.field?"table-footer-cell-class1":"date"===n.field&&1===t?"table-footer-cell-class2":void 0}},columns:[{field:"name",key:"a",title:"Name",align:"left"},{field:"date",key:"b",title:"Date",align:"left"},{field:"hobby",key:"c",title:"Hobby",align:"left"},{field:"address",key:"d",title:"Address",width:"",align:"left"}],tableData:[]}},methods:{initTableData:function(){for(var e=[],n=0;n<15;n++)e.push({rowkey:n,name:n,date:n,hobby:n,address:n});this.tableData=e},initFooterData:function(){this.footerData=[{rowkey:0,name:"平均值",date:213,hobby:355,address:189},{rowkey:1,name:"汇总值",date:1780,hobby:890,address:2988}]}},created:function(){this.initTableData(),this.initFooterData()}};return r({render:e,staticRenderFns:n},t)}()}},d=i,s=(t("d034"),t("2877")),b=Object(s["a"])(d,l,o,!1,null,null,null);n["a"]=b.exports},"7a53":function(e,n,t){"use strict";t("ba14")},"7c1c":function(e,n,t){},"9d46":function(e,n,t){"use strict";var l=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("tpl",{attrs:{desc:e.desc,anchor:e.anchor,"table-data":e.db.cellStyleOption.data,columns:e.db.cellStyleOption.columns}})],1)},o=[],a=t("3ef3"),r=t("d890"),c={components:{tpl:a["a"]},props:{anchor:{type:String,default:"单元格样式配置"},desc:{type:String,default:"cellStyleOption"}},data:function(){return{db:r["a"]}}},i=c,d=t("2877"),s=Object(d["a"])(i,l,o,!1,null,null,null);n["a"]=s.exports},a6df:function(e,n,t){"use strict";t("3fef")},a72b:function(e,n,t){},ba14:function(e,n,t){},bb82:function(e,n,t){},d034:function(e,n,t){"use strict";t("a72b")}}]);
//# sourceMappingURL=chunk-2da0da34.8ef9111b.js.map