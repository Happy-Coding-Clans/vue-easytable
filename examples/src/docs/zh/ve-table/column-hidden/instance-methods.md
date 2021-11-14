:::anchor 基础

:::demo

```html
<template>
    <div>
        <button @click="hideColumns(['name'])">隐藏 name 列</button>
        <button @click="hideColumns(['hobby'])">隐藏 hobby 列</button>
        <button @click="hideColumns(['name','hobby'])">隐藏 name 和 hobby 列</button>
        <button @click="showColumns(['name'])">显示 name 列</button>
        <button @click="showColumns(['hobby'])">显示 hobby 列</button>
        <button @click="showColumns(['name','hobby'])">显示 name 和 hobby 列</button>
        <ve-table
            ref="tableRef"
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
                    defaultHiddenColumnKeys: ["hobby"],
                },
                columns: [
                    { field: "name", key: "name", title: "Name" },
                    { field: "date", key: "date", title: "Date" },
                    { field: "hobby", key: "hobby", title: "Hobby" },
                    { field: "address", key: "address", title: "Address" },
                ],
                tableData: [
                    {
                        name: "John",
                        date: "1900-05-20",
                        hobby: "coding and coding repeat",
                        address: "No.1 Century Avenue, Shanghai",
                    },
                    {
                        name: "Dickerson",
                        date: "1910-06-20",
                        hobby: "coding and coding repeat",
                        address: "No.1 Century Avenue, Beijing",
                    },
                    {
                        name: "Larsen",
                        date: "2000-07-20",
                        hobby: "coding and coding repeat",
                        address: "No.1 Century Avenue, Chongqing",
                    },
                    {
                        name: "Geneva",
                        date: "2010-08-20",
                        hobby: "coding and coding repeat",
                        address: "No.1 Century Avenue, Xiamen",
                    },
                    {
                        name: "Jami",
                        date: "2020-09-20",
                        hobby: "coding and coding repeat",
                        address: "No.1 Century Avenue, Shenzhen",
                    },
                ],
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
        },
    };
</script>
```

:::
