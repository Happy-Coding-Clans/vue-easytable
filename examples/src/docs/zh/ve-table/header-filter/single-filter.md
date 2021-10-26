:::anchor 单条件筛选

:::demo

```html
<template>
    <ve-table
        rowKeyFieldName="rowKey"
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
                columns: [
                    {
                        field: "name",
                        key: "a",
                        title: "Name",
                        align: "left",
                        width: "15%",
                    },
                    {
                        field: "date",
                        key: "b",
                        title: "Date",
                        align: "left",
                        width: "15%",
                        // filter
                        filter: {
                            filterList: [
                                {
                                    value: 0,
                                    label: "1900-05-20",
                                    selected: false,
                                },
                                {
                                    value: 1,
                                    label: "1910-06-20",
                                    selected: false,
                                },
                                {
                                    value: 2,
                                    label: "2000-07-20",
                                    selected: false,
                                },
                                {
                                    value: 3,
                                    label: "2010-08-20",
                                    selected: false,
                                },
                                {
                                    value: 4,
                                    label: "2020-09-20",
                                    selected: false,
                                },
                            ],
                            // filter confirm hook
                            filterConfirm: (filterList) => {
                                const labels = filterList
                                    .filter((x) => x.selected)
                                    .map((x) => x.label);
                                this.searchByDateField(labels);
                            },
                            // filter reset hook
                            filterReset: (filterList) => {
                                this.searchByDateField([]);
                            },
                        },
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
            // search by date field
            searchByDateField(labels) {
                this.tableData = this.sourceData.filter(
                    (x) => labels.length === 0 || labels.includes(x.date),
                );
            },
        },
        created() {
            this.tableData = this.sourceData.slice(0);
        },
    };
</script>
```

:::
