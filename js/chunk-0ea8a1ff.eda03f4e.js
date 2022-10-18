(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0ea8a1ff"],{"30a6":function(e,t,l){"use strict";var n=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",[l("tpl",{attrs:{desc:e.desc,anchor:e.anchor,"table-data":e.db.cellAutofillOption.data,columns:e.db.cellAutofillOption.columns}})],1)},o=[],i=l("3ef3"),c=l("7eb4"),a={components:{tpl:i["a"]},props:{anchor:{type:String,default:"Cell Autofill Option"},desc:{type:String,default:"cellAutofillOption"}},data:function(){return{db:c["a"]}}},r=a,s=l("2877"),d=Object(s["a"])(r,n,o,!1,null,null,null);t["a"]=d.exports},"3f1f":function(e,t,l){"use strict";l.r(t);var n=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",[l("h2",[e._v("Cell Autofill")]),l("Explain"),l("Base"),l("AutofillDirection"),l("API",{attrs:{title:"API",anchor:"API"}})],1)},o=[],i=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},c=[function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("section",{staticClass:"content example-md-doc"},[l("div",{staticClass:"tip"},[l("p",[e._v("When there is data that needs to be copied repeatedly, you can automatically fill in the cell content like excel")])])])}],a=l("2877"),r={},s=Object(a["a"])(r,i,c,!1,null,null,null),d=s.exports,u=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("section",{staticClass:"content example-md-doc"},[l("anchor",{attrs:{"is-edit":"",label:"Base usage",fileName:"base.md"}}),l("demo-block",[l("template",{slot:"source"},[l("element-demo0")],1),l("template",{slot:"highlight"},[l("pre",{pre:!0},[l("code",{pre:!0,attrs:{class:"html"}},[e._v('<template>\n    <ve-table\n        fixed-header\n        :scroll-width="1600"\n        :max-height="500"\n        border-y\n        :columns="columns"\n        :table-data="tableData"\n        rowKeyFieldName="rowKey"\n        :virtual-scroll-option="virtualScrollOption"\n        :cell-autofill-option="cellAutofillOption"\n        :rowStyleOption="rowStyleOption"\n    />\n</template>\n\n<script>\n    export default {\n        data() {\n            return {\n                rowStyleOption: {\n                    clickHighlight: false,\n                    hoverHighlight: false,\n                },\n                virtualScrollOption: {\n                    enable: true,\n                },\n                cellAutofillOption: {\n                    directionX: true,\n                    directionY: true,\n                    beforeAutofill: ({\n                        direction,\n                        sourceSelectionRangeIndexes,\n                        targetSelectionRangeIndexes,\n                        sourceSelectionData,\n                        targetSelectionData,\n                    }) => {\n                        console.log("direction::", direction);\n                        console.log("sourceSelectionRangeIndexes::", sourceSelectionRangeIndexes);\n                        console.log("targetSelectionRangeIndexes::", targetSelectionRangeIndexes);\n                        console.log("sourceSelectionData::", sourceSelectionData);\n                        console.log("targetSelectionData::", targetSelectionData);\n                        console.log("---");\n                    },\n                    afterAutofill: ({\n                        direction,\n                        sourceSelectionRangeIndexes,\n                        targetSelectionRangeIndexes,\n                        sourceSelectionData,\n                        targetSelectionData,\n                    }) => {\n                        console.log("direction::", direction);\n                        console.log("sourceSelectionRangeIndexes::", sourceSelectionRangeIndexes);\n                        console.log("targetSelectionRangeIndexes::", targetSelectionRangeIndexes);\n                        console.log("sourceSelectionData::", sourceSelectionData);\n                        console.log("targetSelectionData::", targetSelectionData);\n                        console.log("---");\n                    },\n                },\n                columns: [\n                    {\n                        field: "index",\n                        key: "index",\n                        // is operation column\n                        operationColumn: true,\n                        title: "#",\n                        width: 15,\n                        fixed: "left",\n                    },\n                    {\n                        field: "col1",\n                        key: "a",\n                        title: "col1",\n                        width: 50,\n                        fixed: "left",\n                    },\n                    {\n                        title: "col2-col3",\n                        fixed: "left",\n                        children: [\n                            {\n                                field: "col2",\n                                key: "b",\n                                title: "col2",\n                                width: 50,\n                            },\n                            {\n                                field: "col3",\n                                key: "col3",\n                                title: "col3",\n                                width: 30,\n                            },\n                        ],\n                    },\n                    {\n                        title: "col4-col5-col6",\n                        children: [\n                            {\n                                title: "col4-col5",\n                                children: [\n                                    {\n                                        field: "col4",\n                                        key: "col4",\n                                        title: "col4",\n                                        width: 110,\n                                    },\n                                    {\n                                        field: "col5",\n                                        key: "col5",\n                                        title: "col5",\n                                        width: 120,\n                                    },\n                                ],\n                            },\n                            {\n                                title: "col6",\n                                field: "col6",\n                                key: "col6",\n                                width: 130,\n                            },\n                        ],\n                    },\n                    {\n                        title: "col7",\n                        fixed: "right",\n                        children: [\n                            {\n                                title: "col7-1",\n                                field: "col7",\n                                key: "col7",\n                                width: 50,\n                            },\n                        ],\n                    },\n                ],\n                tableData: [],\n            };\n        },\n        methods: {\n            initTableData() {\n                let data = [];\n                for (let i = 0; i < 100; i++) {\n                    data.push({\n                        rowKey: i,\n                        index: i + 1,\n                        col1: `A${i + 1}`,\n                        col2: `B${i + 1}`,\n                        col3: `C${i + 1}`,\n                        col4: `D${i + 1}`,\n                        col5: `E${i + 1}`,\n                        col6: `F${i + 1}`,\n                        col7: `G${i + 1}`,\n                    });\n                }\n                this.tableData = data;\n            },\n        },\n        created() {\n            this.initTableData();\n        },\n    };\n<\/script>\n')])])])],2)],1)},f=[];function p(e,t){var l=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),l.push.apply(l,n)}return l}function h(e){for(var t=1;t<arguments.length;t++){var l=null!=arguments[t]?arguments[t]:{};t%2?p(Object(l),!0).forEach((function(t){g(e,t,l[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(l)):p(Object(l)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(l,t))}))}return e}function g(e,t,l){return t in e?Object.defineProperty(e,t,{value:l,enumerable:!0,configurable:!0,writable:!0}):e[t]=l,e}var b={name:"component-doc",components:{"element-demo0":function(){var e=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",[[l("ve-table",{attrs:{"fixed-header":"","scroll-width":1600,"max-height":500,"border-y":"",columns:e.columns,"table-data":e.tableData,rowKeyFieldName:"rowKey","virtual-scroll-option":e.virtualScrollOption,"cell-autofill-option":e.cellAutofillOption,rowStyleOption:e.rowStyleOption}})]],2)},t=[],l={data:function(){return{rowStyleOption:{clickHighlight:!1,hoverHighlight:!1},virtualScrollOption:{enable:!0},cellAutofillOption:{directionX:!0,directionY:!0,beforeAutofill:function(e){var t=e.direction,l=e.sourceSelectionRangeIndexes,n=e.targetSelectionRangeIndexes,o=e.sourceSelectionData,i=e.targetSelectionData;console.log("direction::",t),console.log("sourceSelectionRangeIndexes::",l),console.log("targetSelectionRangeIndexes::",n),console.log("sourceSelectionData::",o),console.log("targetSelectionData::",i),console.log("---")},afterAutofill:function(e){var t=e.direction,l=e.sourceSelectionRangeIndexes,n=e.targetSelectionRangeIndexes,o=e.sourceSelectionData,i=e.targetSelectionData;console.log("direction::",t),console.log("sourceSelectionRangeIndexes::",l),console.log("targetSelectionRangeIndexes::",n),console.log("sourceSelectionData::",o),console.log("targetSelectionData::",i),console.log("---")}},columns:[{field:"index",key:"index",operationColumn:!0,title:"#",width:15,fixed:"left"},{field:"col1",key:"a",title:"col1",width:50,fixed:"left"},{title:"col2-col3",fixed:"left",children:[{field:"col2",key:"b",title:"col2",width:50},{field:"col3",key:"col3",title:"col3",width:30}]},{title:"col4-col5-col6",children:[{title:"col4-col5",children:[{field:"col4",key:"col4",title:"col4",width:110},{field:"col5",key:"col5",title:"col5",width:120}]},{title:"col6",field:"col6",key:"col6",width:130}]},{title:"col7",fixed:"right",children:[{title:"col7-1",field:"col7",key:"col7",width:50}]}],tableData:[]}},methods:{initTableData:function(){for(var e=[],t=0;t<100;t++)e.push({rowKey:t,index:t+1,col1:"A".concat(t+1),col2:"B".concat(t+1),col3:"C".concat(t+1),col4:"D".concat(t+1),col5:"E".concat(t+1),col6:"F".concat(t+1),col7:"G".concat(t+1)});this.tableData=e}},created:function(){this.initTableData()}};return h({render:e,staticRenderFns:t},l)}()}},y=b,m=Object(a["a"])(y,u,f,!1,null,null,null),O=m.exports,v=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("section",{staticClass:"content example-md-doc"},[l("anchor",{attrs:{"is-edit":"",label:"Cell autifill direction",fileName:"autofill-direction.md"}}),l("demo-block",[l("div",[l("p",[e._v("It can be set to enable autofilling in a certain direction")])]),l("template",{slot:"source"},[l("element-demo0")],1),l("template",{slot:"highlight"},[l("pre",{pre:!0},[l("code",{pre:!0,attrs:{class:"html"}},[e._v('<template>\n    <div>\n        <el-radio-group @change="autofillTypeChang" v-model="autofillType">\n            <el-radio label="Horizontal">Horizontal</el-radio>\n            <el-radio label="Vertical">Vertical</el-radio>\n            <el-radio label="All">All</el-radio>\n        </el-radio-group>\n        <br />\n        <br />\n        <ve-table\n            fixed-header\n            border-y\n            :columns="columns"\n            :table-data="tableData"\n            :cell-autofill-option="cellAutofillOption"\n            rowKeyFieldName="rowKey"\n            :rowStyleOption="rowStyleOption"\n        />\n    </div>\n</template>\n\n<script>\n    export default {\n        data() {\n            return {\n                autofillType: "All",\n                cellAutofillOption: {\n                    directionX: true,\n                    directionY: true,\n                },\n                rowStyleOption: {\n                    clickHighlight: false,\n                    hoverHighlight: false,\n                },\n                columns: [\n                    { field: "col1", key: "col1", title: "Col1" },\n                    { field: "col2", key: "col2", title: "Col2" },\n                    { field: "col3", key: "col3", title: "Col3" },\n                    { field: "col4", key: "col4", title: "Col4" },\n                    { field: "col5", key: "col5", title: "Col5" },\n                    { field: "col6", key: "col6", title: "Col6" },\n                ],\n                tableData: [],\n            };\n        },\n        methods: {\n            autofillTypeChang(type) {\n                this.cellAutofillOption.directionX = false;\n                this.cellAutofillOption.directionY = false;\n                if (type === "Horizontal") {\n                    this.cellAutofillOption.directionX = true;\n                } else if (type === "Vertical") {\n                    this.cellAutofillOption.directionY = true;\n                } else if (type === "All") {\n                    this.cellAutofillOption.directionX = true;\n                    this.cellAutofillOption.directionY = true;\n                }\n            },\n            initTableData() {\n                let data = [];\n                for (let i = 0; i < 8; i++) {\n                    data.push({\n                        rowKey: i,\n                        col1: `A${i + 1}`,\n                        col2: `B${i + 1}`,\n                        col3: `C${i + 1}`,\n                        col4: `D${i + 1}`,\n                        col5: `E${i + 1}`,\n                        col6: `F${i + 1}`,\n                        col7: `G${i + 1}`,\n                        col8: `H${i + 1}`,\n                    });\n                }\n                this.tableData = data;\n            },\n        },\n        created() {\n            this.initTableData();\n        },\n    };\n<\/script>\n')])])])],2)],1)},w=[];function S(e,t){var l=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),l.push.apply(l,n)}return l}function x(e){for(var t=1;t<arguments.length;t++){var l=null!=arguments[t]?arguments[t]:{};t%2?S(Object(l),!0).forEach((function(t){D(e,t,l[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(l)):S(Object(l)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(l,t))}))}return e}function D(e,t,l){return t in e?Object.defineProperty(e,t,{value:l,enumerable:!0,configurable:!0,writable:!0}):e[t]=l,e}var A={name:"component-doc",components:{"element-demo0":function(){var e=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",[[l("div",[l("el-radio-group",{on:{change:e.autofillTypeChang},model:{value:e.autofillType,callback:function(t){e.autofillType=t},expression:"autofillType"}},[l("el-radio",{attrs:{label:"Horizontal"}},[e._v("Horizontal")]),e._v(" "),l("el-radio",{attrs:{label:"Vertical"}},[e._v("Vertical")]),e._v(" "),l("el-radio",{attrs:{label:"All"}},[e._v("All")])],1),e._v(" "),l("br"),e._v(" "),l("br"),e._v(" "),l("ve-table",{attrs:{"fixed-header":"","border-y":"",columns:e.columns,"table-data":e.tableData,"cell-autofill-option":e.cellAutofillOption,rowKeyFieldName:"rowKey",rowStyleOption:e.rowStyleOption}})],1)]],2)},t=[],l={data:function(){return{autofillType:"All",cellAutofillOption:{directionX:!0,directionY:!0},rowStyleOption:{clickHighlight:!1,hoverHighlight:!1},columns:[{field:"col1",key:"col1",title:"Col1"},{field:"col2",key:"col2",title:"Col2"},{field:"col3",key:"col3",title:"Col3"},{field:"col4",key:"col4",title:"Col4"},{field:"col5",key:"col5",title:"Col5"},{field:"col6",key:"col6",title:"Col6"}],tableData:[]}},methods:{autofillTypeChang:function(e){this.cellAutofillOption.directionX=!1,this.cellAutofillOption.directionY=!1,"Horizontal"===e?this.cellAutofillOption.directionX=!0:"Vertical"===e?this.cellAutofillOption.directionY=!0:"All"===e&&(this.cellAutofillOption.directionX=!0,this.cellAutofillOption.directionY=!0)},initTableData:function(){for(var e=[],t=0;t<8;t++)e.push({rowKey:t,col1:"A".concat(t+1),col2:"B".concat(t+1),col3:"C".concat(t+1),col4:"D".concat(t+1),col5:"E".concat(t+1),col6:"F".concat(t+1),col7:"G".concat(t+1),col8:"H".concat(t+1)});this.tableData=e}},created:function(){this.initTableData()}};return x({render:e,staticRenderFns:t},l)}()}},k=A,_=Object(a["a"])(k,v,w,!1,null,null,null),j=_.exports,C=l("30a6"),I={name:"cell-selection",components:{Explain:d,Base:O,AutofillDirection:j,API:C["a"]}},$=I,P=Object(a["a"])($,n,o,!1,null,null,null);t["default"]=P.exports}}]);
//# sourceMappingURL=chunk-0ea8a1ff.eda03f4e.js.map