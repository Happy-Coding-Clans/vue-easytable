:::anchor 列宽像素值

:::demo 1、当列宽设置素值（px），单元格宽度按照像素比缩放。如果不希望缩放，需要设置外层容器宽度<br>2、设置像素值，记得不要加单位

```html
<template>
    <ve-table
        style="width:802px"
        :scroll-width="910"
        :columns="columns"
        :table-data="tableData"
        :border-around="true"
        :border-x="true"
        :border-y="true"
        column-width-resize-option="columnWidthResizeOption"
    />
</template>

<script>
    export default {
        data() {
            return {
                columnWidthResizeOption: {
                    minWidth: 50, //
                    sizeChange: ({ column, width }) => {
                        //
                    },
                },
                columns: [
                    {
                        field: "name",
                        key: "a",
                        title: "Name 400px",
                        // width: 400,
                        width: "30%",
                    },
                    {
                        field: "date",
                        key: "date",
                        title: "Date 200px",
                        // width: 200,
                        width: "20%",
                    },
                    {
                        field: "hobby",
                        key: "c",
                        title: "Hobby 200px",
                        // width: 200,
                        width: "20%",
                    },
                    {
                        field: "address",
                        key: "d",
                        title: "Address 200px",
                        // width: 200,
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
