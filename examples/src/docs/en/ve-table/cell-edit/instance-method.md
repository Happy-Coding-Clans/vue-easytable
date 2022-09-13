:::anchor Instance method

:::demo 1、Open the edited cell through instance method `startEditingCell({ rowKey, colKey, defaultValue })`

```html
<template>
    <div>
        <button class="button-demo" @click="startEditingCell(0,'name')">Edit Cell 0-0</button>
        <button class="button-demo" @click="startEditingCell(2,'hobby','')">
            Edit And Clear Cell 2-2
        </button>
        <br />
        <br />
        <ve-table
            ref="tableRef"
            rowKeyFieldName="rowKey"
            :max-height="300"
            :fixed-header="true"
            :columns="columns"
            :table-data="tableData"
            :editOption="editOption"
            :row-style-option="rowStyleOption"
            border-y
        />
    </div>
</template>

<script>
    export default {
        data() {
            return {
                rowStyleOption: {
                    clickHighlight: false,
                    hoverHighlight: false,
                },
                // edit option
                editOption: {
                    // cell value change
                    cellValueChange: ({ row, column }) => {
                        console.log("cellValueChange row::", row);
                        console.log("cellValueChange column::", column);
                    },
                },
                columns: [
                    {
                        field: "",
                        key: "a",
                        title: "",
                        width: 50,
                        align: "center",
                        renderBodyCell: ({ row, column, rowIndex }, h) => {
                            return ++rowIndex;
                        },
                    },
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
        },
    };
</script>
```

:::
