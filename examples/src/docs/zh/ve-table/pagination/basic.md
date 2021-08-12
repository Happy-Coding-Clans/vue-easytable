:::anchor 示例

:::demo

```html
<template>
    <div>
        <ve-table :columns="columns" :table-data="tableData" />
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
                columns: [
                    {
                        field: "",
                        key: "a",
                        title: "Number",
                        align: "center",
                        renderBodyCell: ({ row, column, rowIndex }, h) => {
                            return (this.pageIndex - 1) * this.pageSize + rowIndex + 1;
                        },
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
            tableData() {
                const { pageIndex, pageSize } = this;
                return DB_DATA.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
            },
            // total count
            totalCount() {
                return DB_DATA.length;
            },
        },
        methods: {
            // page number change
            pageNumberChange(pageIndex) {
                this.pageIndex = pageIndex;
            },

            // page size change
            pageSizeChange(pageSize) {
                this.pageIndex = 1;
                this.pageSize = pageSize;
            },

            // Simulation table data
            initDatabase() {
                DB_DATA = [];
                for (let i = 0; i < 1000; i++) {
                    DB_DATA.push({
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
