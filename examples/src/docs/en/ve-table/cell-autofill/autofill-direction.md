:::anchor Cell autifill direction

:::demo It can be set to enable autofilling in a certain direction

```html
<template>
    <div>
        <el-radio-group @change="autofillTypeChang" v-model="autofillType">
            <el-radio label="Horizontal">Horizontal</el-radio>
            <el-radio label="Vertical">Vertical</el-radio>
            <el-radio label="All">All</el-radio>
        </el-radio-group>
        <br />
        <br />
        <ve-table
            fixed-header
            border-y
            :columns="columns"
            :table-data="tableData"
            :cell-autofill-option="cellAutofillOption"
            rowKeyFieldName="rowKey"
            :rowStyleOption="rowStyleOption"
        />
    </div>
</template>

<script>
    export default {
        data() {
            return {
                autofillType: "All",
                cellAutofillOption: {
                    directionX: true,
                    directionY: true,
                },
                rowStyleOption: {
                    clickHighlight: false,
                    hoverHighlight: false,
                },
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
        methods: {
            autofillTypeChang(type) {
                this.cellAutofillOption.directionX = false;
                this.cellAutofillOption.directionY = false;
                if (type === "Horizontal") {
                    this.cellAutofillOption.directionX = true;
                } else if (type === "Vertical") {
                    this.cellAutofillOption.directionY = true;
                } else if (type === "All") {
                    this.cellAutofillOption.directionX = true;
                    this.cellAutofillOption.directionY = true;
                }
            },
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
