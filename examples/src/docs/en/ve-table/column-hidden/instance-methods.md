:::anchor Instance methods

:::demo 1、Hide columns through instance method `hideColumnsByKeys(keys)` <br>2、Show hidden columns through instance method `showColumnsByKeys(keys)`

```html
<template>
    <div>
        <button class="button-demo" @click="hideColumns(['col1'])">Hide col1</button>
        <button class="button-demo" @click="hideColumns(['col2'])">Hide col2</button>
        <button class="button-demo" @click="hideColumns(['col3'])">Hide col3</button>
        <button class="button-demo" @click="hideColumns(['col1','col2','col3'])">
            Hide col1、col2、col3
        </button>
        <br />
        <br />
        <button class="button-demo" @click="showColumns(['col1'])">Show col1</button>
        <button class="button-demo" @click="showColumns(['col2'])">Show col2</button>
        <button class="button-demo" @click="showColumns(['col3'])">Show col3</button>
        <button class="button-demo" @click="showColumns(['col1','col2','col3'])">
            Show col1、col2、col3
        </button>
        <br />
        <br />
        <ve-table
            ref="tableRef"
            border-y
            :columns="columns"
            :table-data="tableData"
            :columnHiddenOption="columnHiddenOption"
        />
    </div>
</template>

<script>
    export default {
        data() {
            return {
                columnHiddenOption: {
                    // default hidden column keys
                    defaultHiddenColumnKeys: ["col8"],
                },
                columns: [
                    { field: "col1", key: "col1", title: "col1", width: "10%" },
                    {
                        title: "col2-col3",
                        children: [
                            {
                                field: "col2",
                                key: "col2",
                                title: "col2",
                                width: 100,
                            },
                            {
                                field: "col3",
                                key: "col3",
                                title: "col3",
                                width: 110,
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
                    { field: "col7", key: "col7", title: "col7", width: 150 },
                    { field: "col8", key: "col8", title: "col8", width: 160 },
                ],
                tableData: [],
            };
        },
        methods: {
            // hidden columns
            hideColumns(keys) {
                this.$refs["tableRef"].hideColumnsByKeys(keys);
            },
            // show cloumns
            showColumns(keys) {
                this.$refs["tableRef"].showColumnsByKeys(keys);
            },
            initTableData() {
                let data = [];
                for (let i = 0; i < 3; i++) {
                    data.push({
                        rowKey: i,
                        col1: "col1-" + i,
                        col2: "col2-" + i,
                        col3: "col3-" + i,
                        col4: "col4-" + i,
                        col5: "col5-" + i,
                        col6: "col6-" + i,
                        col7: "col7-" + i,
                        col8: "col8-" + i,
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
