:::anchor 基础用法

右键表格区域查看效果

:::demo 你可以根据需要进行组合使用

```html
<template>
    <div>
        <ve-table
            :max-height="350"
            :scroll-width="1600"
            row-key-field-name="rowKey"
            :fixed-header="true"
            :columns="columns"
            :table-data="tableData"
            :row-style-option="rowStyleOption"
            border-y
            :virtual-scroll-option="virtualScrollOption"
            :contextmenu-body-option="contextmenuBodyOption"
            :contextmenu-header-option="contextmenuHeaderOption"
        />
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // start row index
                startRowIndex: 0,
                virtualScrollOption: {
                    // 是否开启
                    enable: true,
                    scrolling: this.scrolling,
                },
                // contextmenu header option
                contextmenuHeaderOption: {
                    /*
                    before contextmenu show.
                    In this function,You can change the `contextmenu` options
                    */
                    beforeShow: ({
                        isWholeColSelection,
                        selectionRangeKeys,
                        selectionRangeIndexes,
                    }) => {
                        console.log("---contextmenu header beforeShow--");
                        console.log("isWholeColSelection::", isWholeColSelection);
                        console.log("selectionRangeKeys::", selectionRangeKeys);
                        console.log("selectionRangeIndexes::", selectionRangeIndexes);
                    },
                    // after menu click
                    afterMenuClick: ({ type, selectionRangeKeys, selectionRangeIndexes }) => {
                        console.log("---contextmenu header afterMenuClick--");
                        console.log("type::", type);
                        console.log("selectionRangeKeys::", selectionRangeKeys);
                        console.log("selectionRangeIndexes::", selectionRangeIndexes);
                    },

                    // contextmenus
                    contextmenus: [
                        {
                            type: "CUT",
                        },
                        {
                            type: "COPY",
                        },
                        {
                            type: "SEPARATOR",
                        },
                        {
                            type: "EMPTY_COLUMN",
                        },
                        {
                            type: "SEPARATOR",
                        },
                        {
                            type: "LEFT_FIXED_COLUMN_TO",
                        },
                        {
                            type: "CANCLE_LEFT_FIXED_COLUMN_TO",
                        },
                        {
                            type: "RIGHT_FIXED_COLUMN_TO",
                        },
                        {
                            type: "CANCEL_RIGHT_FIXED_COLUMN_TO",
                        },
                    ],
                },

                // contextmenu body option
                contextmenuBodyOption: {
                    /*
                    before contextmenu show.
                    In this function,You can change the `contextmenu` options
                    */
                    beforeShow: ({
                        isWholeRowSelection,
                        selectionRangeKeys,
                        selectionRangeIndexes,
                    }) => {
                        console.log("---contextmenu body beforeShow--");
                        console.log("isWholeRowSelection::", isWholeRowSelection);
                        console.log("selectionRangeKeys::", selectionRangeKeys);
                        console.log("selectionRangeIndexes::", selectionRangeIndexes);
                    },
                    // after menu click
                    afterMenuClick: ({ type, selectionRangeKeys, selectionRangeIndexes }) => {
                        console.log("---contextmenu body afterMenuClick--");
                        console.log("type::", type);
                        console.log("selectionRangeKeys::", selectionRangeKeys);
                        console.log("selectionRangeIndexes::", selectionRangeIndexes);
                    },

                    // contextmenus
                    contextmenus: [
                        {
                            type: "CUT",
                        },
                        {
                            type: "COPY",
                        },
                        {
                            type: "SEPARATOR",
                        },
                        {
                            type: "INSERT_ROW_ABOVE",
                        },
                        {
                            type: "INSERT_ROW_BELOW",
                        },
                        {
                            type: "SEPARATOR",
                        },
                        {
                            type: "REMOVE_ROW",
                        },
                        {
                            type: "EMPTY_ROW",
                        },
                        {
                            type: "EMPTY_CELL",
                        },
                    ],
                },

                rowStyleOption: {
                    clickHighlight: false,
                    hoverHighlight: false,
                },
                columns: [
                    {
                        field: "",
                        key: "a",
                        title: "",
                        width: 15,
                        align: "center",
                        operationColumn: true,
                        renderBodyCell: ({ row, column, rowIndex }, h) => {
                            return rowIndex + this.startRowIndex + 1;
                        },
                    },
                    {
                        field: "col1",
                        key: "col1",
                        title: "col1",
                        fixed: "left",
                        width: 50,
                    },
                    {
                        field: "col2",
                        key: "col2",
                        title: "col2",
                        width: 50,
                    },
                    {
                        field: "col3",
                        key: "col3",
                        title: "col3",
                        width: 50,
                    },
                    {
                        field: "col4",
                        key: "col4",
                        title: "col4",
                        width: 50,
                    },
                    {
                        field: "col5",
                        key: "col5",
                        title: "col5",
                        width: 50,
                    },
                    {
                        title: "col6",
                        field: "col6",
                        key: "col6",
                        width: 50,
                    },
                    {
                        title: "col7",
                        field: "col7",
                        key: "col7",
                        width: 50,
                    },
                    {
                        field: "col8",
                        key: "col8",
                        title: "col8",
                        width: 50,
                    },
                ],
                // table data
                tableData: [],
            };
        },
        methods: {
            initTableData() {
                let data = [];
                for (let i = 0; i < 100; i++) {
                    data.push({
                        rowKey: i,
                        col1: `A` + i,
                        col2: `B` + i,
                        col3: `C` + i,
                        col4: `D` + i,
                        col5: `E` + i,
                        col6: `F` + i,
                        col7: `G` + i,
                        col8: `H` + i,
                    });
                }
                this.tableData = data;
            },
            // virtual scrolling
            scrolling({ startRowIndex }) {
                this.startRowIndex = startRowIndex;
            },
        },
        created() {
            this.initTableData();
        },
    };
</script>
```

:::
