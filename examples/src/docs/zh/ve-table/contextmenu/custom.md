:::anchor 自定义右键菜单

:::demo

```html
<template>
    <div>
        <ve-table
            :scroll-width="1600"
            :max-height="500"
            row-key-field-name="rowKey"
            :fixed-header="true"
            :columns="columns"
            :table-data="tableData"
            :row-style-option="rowStyleOption"
            :virtual-scroll-option="virtualScrollOption"
            border-y
            :contextmenu-body-option="contextmenuBodyOption"
        />
    </div>
</template>

<script>
    export default {
        data() {
            return {
                virtualScrollOption: {
                    // 是否开启
                    enable: true,
                    scrolling: this.scrolling,
                },
                // contextmenu body option
                contextmenuBodyOption: {
                    // callback for all options
                    callback: ({ type, selection }) => {
                        const { rowKey, colKey } = selection;

                        // custom empty row
                        if (type === "custom-empty-row") {
                            this.tableData = this.tableData.map((rowData) => {
                                // empty current row
                                if (rowData.rowKey === rowKey) {
                                    Object.keys(rowData).forEach((field) => {
                                        rowData[field] = "";
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
                            type: "HIDE_COLUMN",
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
                    hoverHighlight: false,
                },
                columns: [
                    {
                        field: "",
                        key: "a",
                        title: "",
                        width: 15,
                        align: "center",
                        fixed: "left",
                        operationColumn: true,
                        renderBodyCell: ({ row, column, rowIndex }, h) => {
                            return rowIndex + this.startRowIndex + 1;
                        },
                    },
                    {
                        field: "col1",
                        key: "col1",
                        title: "col1",
                        width: 50,
                        fixed: "left",
                    },
                    {
                        title: "col2-col3",
                        fixed: "left",
                        children: [
                            {
                                field: "col2",
                                key: "col2",
                                title: "col2",
                                width: 50,
                            },
                            {
                                field: "col3",
                                key: "col3",
                                title: "col3",
                                width: 50,
                            },
                        ],
                    },
                    {
                        title: "col4-col5-col6",
                        children: [
                            {
                                title: "col4-col5",
                                children: [
                                    {
                                        field: "col4",
                                        key: "col4",
                                        title: "col4",
                                        width: 130,
                                    },
                                    {
                                        field: "col5",
                                        key: "col5",
                                        title: "col5",
                                        width: 140,
                                    },
                                ],
                            },
                            {
                                title: "col6",
                                field: "col6",
                                key: "col6",
                                width: 140,
                            },
                        ],
                    },
                    {
                        title: "col7",
                        fixed: "right",
                        children: [
                            {
                                title: "col7-1",
                                field: "col7",
                                key: "col7",
                                width: 50,
                            },
                        ],
                    },
                    {
                        field: "col8",
                        key: "col8",
                        title: "col8",
                        width: 50,
                        fixed: "right",
                    },
                ],
                // table data
                tableData: [],
            };
        },
        methods: {
            initTableData() {
                let data = [];
                for (let i = 0; i < 100; i++) {
                    data.push({
                        rowKey: i,
                        col1: `A` + i,
                        col2: `B` + i,
                        col3: `C` + i,
                        col4: `D` + i,
                        col5: `E` + i,
                        col6: `F` + i,
                        col7: `G` + i,
                        col8: `H` + i,
                    });
                }
                this.tableData = data;
            },
            // virtual scrolling
            scrolling({ startRowIndex }) {
                this.startRowIndex = startRowIndex;
            },
        },
        created() {
            this.initTableData();
        },
    };
</script>
```

:::
