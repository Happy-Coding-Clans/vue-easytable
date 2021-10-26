:::anchor 多行省略

此功能目前只支持 [-webkit-line-clamp 属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/-webkit-line-clamp) 的浏览器
:::demo 通过 `lineClamp`设置超过多少行省略

```html
<template>
    <ve-table
        rowKeyFieldName="rowKey"
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
                        ellipsis: {
                            showTitle: true,
                            lineClamp: 2,
                        },
                    },
                ],
                // table data
                tableData: [
                    {
                        name: "John",
                        date: "1900-05-20",
                        hobby: "coding and coding repeat",
                        address:
                            "No.1 Century Avenue, Shanghai,this is a long text,this is a long text,this is a long text,this is a long text,this is a long text,this is a long text",
                        rowKey: 0,
                    },
                    {
                        name: "Dickerson",
                        date: "1910-06-20",
                        hobby: "coding and coding repeat",
                        address:
                            "No.1 Century Avenue, Beijing,this is a long text,this is a long text,this is a long text,this is a long text",
                        rowKey: 1,
                    },
                    {
                        name: "Larsen",
                        date: "2000-07-20",
                        hobby: "coding and coding repeat",
                        address:
                            "No.1 Century Avenue, Chongqing,this is a long text,this is a long text,this is a long text,this is a long text,this is a long text,this is a long text,this is a long text,this is a long text",
                        rowKey: 2,
                    },
                    {
                        name: "Geneva",
                        date: "2010-08-20",
                        hobby: "coding and coding repeat",
                        address:
                            "No.1 Century Avenue, Xiamen,this is a long text,this is a long text",
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
        methods: {},
    };
</script>
```

:::
