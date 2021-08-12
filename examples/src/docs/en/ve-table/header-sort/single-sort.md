:::anchor Single field sorting

:::demo 1、The default is single field sorting<br>2、`sortChange(params)`callback function receives the collation of the column

```html
<template>
    <ve-table :columns="columns" :table-data="tableData" :sort-option="sortOption" />
</template>

<script>
    export default {
        data() {
            return {
                sortOption: {
                    sortChange: (params) => {
                        console.log("sortChange::", params);
                        this.sortChange(params);
                    },
                },
                columns: [
                    { field: "name", key: "a", title: "Name", align: "left" },
                    {
                        field: "age",
                        key: "b",
                        title: "Age",
                        align: "center",
                        sortBy: "",
                    },
                    {
                        field: "weight",
                        key: "c",
                        title: "Weight(kg)",
                        align: "center",
                        sortBy: "asc",
                    },
                    {
                        field: "hobby",
                        key: "d",
                        title: "Hobby",
                        align: "center",
                    },
                    {
                        field: "address",
                        key: "e",
                        title: "Address",
                        align: "left",
                    },
                ],
                tableData: [
                    {
                        name: "John",
                        age: 25,
                        weight: 66,
                        hobby: "coding and coding repeat",
                        address: "No.1 Century Avenue, Shanghai",
                    },
                    {
                        name: "Dickerson",
                        age: 20,
                        weight: 70,
                        hobby: "coding and coding repeat",
                        address: "No.1 Century Avenue, Beijing",
                    },
                    {
                        name: "Larsen",
                        age: 18,
                        weight: 65,
                        hobby: "coding and coding repeat",
                        address: "No.1 Century Avenue, Chongqing",
                    },
                    {
                        name: "Geneva",
                        age: 17,
                        weight: 80,
                        hobby: "coding and coding repeat",
                        address: "No.1 Century Avenue, Xiamen",
                    },
                    {
                        name: "Jami",
                        age: 26,
                        weight: 72,
                        hobby: "coding and coding repeat",
                        address: "No.1 Century Avenue, Shenzhen",
                    },
                ],
            };
        },
        methods: {
            sortChange(params) {
                this.tableData.sort((a, b) => {
                    if (params.age) {
                        if (params.age === "asc") {
                            return a.age - b.age;
                        } else if (params.age === "desc") {
                            return b.age - a.age;
                        } else {
                            return 0;
                        }
                    } else if (params.weight) {
                        if (params.weight === "asc") {
                            return a.weight - b.weight;
                        } else if (params.weight === "desc") {
                            return b.weight - a.weight;
                        } else {
                            return 0;
                        }
                    }
                });
            },
        },
    };
</script>
```

:::
