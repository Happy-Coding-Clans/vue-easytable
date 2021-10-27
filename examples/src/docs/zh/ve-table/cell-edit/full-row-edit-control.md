:::anchor 可控行编辑

:::demo 1

```html
<template>
    <div>
        <ve-table
            ref="tableRef"
            rowKeyFieldName="rowKey"
            :max-height="300"
            :fixed-header="true"
            :columns="columns"
            :table-data="tableData"
            :editOption="editOption"
            :cell-selection-option="cellSelectionOption"
            :event-custom-option="eventCustomOption"
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
                    stopEditingWhenCellLoseFocus: false,
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
                eventCustomOption: {
                    // body 行事件自定义
                    bodyRowEvents: ({ row, rowIndex }) => {
                        return {
                            dblclick: (event) => {
                                const rowKey = row["rowKey"];
                                if (this.editRowKeys.indexOf((x) => x === rowKey) === -1) {
                                    this.editRowKeys.push(rowKey);
                                }
                            },
                        };
                    },
                },
                cellSelectionOption: {
                    // default true
                    enable: false,
                },
                // 当前编辑的行key
                editRowKeys: [],
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
                        width: "25%",
                    },
                    {
                        field: "address",
                        key: "address",
                        title: "Address",
                        align: "left",
                        width: "25%",
                        edit: true,
                    },
                    {
                        field: "customField",
                        key: "customField",
                        title: "操作",
                        align: "left",
                        width: "20%",
                        renderBodyCell: ({ row, column, rowIndex }, h) => {
                            const { editRowKeys } = this;
                            const rowKey = row["rowKey"];

                            const isEditingRow = editRowKeys.some((x) => x === rowKey);

                            return (
                                <div>
                                    <a
                                        style={{
                                            display: isEditingRow ? "none" : "",
                                        }}
                                        href="javascript:void(0)"
                                        on-click={() => {
                                            this.startEditingCell(rowKey);
                                        }}
                                    >
                                        Edit
                                    </a>
                                    {isEditingRow && (
                                        <span>
                                            <a
                                                href="javascript:void(0)"
                                                on-click={() => {
                                                    this.saveEditingCell(rowKey);
                                                }}
                                            >
                                                Save
                                            </a>
                                            &nbsp;
                                            <a
                                                slot="reference"
                                                href="javascript:void(0)"
                                                on-click={() => {
                                                    this.cancelEditingCell(rowKey, row);
                                                }}
                                            >
                                                Cancel
                                            </a>
                                        </span>
                                    )}
                                </div>
                            );
                        },
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
            startEditingCell(rowKey) {
                this.editRowKeys.push(rowKey);
                this.$refs["tableRef"].startEditingCell({ rowKey });
            },

            // cancel editing cell
            cancelEditingCell(rowKey, originalRow) {
                if (window.confirm("确定要取消吗？")) {
                    const index = this.editRowKeys.findIndex((x) => x === rowKey);
                    this.editRowKeys.splice(index, 1);
                    this.$refs["tableRef"].stopEditingCell({ rowKey });

                    // reset table row data
                    this.tableData = this.tableData.map((item) => {
                        if (item.rowKey === originalRow.rowKey) {
                            item = { ...originalRow };
                        }
                        return item;
                    });
                }
            },

            // save editing cell
            saveEditingCell(rowKey) {
                const index = this.editRowKeys.findIndex((x) => x === rowKey);
                this.editRowKeys.splice(index, 1);
                this.$refs["tableRef"].stopEditingCell({ rowKey });
            },
        },
    };
</script>
```

:::
