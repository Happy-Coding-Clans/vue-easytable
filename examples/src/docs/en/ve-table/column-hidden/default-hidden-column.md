:::anchor Default Hidden Columns

The following example hides the hobby and name columns by default

:::demo Set the default hidden columns through the `defaultHiddenColumnKeys` property

```html
<template>
    <ve-table :columns="columns" :table-data="tableData" :columnHiddenOption="columnHiddenOption" />
</template>

<script>
    export default {
        data() {
            return {
                columnHiddenOption: {
                    // default hidden column keys
                    defaultHiddenColumnKeys: ["hobby", "name"],
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
    };
</script>
```

:::
