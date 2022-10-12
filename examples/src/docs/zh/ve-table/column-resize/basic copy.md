:::anchor 列宽像素值

:::demo 1、

```html
<template>
    <ve-table
        :style="{'min-width':'502px','max-width':'800px','width':tableWidth+'px'}"
        :scroll-width="0"
        :columns="columns"
        :table-data="tableData"
        :border-around="true"
        :border-x="true"
        :border-y="true"
        :column-width-resize-option="columnWidthResizeOption"
    />
</template>

<script>
    export default {
        data() {
            return {
                tableWidth: 500,
                columnWidthResizeOption: {
                    minWidth: 150, //
                    sizeChange: ({ column, newWidth, differWidth }) => {
                        //
                        console.log("column::", column);
                        this.tableWidth += differWidth;
                    },
                },
                columns: [
                    {
                        field: "name",
                        key: "name",
                        title: "Name 400px",
                        width: 400,
                        // width: "30%",
                        fixed: "left",
                    },
                    {
                        field: "date",
                        key: "date",
                        title: "Date 200px",
                        width: 200,
                        // width: "20%",
                    },
                    // {
                    //     field: "hobby",
                    //     key: "c",
                    //     title: "Hobby 200px",
                    //     // width: 200,
                    //     width: "20%",
                    // },
                    // {
                    //     field: "address",
                    //     key: "d",
                    //     title: "Address 200px",
                    //     // width: 200,
                    // },
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
