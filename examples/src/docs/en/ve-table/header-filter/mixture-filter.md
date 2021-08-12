:::anchor Mixed Use

According to different business scenarios, it can be used arbitrarily
:::demo You can set the default selected item by `selected=true`

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
    // name fiter list
    const NAME_FILTER_LIST = [
        { value: 0, label: "John", selected: true },
        { value: 1, label: "Dickerson", selected: true },
        { value: 2, label: "Larsen", selected: false },
        { value: 3, label: "Geneva", selected: true },
        { value: 4, label: "Jami", selected: false },
    ];

    // date fiter list
    const Date_FILTER_LIST = [
        { value: 0, label: "1900-05-20", selected: false },
        { value: 1, label: "1910-06-20", selected: false },
        { value: 2, label: "2000-07-20", selected: false },
        { value: 3, label: "2010-08-20", selected: false },
        { value: 4, label: "2020-09-20", selected: false },
    ];

    export default {
        data() {
            return {
                // search data
                searchData: {
                    names: [],
                    date: "",
                },
                columns: [
                    {
                        field: "name",
                        key: "a",
                        title: "Name",
                        align: "left",
                        width: "15%",
                        // filter
                        filter: {
                            filterList: NAME_FILTER_LIST,
                            isMultiple: true,
                            // filter confirm hook
                            filterConfirm: (filterList) => {
                                const labels = filterList
                                    .filter((x) => x.selected)
                                    .map((x) => x.label);
                                this.searchData.names = labels;
                            },
                            // filter reset hook
                            filterReset: (filterList) => {
                                this.searchData.names = [];
                            },
                        },
                    },
                    {
                        field: "date",
                        key: "b",
                        title: "Date",
                        align: "left",
                        width: "15%",
                        // filter
                        filter: {
                            filterList: Date_FILTER_LIST,
                            // filter confirm hook
                            filterConfirm: (filterList) => {
                                const item = filterList.find((x) => x.selected);
                                this.searchData.date = item ? item.label : "";
                            },
                            // filter reset hook
                            filterReset: (filterList) => {
                                this.searchData.date = "";
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
        watch: {
            searchData: {
                handler: function () {
                    this.search();
                },
                immediate: true,
                deep: true,
            },
        },
        methods: {
            // search
            search() {
                const { names, date } = this.searchData;
                this.tableData = this.sourceData.filter(
                    (x) =>
                        (date === "" || date === x.date) &&
                        (names.length === 0 || names.includes(x.name)),
                );
            },
        },
        created() {
            // default search by names
            this.searchData.names = NAME_FILTER_LIST.filter((x) => x.selected).map((x) => x.label);
        },
    };
</script>
```

:::
