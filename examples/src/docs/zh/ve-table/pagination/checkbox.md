:::anchor 结合行多选

:::demo 此示例多选逻辑可以参考 [mail.google.com](https://mail.google.com/)

```html
<template>
    <div>
        <div>当前选中的行key：{{selectedRowKeysCollection}}</div>
        <ve-table
            :columns="columns"
            :table-data="currentPageData"
            :checkbox-option="checkboxOption"
            row-key-field-name="rowKey"
        />
        <div class="table-pagination">
            <ve-pagination
                :total="totalCount"
                :page-index="pageIndex"
                :page-size="pageSize"
                @on-page-number-change="pageNumberChange"
                @on-page-size-change="pageSizeChange"
            />
        </div>
    </div>
</template>

<style>
    .table-pagination {
        margin-top: 20px;
        text-align: right;
    }
</style>

<script>
    // Simulation table data from database
    let DB_DATA = [];

    export default {
        data() {
            return {
                // page index
                pageIndex: 1,
                // page size
                pageSize: 10,
                // selected row keys collection
                selectedRowKeysCollection: [],
                // checkbox option
                checkboxOption: {
                    // 可控属性
                    selectedRowKeys: [],
                    // 行选择改变事件
                    selectedRowChange: ({ row, isSelected, selectedRowKeys }) => {
                        this.changeSelectedRowKeys(row, isSelected);
                    },
                    // 全选改变事件
                    selectedAllChange: ({ isSelected, selectedRowKeys }) => {
                        this.changeSelectAll(isSelected, selectedRowKeys);
                    },
                },
                columns: [
                    {
                        field: "",
                        key: "a",
                        title: "#",
                        align: "center",
                        renderBodyCell: ({ row, column, rowIndex }, h) => {
                            return (this.pageIndex - 1) * this.pageSize + rowIndex + 1;
                        },
                    },
                    {
                        field: "",
                        key: "checkbox",
                        // type=checkbox
                        type: "checkbox",
                        title: "",
                        width: 50,
                        align: "center",
                    },

                    { field: "name", key: "b", title: "Name", align: "center" },
                    { field: "date", key: "c", title: "Date", align: "left" },
                    { field: "hobby", key: "d", title: "Hobby", align: "left" },
                    { field: "address", key: "e", title: "Address", width: "" },
                ],
            };
        },
        computed: {
            // table data
            currentPageData() {
                const { pageIndex, pageSize } = this;
                return DB_DATA.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
            },
            // total count
            totalCount() {
                return DB_DATA.length;
            },
        },
        methods: {
            // selected rowKeys change
            changeSelectedRowKeys(row, isSelected) {
                const rowKey = row.rowKey;

                if (isSelected) {
                    this.checkboxOption.selectedRowKeys.push(rowKey);
                    this.selectedRowKeysCollection.push(rowKey);
                } else {
                    const index = this.checkboxOption.selectedRowKeys.indexOf(rowKey);
                    this.checkboxOption.selectedRowKeys.splice(index, 1);
                    this.selectedRowKeysCollection.splice(index, 1);
                }
            },

            // select all change
            changeSelectAll(isSelected, selectedRowKeys) {
                this.checkboxOption.selectedRowKeys = selectedRowKeys;

                if (isSelected) {
                    this.selectedRowKeysCollection =
                        this.selectedRowKeysCollection.concat(selectedRowKeys);
                } else {
                    this.currentPageData.forEach((item) => {
                        if (selectedRowKeysCollection.indexOf(item.rowKey) > -1) {
                            this.selectedRowKeysCollection.splice(index, 1);
                        }
                    });
                }
            },

            // reset selectedRowKeys
            resetSelectedRowKeys() {
                this.checkboxOption.selectedRowKeys = [];

                const selectedRowKeysCollection = this.selectedRowKeysCollection;

                if (selectedRowKeysCollection.length) {
                    this.currentPageData.forEach((item) => {
                        if (selectedRowKeysCollection.indexOf(item.rowKey) > -1) {
                            this.checkboxOption.selectedRowKeys.push(item.rowKey);
                        }
                    });
                }
            },

            // page number change
            pageNumberChange(pageIndex) {
                this.pageIndex = pageIndex;
                this.resetSelectedRowKeys();
            },

            // page size change
            pageSizeChange(pageSize) {
                this.pageIndex = 1;
                this.pageSize = pageSize;
                this.resetSelectedRowKeys();
            },

            // Simulation table data
            initDatabase() {
                DB_DATA = [];
                for (let i = 0; i < 1000; i++) {
                    DB_DATA.push({
                        rowKey: i,
                        name: "John" + i,
                        date: "1900-05-20",
                        hobby: "coding and coding repeat" + i,
                        address: "No.1 Century Avenue, Shanghai" + i,
                    });
                }
            },
        },
        created() {
            this.initDatabase();
        },
    };
</script>
```

:::
