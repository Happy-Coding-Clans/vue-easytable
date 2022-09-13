:::anchor 隐藏表头

:::demo

```html
<template>
    <div>
        <el-radio-group v-model="showHeaderRadio">
            <el-radio label="Show">Show</el-radio>
            <el-radio label="Hidden">Hidden</el-radio>
        </el-radio-group>
        <br />
        <br />
        <ve-table
            :show-header="showHeader"
            :columns="columns"
            :table-data="tableData"
            rowKeyFieldName="rowKey"
        />
    </div>
</template>

<script>
    export default {
        data() {
            return {
                showHeaderRadio: "Hidden",
                columns: [
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
        computed: {
            showHeader() {
                return this.showHeaderRadio === "Show";
            },
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
