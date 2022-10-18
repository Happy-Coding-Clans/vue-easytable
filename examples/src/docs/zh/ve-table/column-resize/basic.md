:::anchor 列宽拖动

你可以将鼠标悬浮在两列之间，然后拖动即可。如果列宽度不设置，默认是 50px

:::demo 1、通过 `minWidth`设置列拖动的最小宽度<br>2、通过`sizeChange({ column, differWidth, columnWidth })`列拖动变化的回调信息

```html
<template>
    <div>
        <div v-show="columnResizeInfo.column" style="margin:10px 0;line-height:2">
            <div>column:{{columnResizeInfo.column}}</div>
            <div>differWidth:{{columnResizeInfo.differWidth}}</div>
            <div>columnWidth:{{columnResizeInfo.columnWidth}}</div>
        </div>
        <ve-table
            style="width:100%"
            :scroll-width="0"
            :columns="columns"
            :table-data="tableData"
            :border-around="true"
            :border-x="true"
            :border-y="true"
            :column-width-resize-option="columnWidthResizeOption"
        />
    </div>
</template>

<script>
    import Mock from "mockjs";
    export default {
        data() {
            return {
                columnWidthResizeOption: {
                    // default false
                    enable: true,
                    // column resize min width
                    minWidth: 30,
                    // column size change
                    sizeChange: ({ column, differWidth, columnWidth }) => {
                        this.columnResizeInfo.column = column;
                        this.columnResizeInfo.differWidth = differWidth;
                        this.columnResizeInfo.columnWidth = columnWidth;
                    },
                },
                columns: [
                    {
                        field: "index",
                        key: "index",
                        title: "#",
                        width: 50,
                        align: "center",
                        fixed: "left",
                        renderBodyCell: ({ row, column, rowIndex }, h) => {
                            return ++rowIndex;
                        },
                    },
                    { field: "col1", key: "col1", title: "Col1", width: 220 },
                    { field: "col2", key: "col2", title: "Col2", width: 220 },
                    { field: "col3", key: "col3", title: "Col3", width: 220 },
                    { field: "col4", key: "col4", title: "Col4", width: 220 },
                    { field: "col5", key: "col5", title: "Col5", width: 220 },
                    { field: "col6", key: "col6", title: "Col6", width: 220 },
                    { field: "col7", key: "col7", title: "Col7" },
                    { field: "col8", key: "col8", title: "Col8" },
                ],
                columnResizeInfo: {
                    column: "",
                    differWidth: "",
                    columnWidth: "",
                    tableWidth: "",
                },
                tableData: [],
            };
        },
        methods: {
            initTableData() {
                let data = [];
                for (let i = 0; i < 5; i++) {
                    data.push({
                        rowKey: i,
                        col1: `A${i + 1}`,
                        col2: Mock.Random.sentence(3, 12),
                        col3: `C${i + 1}`,
                        col4: `D${i + 1}`,
                        col5: `E${i + 1}`,
                        col6: `F${i + 1}`,
                        col7: `G${i + 1}`,
                        col8: `H${i + 1}`,
                    });
                }
                this.tableData = data;
            },
        },
        created() {
            this.initTableData();
        },
    };
</script>
```

:::
