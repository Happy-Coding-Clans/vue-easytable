// 列配置类型1
const columnsType1 = [
    {
        key: "a",
        field: "param",
        title: "参数",
        width: "10%",
        align: "left",
        type: "expand",
        renderBodyCell: ({ row, column, rowIndex }, h) => {
            return <span domPropsInnerHTML={row.param}></span>;
        },
    },
    {
        key: "b",
        field: "desc",
        title: "说明",
        width: "60%",
        align: "left",
        renderBodyCell: ({ row, column, rowIndex }, h) => {
            return <span domPropsInnerHTML={row.desc}></span>;
        },
    },
    {
        key: "c",
        field: "type",
        title: "类型",
        width: "10%",
        align: "left",
        renderBodyCell: ({ row, column, rowIndex }, h) => {
            return <span domPropsInnerHTML={row.type}></span>;
        },
    },
    {
        key: "d",
        field: "optionalVal",
        title: "可选值",
        width: "10%",
        align: "left",
        renderBodyCell: ({ row, column, rowIndex }, h) => {
            return <span domPropsInnerHTML={row.optionalVal}></span>;
        },
    },
    {
        key: "e",
        field: "default",
        title: "默认值",
        width: "10%",
        align: "left",
        renderBodyCell: ({ row, column, rowIndex }, h) => {
            return <span domPropsInnerHTML={row.default}></span>;
        },
    },
];

// 列配置类型2（应用于实例方法）
const columnsType2 = [
    // {
    //     key: "a",
    //     field: "param",
    //     title: "参数",
    //     width: "10%",
    //     align: "left",
    //     type: "expand",
    //     renderBodyCell: ({ row, column, rowIndex }, h) => {
    //         return <span domPropsInnerHTML={row.param}></span>;
    //     },
    // },
    {
        key: "b",
        field: "name",
        title: "方法名",
        width: "15%",
        align: "left",
        renderBodyCell: ({ row, column, rowIndex }, h) => {
            return <span domPropsInnerHTML={row.name}></span>;
        },
    },
    {
        key: "c",
        field: "desc",
        title: "说明",
        width: "65%",
        align: "left",
        renderBodyCell: ({ row, column, rowIndex }, h) => {
            return <span domPropsInnerHTML={row.desc}></span>;
        },
    },
    {
        key: "d",
        field: "param",
        title: "参数",
        width: "20%",
        align: "left",
        renderBodyCell: ({ row, column, rowIndex }, h) => {
            return <span domPropsInnerHTML={row.param}></span>;
        },
    },
];

