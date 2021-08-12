:::anchor Single Condition Filter

:::demo 1、`defaultVisible` Specifies whether to expand by default<br>2、`render`Render functions,Specifies filtering custom content.The parameter 'showFn' is the display drop-down function、The parameter `closeFn` is to close the drop-down function

```html
<template>
    <ve-table
        rowKeyFieldName="rowkey"
        :max-height="300"
        :fixed-header="true"
        :columns="columns"
        :table-data="tableData"
    />
</template>

<script>
    export default {
        data() {
            return {
                searchValue: "",
                columns: [
                    {
                        field: "name",
                        key: "a",
                        title: "Name",
                        align: "left",
                        width: "15%",
                        // filter custom
                        filterCustom: {
                            defaultVisible: true,
                            render: ({ showFn, closeFn }, h) => {
                                return (
                                    <div class="custom-name-filter">
                                        <input
                                            value={this.searchValue}
                                            on-input={(e) => (this.searchValue = e.target.value)}
                                            placeholder="Search name"
                                        />
                                        <div class="custom-name-filter-operation">
                                            <span
                                                class="name-filter-cancel"
                                                on-click={() => this.searchCancel(closeFn)}
                                            >
                                                Cancel
                                            </span>
                                            <span
                                                class="name-filter-confirm"
                                                on-click={() => this.searchConfirm(closeFn)}
                                            >
                                                Search
                                            </span>
                                        </div>
                                    </div>
                                );
                            },
                        },
                    },
                    {
                        field: "date",
                        key: "b",
                        title: "Date",
                        align: "left",
                        width: "15%",
                    },
                    {
                        field: "hobby",
                        key: "c",
                        title: "Hobby",
                        align: "center",
                        width: "30%",
                    },
                    {
                        field: "address",
                        key: "d",
                        title: "Address",
                        align: "left",
                        width: "40%",
                    },
                ],
                // real table data
                tableData: [],
                // source data
                sourceData: [
                    {
                        name: "John",
                        date: "1900-05-20",
                        hobby: "coding and coding repeat",
                        address: "No.1 Century Avenue, Shanghai",
                        rowkey: 0,
                    },
                    {
                        name: "Dickerson",
                        date: "1910-06-20",
                        hobby: "coding and coding repeat",
                        address: "No.1 Century Avenue, Beijing",
                        rowkey: 1,
                    },
                    {
                        name: "Larsen",
                        date: "2000-07-20",
                        hobby: "coding and coding repeat",
                        address: "No.1 Century Avenue, Chongqing",
                        rowkey: 2,
                    },
                    {
                        name: "Geneva",
                        date: "2010-08-20",
                        hobby: "coding and coding repeat",
                        address: "No.1 Century Avenue, Xiamen",
                        rowkey: 3,
                    },
                    {
                        name: "Jami",
                        date: "2020-09-20",
                        hobby: "coding and coding repeat",
                        address: "No.1 Century Avenue, Shenzhen",
                        rowkey: 4,
                    },
                ],
            };
        },
        methods: {
            // search
            search() {
                const searchValue = this.searchValue;
                this.tableData = this.sourceData.filter(
                    (x) =>
                        !searchValue.length ||
                        x.name.toLowerCase().includes(searchValue.toLowerCase()),
                );
            },

            // search cancel
            searchCancel(closeFn) {
                closeFn();
            },

            // search cancel
            searchConfirm(closeFn) {
                this.search();
                closeFn();
            },
        },
        created() {
            this.tableData = this.sourceData.slice(0);
        },
    };
</script>

<style>
    .custom-name-filter {
        padding: 10px;

        .custom-name-filter-operation {
            cursor: pointer;

            margin: 10px 10px 0px 0;
            .name-filter-cancel,
            .name-filter-confirm {
                &:hover {
                    color: #1890ff;
                }
            }

            .name-filter-cancel {
                float: left;
            }

            .name-filter-confirm {
                float: right;
            }
        }
    }
</style>
```

:::
