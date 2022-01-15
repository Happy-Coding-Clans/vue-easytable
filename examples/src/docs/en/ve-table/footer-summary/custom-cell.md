:::anchor Footer Cell Custom

:::demo 1、In the column option, the render function can be passed in through the property `renderFooterCell`,Consistent with body custom cell usage.<br>2、The render function takes 3 parameters，row:Current row data、column:Current column option、rowIndex:Row index

```html
<template>
    <ve-table
        border-y
        fixed-header
        :max-height="300"
        :columns="columns"
        :table-data="tableData"
        :footer-data="footerData"
        rowKeyFieldName="rowKey"
    />
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        field: "name",
                        key: "a",
                        title: "Name",
                        align: "center",
                        renderFooterCell: ({ row, column, rowIndex }, h) => {
                            return (
                                <span class="text-bold" style="">
                                    {row.name}
                                </span>
                            );
                        },
                    },
                    { field: "date", key: "b", title: "Date", align: "left" },
                    {
                        field: "hobby",
                        key: "c",
                        title: "Hobby",
                        align: "center",
                    },
                    {
                        field: "address",
                        key: "d",
                        title: "Address",
                        align: "left",
                    },
                ],
                tableData: [],
                footerData: [],
            };
        },
        methods: {
            initTableData() {
                let data = [];
                for (let i = 0; i < 15; i++) {
                    data.push({
                        rowKey: i,
                        name: i,
                        date: i,
                        hobby: i,
                        address: i,
                    });
                }
                this.tableData = data;
            },

            initFooterData() {
                this.footerData = [
                    {
                        rowKey: 0,
                        name: "Average Values",
                        date: 213,
                        hobby: 355,
                        address: 189,
                    },
                    {
                        rowKey: 1,
                        name: "Summary Values",
                        date: 1780,
                        hobby: 890,
                        address: 2988,
                    },
                ];
            },
        },
        created() {
            this.initTableData();
            this.initFooterData();
        },
    };
</script>

<style>
    .text-bold {
        font-weight: bold;
    }
</style>
```

:::
