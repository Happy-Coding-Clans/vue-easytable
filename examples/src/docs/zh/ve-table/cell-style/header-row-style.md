:::anchor 表头行样式

:::demo 1、表头行样式，仍然可以通过 `headerCellClass({ column, rowIndex })`实现

```html
<template>
    <ve-table :columns="columns" :table-data="tableData" :cell-style-option="cellStyleOption" />
</template>

<style>
    .table-header-cell-class {
        background: #91d5ff !important;
        color: #fff !important;
    }
</style>

<script>
    export default {
        data() {
            return {
                cellStyleOption: {
                    headerCellClass: ({ column, rowIndex }) => {
                        if (rowIndex === 0) {
                            return "table-header-cell-class";
                        }
                    },
                },
                columns: [
                    { field: "col1", key: "a", title: "col1", width: "10%" },
                    {
                        title: "col2-col3",
                        children: [
                            {
                                field: "col2",
                                key: "b",
                                title: "col2",
                                width: 100,
                            },
                            {
                                field: "col3",
                                key: "c",
                                title: "col3",
                                width: 110,
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
                    { field: "col7", key: "g", title: "col7", width: 150 },
                    { field: "col8", key: "h", title: "col8", width: 160 },
                ],
                tableData: [
                    {
                        col1: "1",
                        col2: "2",
                        col3: "3",
                        col4: "4",
                        col5: "5",
                        col6: "6",
                        col7: "7",
                        col8: "8",
                    },
                    {
                        col1: "1",
                        col2: "2",
                        col3: "3",
                        col4: "4",
                        col5: "5",
                        col6: "6",
                        col7: "7",
                        col8: "8",
                    },
                    {
                        col1: "1",
                        col2: "2",
                        col3: "3",
                        col4: "4",
                        col5: "5",
                        col6: "6",
                        col7: "7",
                        col8: "8",
                    },
                    {
                        col1: "1",
                        col2: "2",
                        col3: "3",
                        col4: "4",
                        col5: "5",
                        col6: "6",
                        col7: "7",
                        col8: "8",
                    },
                    {
                        col1: "1",
                        col2: "2",
                        col3: "3",
                        col4: "4",
                        col5: "5",
                        col6: "6",
                        col7: "7",
                        col8: "8",
                    },
                ],
            };
        },
    };
</script>
```

:::