export const db = {
    // table props option
    table: {
        data: [
            {
                param: "tableData",
                desc: "表格数据",
                type: "<code>Array</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "footerData",
                desc: "表格footer 汇总数据，数据结构和 <code>tableData</code> 一致",
                type: "<code>Array</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "columns",
                desc: `列配置，具体项见下表 columns 配置`,
                type: `<code>Array</code>`,
                optionalVal: "-",
                default: "-",
            },
            {
                param: "fixedHeader",
                desc: "是否固定表头，默认启用。需要和 `maxHeight`结合使用",
                type: "<code>Boolean</code>",
                optionalVal: "-",
                default: "true",
            },
            {
                param: "fixedFooter",
                desc: "是否固定footer 汇总，默认启用。需要和 `maxHeight`结合使用",
                type: "<code>Boolean</code>",
                optionalVal: "-",
                default: "true",
            },
            {
                param: "scrollWidth",
                desc: "表格滚动区域的宽（开始出滚动条的宽度）。<code>Number</code>指定像素；<code>String</code>指定百分比",
                type: "<code>Number</code>、<code>String</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "maxHeight",
                desc: "表格的最大高度。<code>Number</code>指定像素；<code>String</code>指定百分比。用于“固定头”或“虚拟滚动”功能",
                type: "<code>Number</code>、<code>String</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "rowKeyFieldName",
                desc: "指定 row key 的字段名称。用于行展开、行单选、行多选、行点击高亮、虚拟滚动",
                type: "<code>String</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "borderAround",
                desc: "是否展示表格外边框",
                type: "<code>Boolean</code>",
                optionalVal: "-",
                default: "true",
            },
            {
                param: "borderX",
                desc: "是否展示列横向边框",
                type: "<code>Boolean</code>",
                optionalVal: "-",
                default: "true",
            },
            {
                param: "borderY",
                desc: "是否展示列纵向边框",
                type: "<code>Boolean</code>",
                optionalVal: "-",
                default: "false",
            },

            {
                param: "cellSpanOption",
                desc: "单元格合并配置，具体见下表 cellSpanOption 配置",
                type: "<code>Object</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "cellStyleOption",
                desc: "单元格样式配置，具体见下表 cellStyleOption 配置",
                type: "<code>Object</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "rowStyleOption",
                desc: "行样式配置，具体见下表 rowStyleOption 配置",
                type: "<code>Object</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "expandOption",
                desc: "行展开配置，具体见下表 expandOption 配置",
                type: "<code>Object</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "checkboxOption",
                desc: "行多选配置，具体见下表 checkboxOption 配置",
                type: "<code>Object</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "radioOption",
                desc: "行单选配置，具体见下表 radioOption 配置",
                type: "<code>Object</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "virtualScrollOption",
                desc: "虚拟滚动配置，建议需要一次性展示1000条以上使用。具体见下表 virtualScrollOption 配置。",
                type: "<code>Boolean</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "sortOption",
                desc: "排序配置，具体见下表 sortOption 配置",
                type: "<code>Object</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "cellSelectionOption",
                desc: "单元格选择配置，具体见下表 cellSelectionOption 配置",
                type: "<code>Object</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "editOption",
                desc: "单元格编辑配置，具体见下表 editOption 配置",
                type: "<code>Object</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "eventCustomOption",
                desc: `自定义事件配置，具体见下表 eventCustomOption 配置`,
                type: "<code>Object</code>",
                optionalVal: "-",
                default: "-",
            },
        ],
        columns: columnsType1,
    },

    // columns props
    columns: {
        data: [
            {
                param: "field",
                desc: "	对应列的字段",
                type: "<code>String</code>",
                optionalVal: "-",
                default: "-",
                rowKey: 0,
            },
            {
                param: "key",
                desc: "每个列的唯一key值",
                type: "<code>String</code>",
                optionalVal: "-",
                default: "-",
                rowKey: 5,
            },
            {
                param: "type",
                desc: `当前列类型。 "expand"：行展开；"checkbox"：行多选；"radio"：行单选`,
                type: "<code>String</code>",
                optionalVal: `"expand"、"checkbox"、"radio"`,
                default: "-",
                rowKey: 15,
            },
            {
                param: "title",
                desc: "列标题",
                type: "<code>String</code>",
                optionalVal: "-",
                default: "-",
                rowKey: 20,
            },
            {
                param: "width",
                desc: "<code>Number</code>指定像素；<code>String</code>指定百分比（<a href='#/zh/doc/table/column-width?anchor=chang-wen-ben-po-pi-bu-ju'>指定了也不生效？</a>）",
                type: `<code>String</code>、<code>Number</code>`,
                optionalVal: "-",
                default: "-",
                rowKey: 25,
            },
            {
                param: "align",
                desc: "单元格对齐方式",
                type: "<code>String</code>",
                optionalVal: `"left"、"center"、"right"`,
                default: `"center"`,
                rowKey: 30,
            },
            {
                param: "edit",
                desc: "是否开启列编辑",
                type: "<code>Boolean</code>",
                optionalVal: `-`,
                default: `"false"`,
                rowKey: 32,
            },
            {
                param: "sortBy",
                desc: `排序规则。<br>1、<code>sortBy=""</code>：允许排序但无排序规则；<br>2、<code>sortBy="asc"</code>：默认当前列升序；<br>3、<code>sortBy="desc"</code>：默认当前列降序；`,
                type: "<code>String</code>",
                optionalVal: `""、"desc"、"asc"`,
                default: `""`,
                rowKey: 31,
            },
            {
                param: "renderBodyCell",
                desc: `1、表体自定义单元格渲染函数。jsx 语法,书写和模板语法接近。<br>
                2、参数信息。<code>row</code>:当前行数据、<code>column</code>:当前列配置、<code>rowIndex</code>:行索引、<code>h</code>：createElement 函数的别名<br>3、更多 jsx 知识请参考<a href="https://vuejs.org/v2/guide/render-function.html#JSX">Vue.js 官方文档</a>`,
                type: `<code>Function({row,column,rowIndex},h):VNode</code>`,
                optionalVal: "-",
                default: "-",
                rowKey: 35,
            },
            {
                param: "renderHeaderCell",
                desc: `1、表头自定义单元格渲染函数。用法同<code>renderBodyCell</code>。<br>
                2、参数信息。<code>column</code>:当前列配置、<code>h</code>：createElement 函数的别名`,
                type: "<code>Function({ column },h):VNode</code>",
                optionalVal: "-",
                default: "-",
                rowKey: 40,
            },
            {
                param: "renderFooterCell",
                desc: `1、footer汇总 自定义单元格渲染函数。<br>
                2、参数信息。<code>row</code>:当前行数据、<code>column</code>:当前列配置、<code>rowIndex</code>:行索引、<code>h</code>：createElement 函数的别名<br>3、更多 jsx 知识请参考<a href="https://vuejs.org/v2/guide/render-function.html#JSX">Vue.js 官方文档</a>`,
                type: `<code>Function({row,column,rowIndex},h):VNode</code>`,
                optionalVal: "-",
                default: "-",
                rowKey: 45,
            },
            {
                param: "<span class='expand'>ellipsis</span>",
                desc: `单元格省略配置。`,
                type: "<code>Object</code>",
                optionalVal: "-",
                default: "-",
                rowKey: 49,
            },
            {
                param: "<span class='expand'>filter</span>",
                desc: `筛选配置。`,
                type: "<code>Object</code>",
                optionalVal: "-",
                default: "-",
                rowKey: 50,
            },
            {
                param: "<span class='expand'>filterCustom</span>",
                desc: `筛选自定义配置。`,
                type: "<code>Object</code>",
                optionalVal: "-",
                default: "-",
                rowKey: 55,
            },
        ],
        columns: columnsType1,
        //column filter props
        filterProps: {
            data: [
                {
                    param: "filterList",
                    desc: `	1、筛选条件。<br>
                    2、包含label、value、selected 3 个属性，形如：<code>[{ value: 0, label: "1900-05-20", selected: false }]</code>`,
                    type: "<code>Array</code>",
                    optionalVal: "-",
                    default: "-",
                },
                {
                    param: "isMultiple",
                    desc: `开启筛选项多选。<br>`,
                    type: "<code>Boolean</code>",
                    optionalVal: "-",
                    default: "false",
                },
                {
                    param: "filterConfirm",
                    desc: `1、筛选确认函数。<br>2、接收1个参数，<code>filterList</code>：筛选条件`,
                    type: "<code>Function({filterList})</code>",
                    optionalVal: "-",
                    default: "-",
                },
                {
                    param: "filterReset",
                    desc: `1、筛选重置函数<br>2、接收1个参数，<code>filterList</code>：筛选条件`,
                    type: "<code>Function({filterList})</code>",
                    optionalVal: "-",
                    default: "-",
                },
                {
                    param: "filterIcon",
                    desc: `1、filter 自定义图标渲染函数。<br>2、参数信息。h：createElement 函数的别名`,
                    type: "<code>Function(h):VNode</code>",
                    optionalVal: "-",
                    default: "-",
                },
                {
                    param: "maxHeight",
                    desc: `1、筛选框的最大高度。不包含操作按钮的高度`,
                    type: "<code>Number</code>",
                    optionalVal: "-",
                    default: "1000",
                },
            ],
            columns: columnsType1,
        },
        //column filter custom props
        filterCustomProps: {
            data: [
                {
                    param: "render",
                    desc: `1、渲染函数。<br>
                    2、渲染函数接收的参数，showFn:显示filter 函数、closeFn:关闭filter的函数、<code>h</code>：createElement 函数的别名`,
                    type: "<code>Function({showFn,closeFn},h):VNode</code>",
                    optionalVal: "-",
                    default: "-",
                },
                {
                    param: "filterIcon",
                    desc: `1、filter 自定义图标渲染函数。<br>2、参数信息。h：createElement 函数的别名`,
                    type: "<code>Function(h):VNode</code>",
                    optionalVal: "-",
                    default: "-",
                },
            ],
            columns: columnsType1,
        },
        // ellipsis
        ellipsisProps: {
            data: [
                {
                    param: "lineClamp",
                    desc: `多少行开始省略`,
                    type: "<code>Number</code>",
                    optionalVal: "-",
                    default: "1",
                },
                {
                    param: "showTitle",
                    desc: `是否鼠标悬浮，展示title`,
                    type: "<code>Boolean</code>",
                    optionalVal: "-",
                    default: "true",
                },
            ],
            columns: columnsType1,
        },
    },

    // instance methods
    instanceMethods: {
        data: [
            {
                name: "scrollTo",
                desc: `使表格滚动到指定的位置`,
                param: "参考<a href='https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollTo'> MDN scrollTo</a>",
            },
            {
                name: "scrollToRowKey",
                desc: `将表格滚动到行为rowKey的位置`,
                param: "{rowKey}",
            },
            {
                name: "setHighlightRow",
                desc: `设置高亮的行 <a href='#/zh/doc/table/row-style?anchor=row-click-highlight'>参考示例</a>`,
                param: "{rowKey}",
            },
            {
                name: "startEditingCell",
                desc: `开始单元格编辑  <a href='#/zh/doc/table/cell-edit?anchor=ke-kong-bian-ji'>参考示例</a>`,
                param: "{rowKey,colKey,defaultValue}",
            },
            {
                name: "stopEditingCell",
                desc: `停止单元格编辑  <a href='#/zh/doc/table/cell-edit?anchor=ke-kong-bian-ji'>参考示例</a>`,
                param: "{rowKey,colKey}",
            },
            {
                name: "stopAllEditingCell",
                desc: `停止所有单元格编辑  <a href='#/zh/doc/table/cell-edit?anchor=ke-kong-bian-ji'>参考示例</a>`,
                param: "-",
            },
        ],
        columns: columnsType2,
    },

    // 可展开配置
    expandOption: {
        data: [
            {
                param: "expandable",
                desc: `	1、是否允许展开行渲染函数。返回布尔值。<br>
                2、渲染函数接收三个参数，<code>row</code>:当前行数据、<code>column</code>:可展开列配置、<code>rowIndex</code>:行索引。`,
                type: "<code>Function({row,column,rowIndex})</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "render",
                desc: `1、渲染函数。<br>
                2、渲染函数接收的参数，row:当前行数据、column:可展开列配置、rowIndex:行索引、<code>h</code>：createElement 函数的别名`,
                type: "<code>Function({row,column,rowIndex},h):VNode</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "defaultExpandAllRows",
                desc: `是否默认展开全部行`,
                type: "<code>Boolean</code>",
                optionalVal: "-",
                default: "false",
            },
            {
                param: "defaultExpandedRowKeys",
                desc: `默认展开的行key。<code>defaultExpandAllRows</code> 参数和<code>defaultExpandedRowKeys</code> 参数同时存在时，优先使用<code>defaultExpandAllRows</code>`,
                type: "<code>String[]</code>、<code>Number[]</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "expandedRowKeys",
                desc: `展开行的可控属性，设置后属性后 <code>defaultExpandAllRows</code>和<code>defaultExpandedRowKeys</code>属性将会失效。具体见相关实例`,
                type: "<code>String[]</code>、<code>Number[]</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "beforeExpandRowChange",
                desc: `1、展开切换前的函数，如果返回false 则中断执行。<br>
                2、函数接收三个参数，<code>beforeExpandedRowKeys</code>:改变前所有展开的key，<code>row</code>:当前的行数据，<code>rowIndex</code>行号`,
                type: "<code>Function({beforeExpandedRowKeys,row,rowIndex})</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "afterExpandRowChange",
                desc: `1、展开切换后的函数。<br>
                2、函数接收三个参数，<code>afterExpandedRowKeys</code>:改变后所有展开的key，<code>row</code>:当前的行数据，<code>rowIndex</code>行号`,
                type: "<code>Function({afterExpandedRowKeys,row,rowIndex})</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "trigger",
                desc: `展开行事件触发类型。
                <code>icon</code>：点击展开小图标；<code>cell</code>：点击单元格;<code>row</code>:点击行`,
                type: "<code>String</code>",
                optionalVal: `"icon"、"cell"、"row"`,
                default: `"icon"`,
            },
        ],
        columns: columnsType1,
    },

    // 行多选配置
    checkboxOption: {
        data: [
            {
                param: "defaultSelectedAllRows",
                desc: `	是否默认全部选中`,
                type: "<code>Boolean</code>",
                optionalVal: "-",
                default: "false",
            },
            {
                param: "defaultSelectedRowKeys",
                desc: `默认选中的行key`,
                type: "<code>String[]</code>、<code>Number[]</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "disableSelectedRowKeys",
                desc: `禁止勾选或者禁止取消勾选的行key`,
                type: "<code>String[]</code>、<code>Number[]</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "selectedRowKeys",
                desc: `选中行的可控属性，设置后 <code>defaultSelectedAllRows</code> 和 <code>defaultSelectedRowKeys</code> 属性将会失效。具体参考示例`,
                type: "<code>String[]</code>、<code>Number[]</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "selectedRowChange",
                desc: `行选中的改变事件。事件接收 3 个参数，row:当前行数据，<code>isSelected</code>当前行是否选中，<code>selectedRowKeys</code>所有选中的 rowKey 信息`,
                type: "<code>Function({row, isSelected, selectedRowKeys})</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "selectedAllChange",
                desc: `全选改变事件。事件接收 2 个参数，<code>isSelected</code> 是否全选。<code>selectedRowKeys</code>所有选中的 rowKey 信息`,
                type: `<code>Function({isSelected, selectedRowKeys})</code>`,
                optionalVal: "-",
                default: "-",
            },
            {
                param: "hideSelectAll",
                desc: `是否隐藏全选按钮`,
                type: "<code>Boolean</code>",
                optionalVal: "-",
                default: "false",
            },
        ],
        columns: columnsType1,
    },

    // 行单选配置
    radioOption: {
        data: [
            {
                param: "defaultSelectedRowKey",
                desc: `默认选中的行key`,
                type: "<code>String</code>、<code>Number</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "disableSelectedRowKeys",
                desc: `禁止勾选或者禁止取消勾选的行key`,
                type: "<code>String[]</code>、<code>Number[]</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "selectedRowKey",
                desc: `选中行的可控属性，设置后 <code>defaultSelectedRowKey</code>属性将会失效。具体参考示例`,
                type: "<code>String</code>、<code>Number</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "selectedRowChange",
                desc: `行选中的改变事件。事件接收 1 个参数，row:当前行数据`,
                type: "<code>Function({row})</code>",
                optionalVal: "-",
                default: "-",
            },
        ],
        columns: columnsType1,
    },

    // 虚拟滚动设置
    virtualScrollOption: {
        data: [
            {
                param: "enable",
                desc: `是否开启虚拟滚动`,
                type: "<code>Boolean</code>",
                optionalVal: "-",
                default: "false",
            },
            {
                param: "minRowHeight",
                desc: `最小行高（px）。值越小，可视化范围渲染的数据越多，具体根据实际最小高度设置即可`,
                type: "<code>Number</code>",
                optionalVal: "-",
                default: "42",
            },
            {
                param: "scrolling",
                desc: `滚动回调事件。`,
                type: "Function({startRowIndex,visibleStartIndex,visibleEndIndex,visibleAboveCount,visibleBelowCount})",
                optionalVal: "-",
                default: "-",
            },
            /* {
                param: "bufferScale",
                desc: `缓冲比例。可视范围数据的整数倍，防止滚动过快白屏，默认无缓冲`,
                type: "<code>Number</code>",
                optionalVal: "-",
                default: "0"
            } */
        ],
        columns: columnsType1,
    },

    // 排序设置
    sortOption: {
        data: [
            {
                param: "multipleSort",
                desc: `是否开启多字段排序`,
                type: "<code>Boolean</code>",
                optionalVal: "-",
                default: "false",
            },
            {
                param: "sortAlways",
                desc: `是否开启排序只在升序和降序切换`,
                type: "<code>Boolean</code>",
                optionalVal: "-",
                default: "false",
            },
            {
                param: "sortChange",
                desc: `排序改变事件。事件接收 1 个参数对象，列的排序规则`,
                type: "<code>Function({row})</code>",
                optionalVal: "-",
                default: "-",
            },
        ],
        columns: columnsType1,
    },

    // 单元格合并配置
    cellSpanOption: {
        data: [
            {
                param: "bodyCellSpan",
                desc: `1、body单元格合并函数<br>2、参数信息。<code>row</code>:当前行数据、<code>column</code>:当前列配置、<code>rowIndex</code>:行索引`,
                type: `<code>Function({row,column,rowIndex})</code>`,
                optionalVal: "-",
                default: "-",
            },
            {
                param: "footerCellSpan",
                desc: `1、footer单元格合并函数<br>2、参数信息。<code>row</code>:当前行数据、<code>column</code>:当前列配置、<code>rowIndex</code>:行索引`,
                type: `<code>Function({row,column,rowIndex})</code>`,
                optionalVal: "-",
                default: "-",
            },
        ],
        columns: columnsType1,
    },

    // 事件自定义配置
    eventCustomOption: {
        data: [
            {
                param: "bodyRowEvents",
                desc: `1、body 行自定义事件，返回需要自定义的事件。<br>2、接收2个参数。<code>row</code>当前行数据、<code>rowIndex</code>:行索引<br>3、支持自定义事件有 click、dblclick、contextmenu、mouseenter、mouseleave`,
                type: "<code>Function({row,rowIndx})</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "bodyCellEvents",
                desc: `1、body 列自定义事件，返回需要自定义的事件。<br>2、接收3个参数。<code>row</code>当前行数据、<code>column</code>:当前列配置、<code>rowIndex</code>:行索引<br>3、支持自定义事件有 click、dblclick、contextmenu、mouseenter、mouseleave`,
                type: "<code>Function({row,column,rowIndx})</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "headerRowEvents",
                desc: `1、header 行自定义事件，返回需要自定义的事件。<br>2、接收1个参数。<code>rowIndex</code>：表头行索引<br>3、支持自定义事件有 click、dblclick、contextmenu、mouseenter、mouseleave<br>`,
                type: "<code>Function({rowIndex})</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "headerCellEvents",
                desc: `1、header 列自定义事件，返回需要自定义的事件。<br>2、接收2个参数。<code>column</code>:当前列配置、<code>rowIndex</code>:行索引<br>3、支持自定义事件有 click、dblclick、contextmenu、mouseenter、mouseleave`,
                type: "<code>Function({column,rowIndx})</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "footerRowEvents",
                desc: `1、footer 行自定义事件，返回需要自定义的事件。<br>2、接收2个参数。<code>row</code>当前行数据、<code>rowIndex</code>:行索引<br>3、支持自定义事件有 click、dblclick、contextmenu、mouseenter、mouseleave`,
                type: "<code>Function({row,rowIndx})</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "footerCellEvents",
                desc: `1、footer 列自定义事件，返回需要自定义的事件。<br>2、接收3个参数。<code>row</code>当前行数据、<code>column</code>:当前列配置、<code>rowIndex</code>:行索引<br>3、支持自定义事件有 click、dblclick、contextmenu、mouseenter、mouseleave`,
                type: "<code>Function({row,column,rowIndx})</code>",
                optionalVal: "-",
                default: "-",
            },
        ],
        columns: columnsType1,
    },

    // 单元格样式配置
    cellStyleOption: {
        data: [
            {
                param: "bodyCellClass",
                desc: `1、表体单元格样式<br>
                2、接收3个参数，<code>row</code>:当前行数据、<code>column</code>:当前列配置、<code>rowIndex</code>:行索引`,
                type: `<code>Function({row,column,rowIndex})</code>`,
                optionalVal: "-",
                default: "-",
            },
            {
                param: "headerCellClass",
                desc: `1、表头单元格样式<br>
                2、接收2个参数，<code>column</code>:当前列配置、<code>rowIndex</code>:行索引`,
                type: `<code>Function({column,rowIndex})</code>`,
                optionalVal: "-",
                default: "-",
            },
            {
                param: "footerCellClass",
                desc: `1、footer汇总 单元格样式<br>
                2、接收3个参数，<code>row</code>:当前行数据、<code>column</code>:当前列配置、<code>rowIndex</code>:行索引`,
                type: `<code>Function({row,column,rowIndex})</code>`,
                optionalVal: "-",
                default: "-",
            },
        ],
        columns: columnsType1,
    },

    // 行样式配置
    rowStyleOption: {
        data: [
            {
                param: "hoverHighlight",
                desc: `是否开启行hover 背景高亮`,
                type: `<code>Boolean</code>`,
                optionalVal: "-",
                default: "true",
            },
            {
                param: "clickHighlight",
                desc: `是否开启行click 背景高亮`,
                type: `<code>Boolean</code>`,
                optionalVal: "-",
                default: "true",
            },
            {
                param: "stripe",
                desc: `是否开启斑马纹`,
                type: `<code>Boolean</code>`,
                optionalVal: "-",
                default: "false",
            },
        ],
        columns: columnsType1,
    },

    // 单元格编辑配置
    editOption: {
        data: [
            {
                param: "doubleClickEdit",
                desc: `是否开启双击单元格编辑`,
                type: `<code>Boolean</code>`,
                optionalVal: "-",
                default: "true",
            },
            {
                param: "fullRowEdit",
                desc: `是否开启行整行编辑`,
                type: `<code>Boolean</code>`,
                optionalVal: "-",
                default: "false",
            },
            {
                param: "textSelectedWhenCellFocus",
                desc: `是否开启单元格编辑状态文本选中`,
                type: `<code>Boolean</code>`,
                optionalVal: "-",
                default: "true",
            },
            {
                param: "stopEditingWhenCellLoseFocus",
                desc: `是否开启单元格失去焦点自动停止编辑`,
                type: `<code>Boolean</code>`,
                optionalVal: "-",
                default: "true",
            },
            {
                param: "cellValueChange",
                desc: `单元格停止编辑回调方法。<code>row</code>当前行数据，<code>column</code>当前列信息`,
                type: `<code>Function({ row, column })</code>`,
                optionalVal: "-",
                default: "-",
            },
            {
                param: "rowValueChange",
                desc: `行停止编辑回调方法。<code>row</code>当前行数据`,
                type: `<code>Function({ row })</code>`,
                optionalVal: "-",
                default: "-",
            },
        ],
        columns: columnsType1,
    },

    // 单元格选择配置
    cellSelectionOption: {
        data: [
            {
                param: "enable",
                desc: `是否开启单元格选择`,
                type: `<code>Boolean</code>`,
                optionalVal: "-",
                default: "true",
            },
        ],
        columns: columnsType1,
    },
};
