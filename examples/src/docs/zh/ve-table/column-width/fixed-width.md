:::anchor 表格宽度固定

:::demo 表格的固定宽度，需要设置外层容器宽度。可以通过`style="width:900px"`方式设置。此处容器宽度为 900px

```html
<template>
    <ve-table
        style="width:900px"
        :columns="columns"
        :table-data="tableData"
        :border-around="true"
        :border-x="true"
        :border-y="true"
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
                        title: "Name 100px",
                        width: 100,
                    },
                    { field: "date", key: "b", title: "Tel 200px", width: 200 },
                    {
                        field: "hobby",
                        key: "c",
                        title: "Hobby 300px",
                        width: 300,
                    },
                    {
                        field: "address",
                        key: "d",
                        title: "Address 300px",
                        width: 300,
                    },
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
