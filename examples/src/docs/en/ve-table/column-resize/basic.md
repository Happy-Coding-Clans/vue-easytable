:::anchor Column Drag

You can hover the mouse between two columns and drag

:::demo 1、Set the min width of resize column through `minWidth`<br>2、Get the callback method of resize column changes through `sizeChange({ column, differWidth, columnWidth, tableWidth })`

```html
<template>
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
</template>

<script>
    export default {
        data() {
            return {
                columnWidthResizeOption: {
                    // default false
                    enable: true,
                    // column resize min width
                    minWidth: 30,
                    // column size change
                    sizeChange: ({ column, differWidth, columnWidth, tableWidth }) => {
                        console.log("----------sizeChange----------");
                        console.log("column::", column);
                        console.log("differWidth::", differWidth);
                        console.log("columnWidth::", columnWidth);
                        console.log("tableWidth::", tableWidth);
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
                    { field: "col1", key: "col1", title: "Col1" },
                    { field: "col2", key: "col2", title: "Col2" },
                    { field: "col3", key: "col3", title: "Col3" },
                    { field: "col4", key: "col4", title: "Col4" },
                    { field: "col5", key: "col5", title: "Col5" },
                    { field: "col6", key: "col6", title: "Col6" },
                ],
                tableData: [],
            };
        },
        methods: {
            initTableData() {
                let data = [];
                for (let i = 0; i < 8; i++) {
                    data.push({
                        rowKey: i,
                        col1: `A${i + 1}`,
                        col2: `B${i + 1}`,
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
