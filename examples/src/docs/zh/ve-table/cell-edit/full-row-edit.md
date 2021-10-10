:::anchor

:::demo 1

```html
<template>
    <div>
        <button @click="startEditingCell(0)">编辑行1</button>
        &nbsp;&nbsp;
        <button @click="startEditingCell(2,'222')">编辑行3-默认值</button>
        &nbsp;&nbsp;
        <button @click="stopEditingCell(0)">停止编辑行1</button>
        <button @click="stopEditingCell(2)">停止编辑行3</button>
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
                    fullRowEdit: true,
                    // double click edit
                    doubleClickEdit: false,
                    // auto stop editing when cell lose focus
                    stopEditingWhenCellsLoseFocus: false,
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
                        align: "center",
                        width: "30%",
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
            startEditingCell(rowKey, defaultValue) {
                this.$refs["tableRef"].startEditingCell({ rowKey, defaultValue });
            },

            stopEditingCell(rowKey) {
                this.$refs["tableRef"].stopEditingCell({ rowKey });
            },
        },
    };
</script>
```

:::
