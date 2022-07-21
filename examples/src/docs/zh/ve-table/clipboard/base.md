:::anchor 基础功能

:::demo

```html
<template>
    <div>
        <ve-table
            :max-height="350"
            :columns="columns"
            :table-data="tableData"
            borderY
            :cell-autofill-option="cellAutofillOption"
            :edit-option="editOption"
            row-key-field-name="rowKey"
            :clipboard-option="clipboardOption"
            :virtual-scroll-option="virtualScrollOption"
        />
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // clipboard option
                clipboardOption: {
                    copy: true,
                    paste: true,
                    cut: true,
                    beforeCopy: ({ data, selectionRange }) => {
                        return true;
                    },
                    afterCopy: ({ data, selectionRange }) => {},
                    beforePaste: ({ data, selectionRange }) => {},
                    afterPaste: ({ data, selectionRange }) => {},
                    beforeCut: ({ data, selectionRange }) => {},
                    afterCut: ({ data, selectionRange }) => {},
                },
                virtualScrollOption: {
                    // 是否开启
                    enable: false,
                },
                cellAutofillOption: true,
                editOption: {
                    // cell value change
                    cellValueChange: ({ row, column }) => {},
                },
                columns: [
                    {
                        field: "index",
                        key: "index",
                        operationColumn: true,
                        title: "#",
                        width: 35,
                        align: "center",
                        renderBodyCell: ({ row, column, rowIndex }, h) => {
                            return ++rowIndex;
                        },
                    },
                    { field: "col1", key: "col1", title: "Col1", edit: true, width: 150 },
                    { field: "col2", key: "col2", title: "Col2", edit: true, width: 150 },
                    { field: "col3", key: "col3", title: "Col3", edit: true, width: 150 },
                    { field: "col4", key: "col4", title: "Col4", edit: true, width: 150 },
                    { field: "col5", key: "col5", title: "Col5", edit: true, width: 150 },
                    { field: "col6", key: "col6", title: "Col6", edit: true, width: 150 },
                ],
                tableData: [],
            };
        },
        methods: {
            initTableData() {
                let data = [];
                for (let i = 0; i < 100; i++) {
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
