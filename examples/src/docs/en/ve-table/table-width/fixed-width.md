:::anchor Fixed Table Width

:::demo You can use pixel values to achieve a fixed width of the table. like `style="width:900px"`

```html
<template>
    <ve-table style="width:900px;" :columns="columns" :table-data="tableData" />
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    { field: "name", key: "a", title: "Name", width: 100 },
                    { field: "date", key: "b", title: "Tel", width: 200 },
                    { field: "hobby", key: "c", title: "Hobby", width: 300 },
                    { field: "address", key: "d", title: "Address", width: 300 },
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
