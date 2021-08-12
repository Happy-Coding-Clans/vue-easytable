:::anchor 表格动态高度（calc css 函数）

:::demo 1、你可以使用 [calc css 函数](<https://developer.mozilla.org/en-US/docs/Web/CSS/calc()>) 实现表格动态高度<br>2、试试改变浏览器宽度查看效果

```html
<template>
    <ve-table
        max-height="calc(100vh - 350px)"
        fixed-header
        :columns="columns"
        :table-data="tableData"
    />
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    { field: "name", key: "a", title: "Name", align: "center" },
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
            };
        },
        methods: {
            initTableData() {
                let data = [];
                for (let i = 0; i < 20; i++) {
                    data.push({
                        name: i,
                        date: i,
                        hobby: i,
                        address: i,
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
