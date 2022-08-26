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
                    delete: true,
                    beforeCopy: ({ data, selectionRangeIndexes, selectionRangeKeys }) => {
                        console.log("beforeCopy");
                        this.log({ data, selectionRangeIndexes, selectionRangeKeys });
                    },
                    afterCopy: ({ data, selectionRangeIndexes, selectionRangeKeys }) => {
                        console.log("afterCopy");
                        this.log({ data, selectionRangeIndexes, selectionRangeKeys });
                    },
                    beforePaste: ({ data, selectionRangeIndexes, selectionRangeKeys }) => {
                        console.log("beforePaste");
                        this.log({ data, selectionRangeIndexes, selectionRangeKeys });
                    },
                    afterPaste: ({ data, selectionRangeIndexes, selectionRangeKeys }) => {
                        console.log("afterPaste");
                        this.log({ data, selectionRangeIndexes, selectionRangeKeys });
                    },
                    beforeCut: ({ data, selectionRangeIndexes, selectionRangeKeys }) => {
                        console.log("beforeCut");
                        this.log({ data, selectionRangeIndexes, selectionRangeKeys });
                    },
                    afterCut: ({ data, selectionRangeIndexes, selectionRangeKeys }) => {
                        console.log("afterCut");
                        this.log({ data, selectionRangeIndexes, selectionRangeKeys });
                    },
                    beforeDelete: ({ data, selectionRangeIndexes, selectionRangeKeys }) => {
                        return false;

                        console.log("beforeDelete");
                        this.log({ data, selectionRangeIndexes, selectionRangeKeys });
                    },
                    afterDelete: ({ data, selectionRangeIndexes, selectionRangeKeys }) => {
                        console.log("afterDelete");
                        this.log({ data, selectionRangeIndexes, selectionRangeKeys });
                    },
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
                        rowKey: `row${i}`,
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
            log({ data, selectionRangeIndexes, selectionRangeKeys }) {
                console.log("data::", data);
                console.log("selectionRangeIndexes::", selectionRangeIndexes);
                console.log("selectionRangeKeys::", selectionRangeKeys);
            },
        },
        created() {
            this.initTableData();
        },
    };
</script>
```

:::
