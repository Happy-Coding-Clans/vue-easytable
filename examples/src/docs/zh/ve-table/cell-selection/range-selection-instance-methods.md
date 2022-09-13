:::anchor 区域选择实例方法

:::demo 1、通过实例方法`setAllCellSelection()`设置单元格全选<br>2、通过实例方法`setRangeCellSelection({ startRowKey,startColKey,endRowKey,endColKey,isScrollToStartCell })`设置区域单元格选中<br>

```html
<template>
    <div>
        <button class="button-demo" @click="setAllCellSelection()">单元格全选</button>
        <button class="button-demo" @click="setRangeCellSelection()">区域选择</button>
        <br />
        <br />
        <ve-table
            ref="tableRef"
            fixed-header
            :scroll-width="1600"
            :max-height="380"
            border-y
            :columns="columns"
            :table-data="tableData"
            rowKeyFieldName="rowKey"
            :virtual-scroll-option="virtualScrollOption"
            :rowStyleOption="rowStyleOption"
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
                rowStyleOption: {
                    clickHighlight: false,
                    hoverHighlight: false,
                },
                cellSelectionOption: {
                    // disble cell selection
                    enable: true,
                },
                columns: [
                    {
                        field: "",
                        key: "a",
                        title: "",
                        width: 15,
                        align: "center",
                        fixed: "left",
                        operationColumn: true,
                        renderBodyCell: ({ row, column, rowIndex }, h) => {
                            return rowIndex + this.startRowIndex + 1;
                        },
                    },
                    {
                        field: "col1",
                        key: "col1",
                        title: "col1",
                        width: 50,
                        fixed: "left",
                    },
                    {
                        title: "col2-col3",
                        fixed: "left",
                        children: [
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
                        ],
                    },
                    {
                        title: "col4-col5-col6",
                        children: [
                            {
                                title: "col4-col5",
                                children: [
                                    {
                                        field: "col4",
                                        key: "col4",
                                        title: "col4",
                                        width: 130,
                                    },
                                    {
                                        field: "col5",
                                        key: "col5",
                                        title: "col5",
                                        width: 140,
                                    },
                                ],
                            },
                            {
                                title: "col6",
                                field: "col6",
                                key: "col6",
                                width: 140,
                            },
                        ],
                    },
                    {
                        title: "col7",
                        fixed: "right",
                        children: [
                            {
                                title: "col7-1",
                                field: "col7",
                                key: "col7",
                                width: 50,
                            },
                        ],
                    },
                    {
                        field: "col8",
                        key: "col8",
                        title: "col8",
                        width: 50,
                        fixed: "right",
                    },
                ],
                tableData: [],
            };
        },
        methods: {
            // set all selection
            setAllCellSelection() {
                this.$refs["tableRef"].setAllCellSelection();
            },
            // set range cell selection
            setRangeCellSelection() {
                this.$refs["tableRef"].setRangeCellSelection({
                    startRowKey: 30,
                    startColKey: "col2",
                    endRowKey: 32,
                    endColKey: "col4",
                    isScrollToStartCell: true,
                });
            },
            initTableData() {
                let data = [];
                for (let i = 0; i < 50; i++) {
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
