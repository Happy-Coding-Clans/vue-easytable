:::anchor Cell selection instance method

:::demo You can set cell selection by instance method `setCellSelection`

```html
<template>
    <div>
        <button class="button-demo" @click="setCellSelection(29,'e')">
            Select row 30 and column 5
        </button>
        <button class="button-demo" @click="setCellSelection(1,'a')">
            Select row 2 and column 1
        </button>
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
            :virtual-scroll-option="{enable:true}"
        />
    </div>
</template>

<script>
    export default {
        data() {
            return {
                cellSelectionOption: {
                    // disble cell selection
                    enable: true,
                },
                columns: [
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
                                key: "c",
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
                                        key: "d",
                                        title: "col4",
                                        width: 130,
                                    },
                                    {
                                        field: "col5",
                                        key: "e",
                                        title: "col5",
                                        width: 140,
                                    },
                                ],
                            },
                            {
                                title: "col6",
                                field: "col6",
                                key: "f",
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
                                key: "g",
                                width: 50,
                            },
                        ],
                    },
                    {
                        field: "col8",
                        key: "h",
                        title: "col8",
                        width: 50,
                        fixed: "right",
                    },
                ],
                tableData: [],
            };
        },
        methods: {
            // set cell selection
            setCellSelection(rowKey, colKey) {
                this.$refs["tableRef"].setCellSelection({ rowKey, colKey });
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
        },
        created() {
            this.initTableData();
        },
    };
</script>
```

:::
