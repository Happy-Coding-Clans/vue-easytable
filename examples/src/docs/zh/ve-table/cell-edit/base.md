:::anchor 基本用法

尝试将 “Number”列的值改为非数字

:::demo 1、单元格停止编辑后首先触发`beforeCellValueChange`回调，如果返回 false，则不会编辑成功。编辑成功将触发`afterCellValueChange`方法<br>2、你可以利用`beforeCellValueChange`做编辑校验功能

```html
<template>
    <div>
        <ve-table
            rowKeyFieldName="rowKey"
            :fixed-header="true"
            :columns="columns"
            :table-data="tableData"
            :editOption="editOption"
            :rowStyleOption="rowStyleOption"
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
                },
                // edit option 可控单元格编辑
                editOption: {
                    beforeCellValueChange: ({ row, column, changeValue }) => {
                        console.log("beforeCellValueChange");
                        console.log("row::", row);
                        console.log("column::", column);
                        console.log("changeValue::", changeValue);

                        console.log("---");

                        if (column.field === "number" && !/^\d+$/.test(changeValue)) {
                            alert("请输入数字");
                            return false;
                        }
                    },
                    afterCellValueChange: ({ row, column, changeValue }) => {
                        console.log("afterCellValueChange");
                        console.log("row::", row);
                        console.log("column::", column);
                        console.log("changeValue::", changeValue);
                        console.log("---");
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
                        field: "number",
                        key: "number",
                        title: "Number",
                        align: "right",
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
                        number: "32",
                        address: "No.1 Century Avenue, Shanghai",
                        rowKey: 0,
                    },
                    {
                        name: "Dickerson",
                        date: "1910-06-20",
                        number: "676",
                        address: "No.1 Century Avenue, Beijing",
                        rowKey: 1,
                    },
                    {
                        name: "Larsen",
                        date: "2000-07-20",
                        number: "76",
                        address: "No.1 Century Avenue, Chongqing",
                        rowKey: 2,
                    },
                    {
                        name: "Geneva",
                        date: "2010-08-20",
                        number: "7797",
                        address: "No.1 Century Avenue, Xiamen",
                        rowKey: 3,
                    },
                    {
                        name: "Jami",
                        date: "2020-09-20",
                        number: "8978",
                        address: "No.1 Century Avenue, Shenzhen",
                        rowKey: 4,
                    },
                ],
            };
        },
    };
</script>
```

:::
