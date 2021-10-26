:::anchor footer 单元格样式

:::demo 1、回调函数`footerCellClass({ row, column, rowIndex })`接收 3 个参数，row：当前行数据、column：当前列配置、rowIndex：行索引<br>2、将符合条件的单元格返回指定的 class 名称。class 名称自定义<br>3、如果需要给单元格设置背景色或字体颜色需要加上`!important`

```html
<template>
    <ve-table
        border-y
        fixed-header
        :max-height="300"
        :columns="columns"
        :table-data="tableData"
        :footer-data="footerData"
        :cell-style-option="cellStyleOption"
        rowKeyFieldName="rowKey"
    />
</template>

<style>
    .table-footer-cell-class1 {
        background: #91d5ff !important;
        color: #fff !important;
    }

    .table-footer-cell-class2 {
        background: orange !important;
        color: #fff !important;
    }
</style>

<script>
    export default {
        data() {
            return {
                cellStyleOption: {
                    footerCellClass: ({ row, column, rowIndex }) => {
                        if (column.field === "address") {
                            return "table-footer-cell-class1";
                        }

                        if (column.field === "date" && rowIndex === 1) {
                            return "table-footer-cell-class2";
                        }
                    },
                },
                columns: [
                    { field: "name", key: "a", title: "Name", align: "left" },
                    { field: "date", key: "b", title: "Date", align: "left" },
                    { field: "hobby", key: "c", title: "Hobby", align: "left" },
                    {
                        field: "address",
                        key: "d",
                        title: "Address",
                        width: "",
                        align: "left",
                    },
                ],
                tableData: [],
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
                        name: "平均值",
                        date: 213,
                        hobby: 355,
                        address: 189,
                    },
                    {
                        rowKey: 1,
                        name: "汇总值",
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
```

:::
