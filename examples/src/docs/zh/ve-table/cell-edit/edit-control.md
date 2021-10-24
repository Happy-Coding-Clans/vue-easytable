:::anchor 可控编辑

:::demo 1

```html
<template>
    <div>
        <button @click="startEditingCell(0,'name')">编辑单元格0-0</button>
        <button @click="startEditingCell(2,'hobby','')">编辑并清空单元格2-2</button>
        &nbsp;&nbsp;
        <button @click="stopEditingCell(0,'name')">停止编辑单元格1-1</button>
        <button @click="stopEditingCell(2,'hobby')">停止编辑单元格2-2</button>
        <br />
        <br />
        <ve-table
            ref="tableRef"
            rowKeyFieldName="rowkey"
            :max-height="300"
            :fixed-header="true"
            :columns="columns"
            :table-data="tableData"
            :editOption="editOption"
        />
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // edit option 可控单元格编辑
                editOption: {
                    // full row edit
                    fullRowEdit: false,
                    // double click edit
                    doubleClickEdit: true,
                    // auto stop editing when cell lose focus
                    stopEditingWhenCellLoseFocus: true,
                    // cell value change
                    cellValueChange: ({ row, column }) => {
                        console.log("cellValueChange row::", row);
                        console.log("cellValueChange column::", column);
                    },
                    // row value change
                    rowValueChange: ({ row }) => {
                        console.log("rowValueChange row::", row);
                    },
                },
                columns: [
                    {
                        field: "name",
                        key: "name",
                        title: "Name",
                        align: "left",
                        width: "15%",
                        edit: true,
                        renderBodyCell: ({ row, column, rowIndex }, h) => {
                            return (
                                <span class="text-bold" style="color:#1890ff;">
                                    {1 + row["name"]}
                                </span>
                            );
                        },
                    },
                    {
                        field: "date",
                        key: "date",
                        title: "Date",
                        align: "left",
                        width: "15%",
                        edit: true,
                    },
                    {
                        field: "hobby",
                        key: "hobby",
                        title: "Hobby",
                        align: "left",
                        width: "30%",
                        edit: true,
                    },
                    {
                        field: "address",
                        key: "address",
                        title: "Address",
                        align: "left",
                        width: "40%",
                        edit: true,
                    },
                ],
                // table data
                tableData: [
                    {
                        name: "John",
                        date: "1900-05-20",
                        hobby: "coding and coding repeat",
                        address: "No.1 Century Avenue, Shanghai",
                        rowkey: 0,
                    },
                    {
                        name: "Dickerson",
                        date: "1910-06-20",
                        hobby: "coding and coding repeat",
                        address: "No.1 Century Avenue, Beijing",
                        rowkey: 1,
                    },
                    {
                        name: "Larsen",
                        date: "2000-07-20",
                        hobby: "coding and coding repeat",
                        address: "No.1 Century Avenue, Chongqing",
                        rowkey: 2,
                    },
                    {
                        name: "Geneva",
                        date: "2010-08-20",
                        hobby: "coding and coding repeat",
                        address: "No.1 Century Avenue, Xiamen",
                        rowkey: 3,
                    },
                    {
                        name: "Jami",
                        date: "2020-09-20",
                        hobby: "coding and coding repeat",
                        address: "No.1 Century Avenue, Shenzhen",
                        rowkey: 4,
                    },
                ],
            };
        },
        methods: {
            // start editing cell
            startEditingCell(rowKey, colKey, defaultValue) {
                this.$refs["tableRef"].startEditingCell({ rowKey, colKey, defaultValue });
            },

            stopEditingCell(rowKey, colKey) {
                this.$refs["tableRef"].stopEditingCell({ rowKey, colKey });
            },
        },
    };
</script>
```

:::
