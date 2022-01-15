:::anchor 自定义右键菜单

:::demo

```html
<template>
    <div>
        <ve-table
            row-key-field-name="rowKey"
            :fixed-header="true"
            :columns="columns"
            :table-data="tableData"
            :row-style-option="rowStyleOption"
            border-y
            :contextmenu-body-option="contextmenuBodyOption"
        />
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // contextmenu body option
                contextmenuBodyOption: {
                    // callback for all options
                    callback: ({ type, selection }) => {
                        const { rowKey, colKey } = selection;

                        const rowIndex = this.tableData.findIndex((x) => x.rowKey === rowKey);

                        // custom empty row
                        if (type === "custom-empty-row") {
                            this.tableData = this.tableData.map((rowData) => {
                                // empty current row
                                if (rowData.rowKey === rowKey) {
                                    this.columns.forEach((column) => {
                                        rowData[column.field] = "";
                                    });
                                }
                                return rowData;
                            });
                        }

                        console.log("type::", type);
                        console.log("selection::", selection);
                    },

                    // contextmenus
                    contextmenus: [
                        {
                            type: "INSERT_ROW_ABOVE",
                        },
                        {
                            type: "INSERT_ROW_BELOW",
                        },
                        {
                            type: "SEPARATOR",
                        },
                        {
                            type: "custom-empty-row",
                            label: "empty row(custom)",
                        },
                        {
                            type: "customType1",
                            label: "custom menu",
                            children: [
                                {
                                    label: "menu5-1",
                                    type: "menu5-1-type",
                                    children: [
                                        {
                                            label: "menu5-1-1",
                                            type: "menu5-1-1-type",
                                        },
                                        {
                                            label: "menu5-2-2",
                                            type: "menu5-2-2-type",
                                        },
                                    ],
                                },
                                {
                                    label: "menu5-2",
                                    disabled: true,
                                },
                                {
                                    type: "SEPARATOR",
                                },
                                {
                                    label: "menu5-3",
                                    type: "menu5-3-type",
                                },
                            ],
                        },
                    ],
                },

                rowStyleOption: {
                    clickHighlight: false,
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
                    },
                    {
                        field: "date",
                        key: "date",
                        title: "Date",
                        align: "left",
                        width: "15%",
                    },
                    {
                        field: "number",
                        key: "number",
                        title: "Number",
                        align: "right",
                        width: "30%",
                    },
                    {
                        field: "address",
                        key: "address",
                        title: "Address",
                        align: "left",
                        width: "40%",
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

        methods: {},
    };
</script>
```

:::
