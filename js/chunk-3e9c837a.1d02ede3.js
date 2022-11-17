(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3e9c837a"],{"9fe2":function(e,n,t){"use strict";var i=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("tpl",{attrs:{desc:e.desc,anchor:e.anchor,"table-data":e.db.columnWidthResizeOption.data,columns:e.db.columnWidthResizeOption.columns}})],1)},l=[],o=t("3ef3"),c=t("d890"),r={components:{tpl:o["a"]},props:{anchor:{type:String,default:"列宽改变配置"},desc:{type:String,default:"columnWidthResizeOption"}},data:function(){return{db:c["a"]}}},d=r,a=t("2877"),s=Object(a["a"])(d,i,l,!1,null,null,null);n["a"]=s.exports},a9b5:function(e,n,t){"use strict";t.r(n);var i=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("h2",[e._v("列宽拖动")]),t("Explain"),t("Basic"),t("API",{attrs:{title:"API",anchor:"API"}})],1)},l=[],o=function(){var e=this,n=e.$createElement;e._self._c;return e._m(0)},c=[function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("section",{staticClass:"content example-md-doc"},[t("div",{staticClass:"tip"},[t("p",[e._v("1、当存在大文本时，列宽调整将会很有用"),t("br"),e._v(" 2、通过"),t("code",[e._v("columnWidthResizeOption")]),e._v("设置列宽拖动功能"),t("br"),e._v(" 3、建议设置"),t("code",[e._v("scroll-width=0")]),e._v("，那么当列宽总和大于容器宽度时，将会出横向滚动条"),t("br"),e._v(" 4、通过"),t("code",[e._v("column.width")]),e._v(" 设置列的默认宽度，如果所有列宽总和小于容器宽度，列宽度将会自适应")])])])}],r=t("2877"),d={},a=Object(r["a"])(d,o,c,!1,null,null,null),s=a.exports,u=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("section",{staticClass:"content example-md-doc"},[t("anchor",{attrs:{"is-edit":"",label:"列宽拖动",fileName:"basic.md"}}),t("p",[e._v("你可以将鼠标悬浮在两列之间，然后拖动即可。如果列宽度不设置，默认是 50px")]),t("demo-block",[t("div",[t("p",[e._v("1、通过 "),t("code",[e._v("minWidth")]),e._v("设置列拖动的最小宽度"),t("br"),e._v("2、通过"),t("code",[e._v("sizeChange({ column, differWidth, columnWidth })")]),e._v("列拖动变化的回调信息")])]),t("template",{slot:"source"},[t("element-demo0")],1),t("template",{slot:"highlight"},[t("pre",{pre:!0},[t("code",{pre:!0,attrs:{class:"html"}},[e._v('<template>\n    <div>\n        <div v-show="columnResizeInfo.column" style="margin:10px 0;line-height:2">\n            <div>column:{{columnResizeInfo.column}}</div>\n            <div>differWidth:{{columnResizeInfo.differWidth}}</div>\n            <div>columnWidth:{{columnResizeInfo.columnWidth}}</div>\n        </div>\n        <ve-table\n            style="width:100%"\n            :scroll-width="0"\n            :columns="columns"\n            :table-data="tableData"\n            :border-around="true"\n            :border-x="true"\n            :border-y="true"\n            :column-width-resize-option="columnWidthResizeOption"\n        />\n    </div>\n</template>\n\n<script>\n    import Mock from "mockjs";\n    export default {\n        data() {\n            return {\n                columnWidthResizeOption: {\n                    // default false\n                    enable: true,\n                    // column resize min width\n                    minWidth: 30,\n                    // column size change\n                    sizeChange: ({ column, differWidth, columnWidth }) => {\n                        this.columnResizeInfo.column = column;\n                        this.columnResizeInfo.differWidth = differWidth;\n                        this.columnResizeInfo.columnWidth = columnWidth;\n                    },\n                },\n                columns: [\n                    {\n                        field: "index",\n                        key: "index",\n                        title: "#",\n                        width: 50,\n                        align: "center",\n                        fixed: "left",\n                        renderBodyCell: ({ row, column, rowIndex }, h) => {\n                            return ++rowIndex;\n                        },\n                    },\n                    { field: "col1", key: "col1", title: "Col1", width: 220 },\n                    { field: "col2", key: "col2", title: "Col2", width: 220 },\n                    { field: "col3", key: "col3", title: "Col3", width: 220 },\n                    { field: "col4", key: "col4", title: "Col4", width: 220 },\n                    { field: "col5", key: "col5", title: "Col5", width: 220 },\n                    { field: "col6", key: "col6", title: "Col6", width: 220 },\n                    { field: "col7", key: "col7", title: "Col7" },\n                    { field: "col8", key: "col8", title: "Col8" },\n                ],\n                columnResizeInfo: {\n                    column: "",\n                    differWidth: "",\n                    columnWidth: "",\n                    tableWidth: "",\n                },\n                tableData: [],\n            };\n        },\n        methods: {\n            initTableData() {\n                let data = [];\n                for (let i = 0; i < 5; i++) {\n                    data.push({\n                        rowKey: i,\n                        col1: `A${i + 1}`,\n                        col2: Mock.Random.sentence(3, 12),\n                        col3: `C${i + 1}`,\n                        col4: `D${i + 1}`,\n                        col5: `E${i + 1}`,\n                        col6: `F${i + 1}`,\n                        col7: `G${i + 1}`,\n                        col8: `H${i + 1}`,\n                    });\n                }\n                this.tableData = data;\n            },\n        },\n        created() {\n            this.initTableData();\n        },\n    };\n<\/script>\n')])])])],2)],1)},m=[],f=t("96eb"),h=t.n(f);function p(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function v(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?p(Object(t),!0).forEach((function(n){b(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):p(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function b(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var w={name:"component-doc",components:{"element-demo0":function(){var e=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[[t("div",[t("div",{directives:[{name:"show",rawName:"v-show",value:e.columnResizeInfo.column,expression:"columnResizeInfo.column"}],staticStyle:{margin:"10px 0","line-height":"2"}},[t("div",[e._v("column:"+e._s(e.columnResizeInfo.column))]),e._v(" "),t("div",[e._v("differWidth:"+e._s(e.columnResizeInfo.differWidth))]),e._v(" "),t("div",[e._v("columnWidth:"+e._s(e.columnResizeInfo.columnWidth))])]),e._v(" "),t("ve-table",{staticStyle:{width:"100%"},attrs:{"scroll-width":0,columns:e.columns,"table-data":e.tableData,"border-around":!0,"border-x":!0,"border-y":!0,"column-width-resize-option":e.columnWidthResizeOption}})],1)]],2)},n=[],t={data:function(){var e=this;return{columnWidthResizeOption:{enable:!0,minWidth:30,sizeChange:function(n){var t=n.column,i=n.differWidth,l=n.columnWidth;e.columnResizeInfo.column=t,e.columnResizeInfo.differWidth=i,e.columnResizeInfo.columnWidth=l}},columns:[{field:"index",key:"index",title:"#",width:50,align:"center",fixed:"left",renderBodyCell:function(e,n){e.row,e.column;var t=e.rowIndex;return++t}},{field:"col1",key:"col1",title:"Col1",width:220},{field:"col2",key:"col2",title:"Col2",width:220},{field:"col3",key:"col3",title:"Col3",width:220},{field:"col4",key:"col4",title:"Col4",width:220},{field:"col5",key:"col5",title:"Col5",width:220},{field:"col6",key:"col6",title:"Col6",width:220},{field:"col7",key:"col7",title:"Col7"},{field:"col8",key:"col8",title:"Col8"}],columnResizeInfo:{column:"",differWidth:"",columnWidth:"",tableWidth:""},tableData:[]}},methods:{initTableData:function(){for(var e=[],n=0;n<5;n++)e.push({rowKey:n,col1:"A".concat(n+1),col2:h.a.Random.sentence(3,12),col3:"C".concat(n+1),col4:"D".concat(n+1),col5:"E".concat(n+1),col6:"F".concat(n+1),col7:"G".concat(n+1),col8:"H".concat(n+1)});this.tableData=e}},created:function(){this.initTableData()}};return v({render:e,staticRenderFns:n},t)}()}},y=w,_=Object(r["a"])(y,u,m,!1,null,null,null),W=_.exports,z=t("9fe2"),O={name:"basic-main",components:{Explain:s,Basic:W,API:z["a"]}},R=O,k=Object(r["a"])(R,i,l,!1,null,null,null);n["default"]=k.exports}}]);
//# sourceMappingURL=chunk-3e9c837a.1d02ede3.js.map