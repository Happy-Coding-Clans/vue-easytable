:::anchor Customize contextmenu

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
            :virtual-scroll-option="{enable:true}"
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
                        field: "col1",
                        key: "col1",
                        title: "col1",
                        width: 50,
                        fixed: "left",
                        edit: true,
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
                                edit: true,
                            },
                            {
                                field: "col3",
                                key: "col3",
                                title: "col3",
                                width: 50,
                                edit: true,
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
                                        edit: true,
                                    },
                                    {
                                        field: "col5",
                                        key: "col5",
                                        title: "col5",
                                        width: 140,
                                        edit: true,
                                    },
                                ],
                            },
                            {
                                title: "col6",
                                field: "col6",
                                key: "col6",
                                width: 140,
                                edit: true,
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
                                edit: true,
                            },
                        ],
                    },
                    {
                        field: "col8",
                        key: "col8",
                        title: "col8",
                        width: 50,
                        fixed: "right",
                        edit: true,
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
        },
        created() {
            this.initTableData();
        },
    };
</script>
```

:::
