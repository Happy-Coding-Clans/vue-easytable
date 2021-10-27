:::anchor

:::demo 1

```html
<template>
    <div>
        <button @click="startEditingCell(0,'name')">编辑单元格1-1</button>
        <button @click="startEditingCell(1,'date')">编辑单元格2-2</button>
        &nbsp;&nbsp;
        <button @click="startEditingCell(2,'name','222')">编辑单元格3-1</button>
        <button @click="startEditingCell(3,'date','')">编辑单元格4-2</button>
        &nbsp;&nbsp;
        <button @click="stopEditingCell(0,'name')">停止编辑单元格1-1</button>
        <button @click="stopEditingCell(1,'date')">停止编辑单元格单元格2-2</button>
        <ve-table
            ref="tableRef"
            rowKeyFieldName="rowKey"
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
                    // stop editing when table body click outside
                    stopEditingWhenTableBodyClickOutside: false,
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
                        rowKey: 0,
                    },
                    {
                        name: "Dickerson",
                        date: "1910-06-20",
                        hobby: "coding and coding repeat",
                        address: "No.1 Century Avenue, Beijing",
                        rowKey: 1,
                    },
                    {
                        name: "Larsen",
                        date: "2000-07-20",
                        hobby: "coding and coding repeat",
                        address: "No.1 Century Avenue, Chongqing",
                        rowKey: 2,
                    },
                    {
                        name: "Geneva",
                        date: "2010-08-20",
                        hobby: "coding and coding repeat",
                        address: "No.1 Century Avenue, Xiamen",
                        rowKey: 3,
                    },
                    {
                        name: "Jami",
                        date: "2020-09-20",
                        hobby: "coding and coding repeat",
                        address: "No.1 Century Avenue, Shenzhen",
                        rowKey: 4,
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
