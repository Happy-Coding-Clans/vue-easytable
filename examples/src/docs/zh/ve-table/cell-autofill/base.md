:::anchor 基本用法

:::demo

```html
<template>
    <ve-table
        fixed-header
        :scroll-width="1600"
        :max-height="500"
        border-y
        :columns="columns"
        :table-data="tableData"
        rowKeyFieldName="rowKey"
        :virtual-scroll-option="virtualScrollOption"
        :cell-autofill-option="cellAutofillOption"
        :rowStyleOption="rowStyleOption"
    />
</template>

<script>
    export default {
        data() {
            return {
                rowStyleOption: {
                    clickHighlight: false,
                    hoverHighlight: false,
                },
                virtualScrollOption: {
                    // 是否开启
                    enable: true,
                },
                cellAutofillOption: {
                    directionX: true,
                    directionY: true,
                    beforeAutofill: ({
                        direction,
                        sourceSelectionRangeIndexes,
                        targetSelectionRangeIndexes,
                        sourceSelectionData,
                        targetSelectionData,
                    }) => {
                        console.log("direction::", direction);
                        console.log("sourceSelectionRangeIndexes::", sourceSelectionRangeIndexes);
                        console.log("targetSelectionRangeIndexes::", targetSelectionRangeIndexes);
                        console.log("sourceSelectionData::", sourceSelectionData);
                        console.log("targetSelectionData::", targetSelectionData);
                        console.log("---");
                    },
                    afterAutofill: ({
                        direction,
                        sourceSelectionRangeIndexes,
                        targetSelectionRangeIndexes,
                        sourceSelectionData,
                        targetSelectionData,
                    }) => {
                        console.log("direction::", direction);
                        console.log("sourceSelectionRangeIndexes::", sourceSelectionRangeIndexes);
                        console.log("targetSelectionRangeIndexes::", targetSelectionRangeIndexes);
                        console.log("sourceSelectionData::", sourceSelectionData);
                        console.log("targetSelectionData::", targetSelectionData);
                        console.log("---");
                    },
                },
                columns: [
                    {
                        field: "index",
                        key: "index",
                        // is operation column
                        operationColumn: true,
                        title: "#",
                        width: 15,
                        fixed: "left",
                    },
                    {
                        field: "col1",
                        key: "a",
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
                                key: "b",
                                title: "col2",
                                width: 50,
                            },
                            {
                                field: "col3",
                                key: "col3",
                                title: "col3",
                                width: 30,
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
                                        width: 110,
                                    },
                                    {
                                        field: "col5",
                                        key: "col5",
                                        title: "col5",
                                        width: 120,
                                    },
                                ],
                            },
                            {
                                title: "col6",
                                field: "col6",
                                key: "col6",
                                width: 130,
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
                        index: i + 1,
                        col1: `A${i + 1}`,
                        col2: `B${i + 1}`,
                        col3: `C${i + 1}`,
                        col4: `D${i + 1}`,
                        col5: `E${i + 1}`,
                        col6: `F${i + 1}`,
                        col7: `G${i + 1}`,
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
