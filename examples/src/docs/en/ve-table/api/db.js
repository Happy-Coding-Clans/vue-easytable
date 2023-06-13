// 列配置类型1
const columnsType1 = [
    {
        key: "a",
        field: "param",
        title: "Parameters",
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
        title: "Description",
        width: "60%",
        align: "left",
        renderBodyCell: ({ row, column, rowIndex }, h) => {
            return <span domPropsInnerHTML={row.desc}></span>;
        },
    },
    {
        key: "c",
        field: "type",
        title: "Type",
        width: "10%",
        align: "left",
        renderBodyCell: ({ row, column, rowIndex }, h) => {
            return <span domPropsInnerHTML={row.type}></span>;
        },
    },
    {
        key: "d",
        field: "optionalVal",
        title: "Optional",
        width: "10%",
        align: "left",
        renderBodyCell: ({ row, column, rowIndex }, h) => {
            return <span domPropsInnerHTML={row.optionalVal}></span>;
        },
    },
    {
        key: "e",
        field: "default",
        title: "Default",
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
        title: "Methods Name",
        width: "15%",
        align: "left",
        renderBodyCell: ({ row, column, rowIndex }, h) => {
            return <span domPropsInnerHTML={row.name}></span>;
        },
    },
    {
        key: "c",
        field: "desc",
        title: "Description",
        width: "65%",
        align: "left",
        renderBodyCell: ({ row, column, rowIndex }, h) => {
            return <span domPropsInnerHTML={row.desc}></span>;
        },
    },
    {
        key: "d",
        field: "param",
        title: "Parameters",
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
                desc: "Table data",
                type: "<code>Array</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "footerData",
                desc: "Table footer summary data，The data structure is consistent with <code>tableData</code>",
                type: "<code>Array</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "columns",
                desc: `Column option. See the following table columns option for specific items`,
                type: `<code>Array</code>`,
                optionalVal: "-",
                default: "-",
            },
            {
                param: "showHeader",
                desc: `Show header`,
                type: `<code>Boolean</code>`,
                optionalVal: "-",
                default: "true",
            },
            {
                param: "fixedHeader",
                desc: "Is the header fixed,Enabled by default.It needs to be used in combination with `maxHeight`",
                type: "<code>Boolean</code>",
                optionalVal: "-",
                default: "true",
            },
            {
                param: "fixedFooter",
                desc: "Is the fotter fixed,Enabled by default.It needs to be used in combination with `maxHeight`",
                type: "<code>Boolean</code>",
                optionalVal: "-",
                default: "true",
            },
            {
                param: "scrollWidth",
                desc: "The width of the table's scroll area (the width of the start scroll bar).<code>Number</code>Specify pixels;<code>String</code>Specified percentage",
                type: "<code>Number</code>、<code>String</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "maxHeight",
                desc: "The maximum height of the table.<code>Number</code>Specify pixels;<code>String</code>Specified percentage.",
                type: "<code>Number</code>、<code>String</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "rowKeyFieldName",
                desc: "Specifies the field name of the row key.Used for row expand、row radio、row checkbox、row highlight、virtual scrolling",
                type: "<code>String</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "borderAround",
                desc: "Show table outer border",
                type: "<code>Boolean</code>",
                optionalVal: "-",
                default: "true",
            },
            {
                param: "borderX",
                desc: "Show column horizontal border",
                type: "<code>Boolean</code>",
                optionalVal: "-",
                default: "true",
            },
            {
                param: "borderY",
                desc: "Show column vertical border",
                type: "<code>Boolean</code>",
                optionalVal: "-",
                default: "false",
            },

            {
                param: "cellSpanOption",
                desc: "Cell merge option,Refer to cellSpanOption option for details",
                type: "<code>Object</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "cellStyleOption",
                desc: "Cell style option,Refer to cellStyleOption option for details",
                type: "<code>Object</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "rowStyleOption",
                desc: "For row style option,Refer to rowStyleOption option for details",
                type: "<code>Object</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "expandOption",
                desc: "Row expand option,Refer to expandOption option for details",
                type: "<code>Object</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "checkboxOption",
                desc: "Row multiple selection option,Refer to checkboxOption option for details",
                type: "<code>Object</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "radioOption",
                desc: "Row radio option,Refer to radioOption option for details",
                type: "<code>Object</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "virtualScrollOption",
                desc: "Virtual scroll option, it is recommended to display more than 1000 rows at a time.Refer to virtualScrollOption option for details",
                type: "<code>Object</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "sortOption",
                desc: "Sort option,Refer to sortOption option for details",
                type: "<code>Object</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "cellSelectionOption",
                desc: "Cell selection option,Refer to cellSelectionOption option for details",
                type: "<code>Object</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "editOption",
                desc: "Cell edit option,Refer to editOption for details",
                type: "<code>Object</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "contextmenuHeaderOption",
                desc: "table header contextmenu option,Refer to contextmenuHeaderOption",
                type: "<code>Object</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "contextmenuBodyOption",
                desc: "table body contextmenu option,Refer to contextmenuBodyOption",
                type: "<code>Object</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "eventCustomOption",
                desc: `Custom event option,Refer to eventCustomOption option for details`,
                type: "<code>Object</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "cellAutofillOption",
                desc: `Cell autofill option,Refer to cellAutofillOption option for details`,
                type: "<code>Object</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "clipboardOption",
                desc: `Clipboard Option,Refer to clipboardOption option for details`,
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
                desc: "The field of the column",
                type: "<code>String</code>",
                optionalVal: "-",
                default: "-",
                rowKey: 0,
            },
            {
                param: "key",
                desc: "Unique key value for each column",
                type: "<code>String</code>",
                optionalVal: "-",
                default: "-",
                rowKey: 5,
            },
            {
                param: "type",
                desc: `Column type. "expand"：row expand；"checkbox"：row checkbox；"radio"：row radio`,
                type: "<code>String</code>",
                optionalVal: `"expand"、"checkbox"、"radio"`,
                default: "-",
                rowKey: 15,
            },
            {
                param: "title",
                desc: "Column header text",
                type: "<code>String</code>",
                optionalVal: "-",
                default: "-",
                rowKey: 20,
            },
            {
                param: "width",
                desc: "<code>Number</code>width pixel value；<code>String</code>width percentage(<a href='#/en/doc/table/column-width?anchor=chang-wen-ben-po-pi-bu-ju'>width not working?</a>)",
                type: `<code>String</code>、<code>Number</code>`,
                optionalVal: "-",
                default: "-",
                rowKey: 25,
            },
            {
                param: "align",
                desc: "Cell alignment",
                type: "<code>String</code>",
                optionalVal: `"left"、"center"、"right"`,
                default: `"center"`,
                rowKey: 30,
            },
            {
                param: "operationColumn",
                desc: "is operation column",
                type: "<code>Boolean</code>",
                optionalVal: `-`,
                default: `false`,
                rowKey: 31,
            },
            {
                param: "edit",
                desc: "Enable cell edit",
                type: "<code>Boolean</code>",
                optionalVal: `-`,
                default: `false`,
                rowKey: 32,
            },
            {
                param: "sortBy",
                desc: `Sort rules.<br>1、<code>sortBy=""</code>：Sorting allowed without collation；<br>2、<code>sortBy="asc"</code>：Default current column ascending；<br>3、<code>sortBy="desc"</code>：Default current column descending；`,
                type: "<code>String</code>",
                optionalVal: `""、"desc"、"asc"`,
                default: `""`,
                rowKey: 33,
            },
            {
                param: "renderBodyCell",
                desc: `1、Custom cell rendering function in the table body. jsx ,Writing is close to template syntax\r2、Parameter information.<code>row</code>:Current row data、<code>column</code>:Current column option、<code>rowIndex</code>:Row index、<code>h</code>：createElement<br>3、For more JSX knowledge, please refer to<a href="https://vuejs.org/v2/guide/render-function.html#JSX"> Vue.js Official doc</a>`,
                type: `<code>Function({row,column,rowIndex},h):VNode</code>`,
                optionalVal: "-",
                default: "-",
                rowKey: 35,
            },
            {
                param: "renderHeaderCell",
                desc: `1、Header custom cell rendering function.The usage is the same as<code>renderBodyCell</code>。\r2、Parameter information.<code>column</code>:Current column option、<code>h</code>：createElement`,
                type: "<code>Function({ column },h):VNode</code>",
                optionalVal: "-",
                default: "-",
                rowKey: 40,
            },
            {
                param: "renderFooterCell",
                desc: `1、footer custom cell rendering function.\r2、Parameter information.<code>row</code>:Current row data、<code>column</code>:Current column option、<code>rowIndex</code>:Row index、<code>h</code>：createElement<br>`,
                type: `<code>Function({row,column,rowIndex},h):VNode</code>`,
                optionalVal: "-",
                default: "-",
                rowKey: 45,
            },
            {
                param: "disableResizing",
                desc: `Disable resizing for this column. Only effective if <code>columnWidthResizeOption</code> is enabled`,
                type: `<code>Boolean</code>`,
                optionalVal: "-",
                default: "false",
                rowKey: 46,
            },
            {
                param: "<span class='expand'>ellipsis</span>",
                desc: `Cell ellipsis option`,
                type: "<code>Object</code>",
                optionalVal: "-",
                default: "-",
                expandId: 49,
            },
            {
                param: "<span class='expand'>filter</span>",
                desc: `Filter option.`,
                type: "<code>Object</code>",
                optionalVal: "-",
                default: "-",
                expandId: 50,
            },
            {
                param: "<span class='expand'>filterCustom</span>",
                desc: `Filter custom option.`,
                type: "<code>Object</code>",
                optionalVal: "-",
                default: "-",
                expandId: 55,
            },
        ],
        columns: columnsType1,
        //column filter props
        filterProps: {
            data: [
                {
                    param: "filterList",
                    desc: `1、filter conditions<br>2、It contains three attributes: label、 value and selected. like:<code>[{ value: 0, label: "1900-05-20", selected: false }]</code>`,
                    type: "<code>Array</code>",
                    optionalVal: "-",
                    default: "-",
                },
                {
                    param: "isMultiple",
                    desc: `Enable multiple selection of filter items`,
                    type: "<code>Boolean</code>",
                    optionalVal: "-",
                    default: "false",
                },
                {
                    param: "filterConfirm",
                    desc: `1、Filter confirm function。<br>2、Receive 1 parameter，<code>filterList</code>：filter conditions`,
                    type: "<code>Function({filterList})</code>",
                    optionalVal: "-",
                    default: "-",
                },
                {
                    param: "filterReset",
                    desc: `1、Filter reset function<br>2、Receive 1 parameter，<code>filterList</code>：filter conditions`,
                    type: "<code>Function({filterList})</code>",
                    optionalVal: "-",
                    default: "-",
                },
                {
                    param: "filterIcon",
                    desc: `1、filter custom icon rendering function.<br>2、parameter information。h：createElement`,
                    type: "<code>Function(h):VNode</code>",
                    optionalVal: "-",
                    default: "-",
                },
                {
                    param: "maxHeight",
                    desc: `1、The maximum height of the filter box. Height without operation button`,
                    type: "<code>Number</code>",
                    optionalVal: "-",
                    default: "1000",
                },
                {
                    param: "beforeVisibleChange({nextVisible})",
                    desc: `The filter panel show or hides previous callback methods. If<code>false</code>is returned, show or hide is Intercept`,
                    type: "<code>Function</code>",
                    optionalVal: "-",
                    default: "-",
                },
            ],
            columns: columnsType1,
        },
        //column filter custom props
        filterCustomProps: {
            data: [
                {
                    param: "render",
                    desc: `1、Render function<br>2、Parameters received by render functions,showFn:show filter box function、closeFn:close filter box function、<code>h</code>：createElement`,
                    type: "<code>Function({showFn,closeFn},h):VNode</code>",
                    optionalVal: "-",
                    default: "-",
                },
                {
                    param: "filterIcon",
                    desc: `1、filter custom icon rendering function.<br>2、parameter information.h：createElement`,
                    type: "<code>Function(h):VNode</code>",
                    optionalVal: "-",
                    default: "-",
                },
                {
                    param: "beforeVisibleChange({nextVisible})",
                    desc: `The filter panel show or hides previous callback methods. If<code>false</code>is returned, show or hide is Intercept`,
                    type: "<code>Function</code>",
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
                    desc: `How many lines start to omit`,
                    type: "<code>Number</code>",
                    optionalVal: "-",
                    default: "1",
                },
                {
                    param: "showTitle",
                    desc: `Is the mouse hovering to display the title`,
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
                desc: `Scrolls the table to the specified position  <a href='#/en/doc/table/instance-methods?anchor=scrollto'>Refer To Demo</a>`,
                param: "Refer to <a href='https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollTo'> MDN scrollTo</a>",
            },
            {
                name: "scrollToRowKey",
                desc: `Scroll the table to the column position <a href='#/en/doc/table/instance-methods?anchor=scrolltocolkey-column-scroll-method'>Refer To Demo</a>`,
                param: "{rowKey}",
            },
            {
                name: "scrollToRowKey",
                desc: `Scroll the table to the location of the row key <a href='#/en/doc/table/instance-methods?anchor=scrolltorowkey'>Refer To Demo</a>`,
                param: "{rowKey}",
            },
            {
                name: "setHighlightRow",
                desc: `Set highlight row <a href='#/en/doc/table/row-style?anchor=row-click-highlight'>Refer To Demo</a>`,
                param: "{rowKey}",
            },
            {
                name: "startEditingCell",
                desc: `Start cell editing  <a href='#/en/doc/table/cell-edit?anchor=ke-kong-bian-ji'>Refer To Demo</a>`,
                param: "{rowKey,colKey,defaultValue}",
            },
            {
                name: "stopEditingCell",
                desc: `Stop cell editing`,
                param: "-",
            },
            {
                name: "hideColumnsByKeys",
                desc: `Hide columns  <a href='#/en/doc/table/column-hidden?anchor=instance-methods'>Refer To Demo</a>`,
                param: "keys",
            },
            {
                name: "showColumnsByKeys",
                desc: `Show columns  <a href='#/en/doc/table/column-hidden?anchor=instance-methods'>Refer To Demo</a>`,
                param: "keys",
            },
            {
                name: "setCellSelection",
                desc: `Set single cell selection  <a href='#/en/doc/table/cell-selection?anchor=single-cell-selection-instance-method'>Refer To Demo</a>`,
                param: "{ rowKey, colKey }",
            },
            {
                name: "setAllCellSelection",
                desc: `Set all cell selection  <a href='#/en/doc/table/cell-selection?anchor=range-cell-selection-instance-method'>Refer To Demo</a>`,
                param: "-",
            },
            {
                name: "setRangeCellSelection",
                desc: `Set range cell selection  <a href='#/en/doc/table/cell-selection?anchor=range-cell-selection-instance-method'>Refer To Demo</a>`,
                param: "{ startRowKey,startColKey,endRowKey,endColKey,isScrollToStartCell }",
            },
            {
                name: "getRangeCellSelection",
                desc: `Get the information of the range selection. Returns the indexes and key information of the selected region`,
                param: "{selectionRangeKeys,selectionRangeIndexes}",
            },
        ],
        columns: columnsType2,
    },

    // 可展开配置
    expandOption: {
        data: [
            {
                param: "expandable",
                desc: `	1、Whether the row rendering function is allowed to expand. Returns a Boolean value\r2、Receive 3 parameter,<code>row</code>:Current row data、<code>column</code>:Column option、<code>rowIndex</code>:rowIndex`,
                type: "<code>Function({row,column,rowIndex})</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "render",
                desc: `1、Render functions\r2、The parameters received by the render function. row:Current row data、column:Column option、rowIndex:rowIndex、<code>h</code>：createElement`,
                type: "<code>Function({row,column,rowIndex},h):VNode</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "defaultExpandAllRows",
                desc: `is expand all row`,
                type: "<code>Boolean</code>",
                optionalVal: "-",
                default: "false",
            },
            {
                param: "defaultExpandedRowKeys",
                desc: `The default expanded row key. When parameter<code>defaultExpandAllRows</code> and parameter <code>defaultExpandedRowKeys</code> exist at the same time,priority of use<code>defaultExpandAllRows</code>`,
                type: "<code>String[]</code>、<code>Number[]</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "expandedRowKeys",
                desc: `Controllable attributes of expand row, After setting the property, <code>defaultExpandAllRows</code> and <code>defaultExpandedRowKeys</code> will be invalid.refer to examples for details`,
                type: "<code>String[]</code>、<code>Number[]</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "beforeExpandRowChange",
                desc: `1、Expand functions before switching,If false is returned, execution is interrupted.\r2、Receive 3 parameter,<code>beforeExpandedRowKeys</code>:All expanded keys before the change,<code>row</code>:The current row data,<code>rowIndex</code>row index`,
                type: "<code>Function({beforeExpandedRowKeys,row,rowIndex})</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "afterExpandRowChange",
                desc: `1、Expand the function after switching.\r2、Receive 3 parameter,<code>afterExpandedRowKeys</code>:All expanded keys after change,<code>row</code>:Current row data,<code>rowIndex</code>row index`,
                type: "<code>Function({afterExpandedRowKeys,row,rowIndex})</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "trigger",
                desc: `Expand the row event trigger type.
                <code>icon</code>：expand by click the icon;<code>cell</code>：expand by click cell;<code>row</code>:expand by click row`,
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
                desc: `Is selected all by default`,
                type: "<code>Boolean</code>",
                optionalVal: "-",
                default: "false",
            },
            {
                param: "defaultSelectedRowKeys",
                desc: `Default selected row keys`,
                type: "<code>String[]</code>、<code>Number[]</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "disableSelectedRowKeys",
                desc: `Disable selected row keys`,
                type: "<code>String[]</code>、<code>Number[]</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "selectedRowKeys",
                desc: `The controllable properties. After setting the property,  <code>defaultSelectedAllRows</code> and <code>defaultSelectedRowKeys</code> will be invalid. Refer to example`,
                type: "<code>String[]</code>、<code>Number[]</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "selectedRowChange",
                desc: `Change event for the selected row. Receive 3 parameter,row:Current row data,<code>isSelected</code>Whether the current row is selected,<code>selectedRowKeys</code>All selected rowKey information`,
                type: "<code>Function({row, isSelected, selectedRowKeys})</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "selectedAllChange",
                desc: `Select all change events. The event receives 2 parameters,<code>isSelected</code> Select all or not.<code>selectedRowKeys</code>All selected rowKey information`,
                type: `<code>Function({isSelected, selectedRowKeys})</code>`,
                optionalVal: "-",
                default: "-",
            },
            {
                param: "hideSelectAll",
                desc: `Is hide select all button`,
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
                desc: `Default selected row key`,
                type: "<code>String</code>、<code>Number</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "disableSelectedRowKeys",
                desc: `Disable selected row keys`,
                type: "<code>String[]</code>、<code>Number[]</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "selectedRowKey",
                desc: `The controllable properties of the selected row, After setting the property, <code>defaultSelectedRowKey</code> will be invalid. Refer to example`,
                type: "<code>String</code>、<code>Number</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "selectedRowChange",
                desc: `Change event for the selected row. Method receives 1 parameter, row:Current row data`,
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
                desc: `Enable virtual scrolling`,
                type: "<code>Boolean</code>",
                optionalVal: "-",
                default: "false",
            },
            {
                param: "minRowHeight",
                desc: `The min row height (PX). The smaller the value is, the more row is rendered in the table visualization range. It can be set according to the actual minimum height`,
                type: "<code>Number</code>",
                optionalVal: "-",
                default: "40",
            },
            {
                param: "scrolling",
                desc: `Scrolling callback events.<br><code>startRowIndex</code> is the line number currently starting rendering,<code>visibleStartIndex</code> is the starting line number of the currently visible area,<code>visibleEndIndex</code> is the end line number of the currently visible area,<code>visibleAboveCount</code> is the number of renderings above the currently visible area,<code>visibleBelowCount</code> is the number of renderings below the currently visible area`,
                type: "Function({startRowIndex,visibleStartIndex,visibleEndIndex,visibleAboveCount,visibleBelowCount})",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "bufferScale",
                desc: `Buffer scale. 1 buffer scale is the number of rows within the current table height`,
                type: "<code>Number</code>",
                optionalVal: "-",
                default: "1",
            },
        ],
        columns: columnsType1,
    },

    // 排序设置
    sortOption: {
        data: [
            {
                param: "multipleSort",
                desc: `Enable multi field sorting`,
                type: "<code>Boolean</code>",
                optionalVal: "-",
                default: "false",
            },
            {
                param: "sortAlways",
                desc: `Whether to turn on sorting is only switched between ascending and descending`,
                type: "<code>Boolean</code>",
                optionalVal: "-",
                default: "false",
            },
            {
                param: "sortChange",
                desc: `Sort change events. Event receives 1 Parameter object:Sort rules for columns`,
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
                desc: `1、Body cell merge function<br>2、Parameter information. <code>row</code>:Current row data、<code>column</code>:Current column option、<code>rowIndex</code>:Row index`,
                type: `<code>Function({row,column,rowIndex})</code>`,
                optionalVal: "-",
                default: "-",
            },
            {
                param: "footerCellSpan",
                desc: `1、footer ell merge function<br>2、Parameter information. <code>row</code>:Current row data、<code>column</code>:Current column option、<code>rowIndex</code>:Row index`,
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
                desc: `1、body row custom events,Returns the event that needs to be customized.<br>2、Receive 2 parameters.<code>row</code>Current row data、<code>rowIndex</code>:Row index<br>3、Support for custom events: click、dblclick、contextmenu、mouseenter、mouseleave`,
                type: "<code>Function({row,rowIndx})</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "bodyCellEvents",
                desc: `1、body column custom events,Returns the event that needs to be customized.<br>2、Receive 3 parameters.<code>row</code>Current row data、<code>column</code>:Current column option、<code>rowIndex</code>:Row index<br>3、Support for custom events: click、dblclick、contextmenu、mouseenter、mouseleave`,
                type: "<code>Function({row,column,rowIndx})</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "headerRowEvents",
                desc: `1、header row custom events,Returns the event that needs to be customized.<br>2、Receive 1 parameters.<code>rowIndex</code>：header row index<br>3、Support for custom events: click、dblclick、contextmenu、mouseenter、mouseleave<br>`,
                type: "<code>Function({rowIndex})</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "headerCellEvents",
                desc: `1、header column custom events,Returns the event that needs to be customized.<br>2、Receive 2 parameters.<code>column</code>:Current column option、<code>rowIndex</code>:Row index<br>3、Support for custom events: click、dblclick、contextmenu、mouseenter、mouseleave`,
                type: "<code>Function({column,rowIndx})</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "footerRowEvents",
                desc: `1、footer row custom events, Returns the event that needs to be customized.<br>2、Receive 2 parameters.<code>row</code>Current row data、<code>rowIndex</code>:Row index<br>3、Support for custom events: click、dblclick、contextmenu、mouseenter、mouseleave`,
                type: "<code>Function({row,rowIndx})</code>",
                optionalVal: "-",
                default: "-",
            },
            {
                param: "footerCellEvents",
                desc: `1、footer column custom events, Returns the event that needs to be customized.<br>2、Receive 3 parameters.<code>row</code>Current row data、<code>column</code>:Current column option、<code>rowIndex</code>:Row index<br>3、Support for custom events: click、dblclick、contextmenu、mouseenter、mouseleave`,
                type: "<code>Function({row,column,rowIndx})</code>",
                optionalVal: "-",
                default: "-",
            },
        ],
        columns: columnsType1,
    },

    // 列隐藏配置
    columnHiddenOption: {
        data: [
            {
                param: "defaultHiddenColumnKeys <code>v2.11.0</code>",
                desc: `Set default hidden columns`,
                type: `<code>Array</code>`,
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
                desc: `1、Table body cell style\r2、Received 3 parameters,<code>row</code>:Current row data、<code>column</code>:Current column option、<code>rowIndex</code>:Row index`,
                type: `<code>Function({row,column,rowIndex})</code>`,
                optionalVal: "-",
                default: "-",
            },
            {
                param: "headerCellClass",
                desc: `1、Header cell style\r2、Received 2 parameters,<code>column</code>:Current column option、<code>rowIndex</code>:Row index`,
                type: `<code>Function({column,rowIndex})</code>`,
                optionalVal: "-",
                default: "-",
            },
            {
                param: "footerCellClass",
                desc: `1、Footer cell style\r2、Received 3 parameters,<code>row</code>:Current row data、<code>column</code>:Current column option、<code>rowIndex</code>:Row index`,
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
                desc: `row hover background highlight`,
                type: `<code>Boolean</code>`,
                optionalVal: "-",
                default: "true",
            },
            {
                param: "clickHighlight",
                desc: `row click background highlight`,
                type: `<code>Boolean</code>`,
                optionalVal: "-",
                default: "true",
            },
            {
                param: "stripe",
                desc: `row stripe`,
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
                param: "beforeStartCellEditing",
                desc: `before start editing cell callback method.<code>row</code>Current row data,<code>column</code>Current column,<code>cellValue</code>Current cell value.If false is returned,Will prevent the cell from starting the editing state`,
                type: `<code>Function({ row, column,cellValue })</code>`,
                optionalVal: "-",
                default: "-",
            },
            {
                param: "beforeCellValueChange",
                desc: `before cell value change callback method. <code>row</code>Current row data,<code>column</code>Current column,<code>changeValue</code>change value. If false is returned, cell editing will be blocked, the cell will back to the state before editing`,
                type: `<code>Function({ row, column,changeValue  })</code>`,
                optionalVal: "-",
                default: "-",
            },
            {
                param: "afterCellValueChange",
                desc: `after cell value change callback method. <code>row</code>Current row data,<code>column</code>Current column,<code>changeValue</code>change value `,
                type: `<code>Function({ row, column,changeValue  })</code>`,
                optionalVal: "-",
                default: "-",
            },
            {
                param: "cellValueChange",
                desc: `Will be removed`,
                type: `<code>Function({ row, column })</code>`,
                optionalVal: "-",
                default: "-",
            },
        ],
        columns: columnsType1,
    },

    // table header contextmenu
    contextmenuHeaderOption: {
        data: [
            {
                param: "beforeShow",
                desc: `For the callback event before the menu is displayed, you can change the menu item information at this stage.<br/><code>isWholeColSelection</code>It's whole column selection,<br/><code>selectionRangeKeys </code>The currently cellSelection key information,<br/><code>selectionRangeIndexes </code>The currently cellSelection index information`,
                type: `<code>Function({ isWholeColSelection, selectionRangeKeys, selectionRangeIndexes })</code>`,
                optionalVal: "-",
                default: "-",
            },
            {
                param: "afterMenuClick",
                desc: `Callback when a menu item is clicked, returning false will prevent the current right-click operation.<br/><code>type</code>menu item,<br/><code>selectionRangeKeys </code>The currently cellSelection key information,<br/><code>selectionRangeIndexes </code>The currently cellSelection index information`,
                type: `<code>Function({ type, selectionRangeKeys, selectionRangeIndexes  })</code>`,
                optionalVal: "-",
                default: "-",
            },
            {
                param: "contextmenus",
                desc: `contextmenu option. <a href='#/en/doc/base/contextmenu'>contextmenu component</a>`,
                type: `<code>Array</code>`,
                optionalVal: "-",
                default: "-",
            },
        ],
        columns: columnsType1,
    },

    // table body contextmenu
    contextmenuBodyOption: {
        data: [
            {
                param: "beforeShow",
                desc: `For the callback event before the menu is displayed, you can change the menu item information at this stage.<br/><code>isWholeRowSelection</code>It's whole row selection,<br/><code>selectionRangeKeys </code>The currently cellSelection key information,<br/><code>selectionRangeIndexes </code>The currently cellSelection index information`,
                type: `<code>Function({ isWholeRowSelection, selectionRangeKeys, selectionRangeIndexes })</code>`,
                optionalVal: "-",
                default: "-",
            },
            {
                param: "afterMenuClick",
                desc: `Callback when a menu item is clicked, returning false will prevent the current right-click operation.<br/><code>type</code>menu item,<br/><code>selectionRangeKeys </code>The currently cellSelection key information,<br/><code>selectionRangeIndexes </code>The currently cellSelection index information`,
                type: `<code>Function({ type, selectionRangeKeys, selectionRangeIndexes  })</code>`,
                optionalVal: "-",
                default: "-",
            },
            {
                param: "contextmenus",
                desc: `contextmenu option. <a href='#/en/doc/base/contextmenu'>contextmenu component</a>`,
                type: `<code>Array</code>`,
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
                desc: `enable cell selection`,
                type: `<code>Boolean</code>`,
                optionalVal: "-",
                default: "true",
            },
        ],
        columns: columnsType1,
    },

    // 单元格自动填充配置
    cellAutofillOption: {
        data: [
            {
                param: "directionX",
                desc: `enable horizontal autofill`,
                type: `<code>Boolean</code>`,
                optionalVal: "-",
                default: "true",
            },
            {
                param: "directionY",
                desc: `enable vertical autofill`,
                type: `<code>Boolean</code>`,
                optionalVal: "-",
                default: "true",
            },
            {
                param: "beforeAutofill",
                desc: `The callback method before cell autofilling. If false is returned, the autofilling will be cancelled.Parameter Description:\r1、<code>direction</code>autofill direction\r2、<code>sourceSelectionRangeIndexes</code>Autofilling the row and column indexes of the source\r3、<code>targetSelectionRangeIndexes</code>Autofilling the row and column indexes of the target\r4、<code>sourceSelectionData</code>autofilling source data,Excess will be removed automatically\r5、<code>targetSelectionData</code>autofilling target data`,
                type: `<code>Function({
                        direction,
                        sourceSelectionRangeIndexes,
                        targetSelectionRangeIndexes,
                        sourceSelectionData,
                        targetSelectionData,
})</code>`,
                optionalVal: "-",
                default: "-",
            },
            {
                param: "afterAutofill",
                desc: `The callback method after cell autofilling.Parameter Description:\r1、<code>direction</code>autofill direction\r2、<code>sourceSelectionRangeIndexes</code>Autofilling the row and column indexes of the source\r3、<code>targetSelectionRangeIndexes</code>Autofilling the row and column indexes of the target\r4、<code>sourceSelectionData</code>autofilling source data,Excess will be removed automatically\r5、<code>targetSelectionData</code>autofilling target data`,
                type: `<code>Function({
                        direction,
                        sourceSelectionRangeIndexes,
                        targetSelectionRangeIndexes,
                        sourceSelectionData,
                        targetSelectionData,
})</code>`,
                optionalVal: "-",
                default: "-",
            },
        ],
        columns: columnsType1,
    },

    // 剪贴板配置
    clipboardOption: {
        data: [
            {
                param: "copy",
                desc: `enable cell copy`,
                type: `<code>Boolean</code>`,
                optionalVal: "-",
                default: "true",
            },
            {
                param: "paste",
                desc: `enable cell paste`,
                type: `<code>Boolean</code>`,
                optionalVal: "-",
                default: "true",
            },
            {
                param: "cut",
                desc: `enable cell cut`,
                type: `<code>Boolean</code>`,
                optionalVal: "-",
                default: "true",
            },
            {
                param: "delete",
                desc: `enable cell delete`,
                type: `<code>Boolean</code>`,
                optionalVal: "-",
                default: "true",
            },
            {
                param: "beforeCopy",
                desc: `The callback method before cell copy. If false is returned, the copy will be canceled. Parameter Description:\r1、<code>data</code>copy data\r2、<code>selectionRangeIndexes</code>The indexs information of copy area\r3、<code>selectionRangeKeys</code>The keys information of copy area`,
                type: `<code>Function({
                    data, selectionRangeIndexes, selectionRangeKeys
})</code>`,
                optionalVal: "-",
                default: "-",
            },
            {
                param: "afterCopy",
                desc: `The callback method after cell copy. Parameter Description:\r1、<code>data</code>copy data\r2、<code>selectionRangeIndexes</code>The indexs information of copy area\r3、<code>selectionRangeKeys</code>The keys information of copy area`,
                type: `<code>Function({
                    data, selectionRangeIndexes, selectionRangeKeys
})</code>`,
                optionalVal: "-",
                default: "-",
            },
            {
                param: "beforePaste",
                desc: `The callback method before cell paste. If false is returned, the copy will be canceled. Parameter Description:\r1、<code>data</code>paste data\r2、<code>selectionRangeIndexes</code>The indexs information of paste area\r3、<code>selectionRangeKeys</code>The keys information of copy paste`,
                type: `<code>Function({
                    data, selectionRangeIndexes, selectionRangeKeys
})</code>`,
                optionalVal: "-",
                default: "-",
            },
            {
                param: "afterPaste",
                desc: `The callback method after cell paste. Parameter Description:\r1、<code>data</code>paste data\r2、<code>selectionRangeIndexes</code>The indexs information of paste area\r3、<code>selectionRangeKeys</code>The keys information of copy paste`,
                type: `<code>Function({
                    data, selectionRangeIndexes, selectionRangeKeys
})</code>`,
                optionalVal: "-",
                default: "-",
            },
            {
                param: "beforeCut",
                desc: `The callback method before cell cut. If false is returned, the copy will be canceled. Parameter Description:\r1、<code>data</code>cut data\r2、<code>selectionRangeIndexes</code>The indexs information of cut area\r3、<code>selectionRangeKeys</code>The keys information of cut paste`,
                type: `<code>Function({
                    data, selectionRangeIndexes, selectionRangeKeys
})</code>`,
                optionalVal: "-",
                default: "-",
            },
            {
                param: "afterCut",
                desc: `The callback method after cell cut. Parameter Description:\r1、<code>data</code>cut data\r2、<code>selectionRangeIndexes</code>The indexs information of cut area\r3、<code>selectionRangeKeys</code>The keys information of cut paste`,
                type: `<code>Function({
                    data, selectionRangeIndexes, selectionRangeKeys
})</code>`,
                optionalVal: "-",
                default: "-",
            },
            {
                param: "beforeDelete",
                desc: `The callback method before cell delete. If false is returned, the copy will be canceled. Parameter Description:\r1、<code>data</code>delete data\r2、<code>selectionRangeIndexes</code>The indexs information of delete area\r3、<code>selectionRangeKeys</code>The keys information of delete paste`,
                type: `<code>Function({
                    data, selectionRangeIndexes, selectionRangeKeys
})</code>`,
                optionalVal: "-",
                default: "-",
            },
            {
                param: "afterDelete",
                desc: `The callback method after cell delete. Parameter Description:\r1、<code>data</code>delete data\r2、<code>selectionRangeIndexes</code>The indexs information of delete area\r3、<code>selectionRangeKeys</code>The keys information of delete paste`,
                type: `<code>Function({
                    data, selectionRangeIndexes, selectionRangeKeys
})</code>`,
                optionalVal: "-",
                default: "-",
            },
        ],
        columns: columnsType1,
    },
    // 列宽改变配置
    columnWidthResizeOption: {
        data: [
            {
                param: "enable",
                desc: `enable column resize`,
                type: `<code>Boolean</code>`,
                optionalVal: "-",
                default: "false",
            },
            {
                param: "minWidth",
                desc: `min width of resize column`,
                type: `<code>Number</code>`,
                optionalVal: "-",
                default: "30px",
            },
            {
                param: "sizeChange",
                desc: `The callback method after column resize. Parameter Description:\r1、<code>column</code>resize column\r2、<code>differWidth</code>Width of the difference after column resize\r3、<code>columnWidth</code>column width after column resize`,
                type: `<code>Function({
                column,
                differWidth,
                columnWidth,
})</code>`,
                optionalVal: "-",
                default: "-",
            },
        ],
        columns: columnsType1,
    },
};
