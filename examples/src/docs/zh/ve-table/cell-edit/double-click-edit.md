:::anchor 双击编辑

你可以通过 `Enter`键配合上、下、左、右键，无需使用鼠标实现编辑操作

:::demo 1、默认双击开启编辑单元格<br>2、单元格停止编辑后将触发`cellValueChange`方法，参数`row`为更新后的行数据信息，参数`column`为当前编辑的列信息

```html
<template>
    <div>
        <ve-table
            :scroll-width="1600"
            :max-height="380"
            row-key-field-name="rowKey"
            :fixed-header="true"
            :columns="columns"
            :table-data="tableData"
            :edit-option="editOption"
            :row-style-option="rowStyleOption"
            :virtual-scroll-option="{enable:true}"
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
                    // cell value change
                    cellValueChange: ({ row, column }) => {
                        console.log("cellValueChange row::", row);
                        console.log("cellValueChange column::", column);
                    },
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
                        col1: i + "aaaaaa",
                        col2: "",
                        col3: 111,
                        col4: i,
                        col5: i,
                        col6: i,
                        col7: i,
                        col8: i,
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
