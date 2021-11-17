:::anchor Custom full row control

After the full row editing is enabled through 'fullRowEdit=true', the full row will be edited through the instance method `startEditingCell({ rowKey, colKey, defaultValue })`

:::demo 1、After passing the `colKey` and `defaultValue` attributes, only the value of the currently specified column will be overwritten

```html
<template>
    <div>
        <button class="button-demo" @click="startEditingCell({ rowKey:0, colKey, defaultValue })">
            Edit first row
        </button>
        <button class="button-demo" @click="startEditingCell({ rowKey:1,  defaultValue:'A' })">
            Edit second row,Set the value of the full row cell to 'A'
        </button>
        <button
            class="button-demo"
            @click="startEditingCell({ rowKey:2,colKey:'name', defaultValue:'A' })"
        >
            Edit third row,Set the value of the 'name' column to 'A'
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
            startEditingCell(params) {
                this.$refs["tableRef"].startEditingCell(params);
            },
        },
    };
</script>
```

:::
