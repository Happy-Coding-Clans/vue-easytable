:::anchor Customization through external components

:::tip

1、 Of course, you can also customize the cell content through external components,This example defines an `OtherComp` component inside the component,You can also use the `import` keyword to import a component as a custom component<br>
2、`renderBodyCell`、`renderHeaderCell`, etc. are also applicable
:::

:::demo Customization through external components

```html
<template>
    <ve-table style="width:100%" border-y :columns="columns" :table-data="tableData" />
</template>

<script>
    // 此示例是在组件内部定义了一个子组件。你当然也可以通过 `import`关键字导入一个组件
    const OtherComp = {
        name: "OtherComp",
        template: `
        <div class="other-comp">
            <span style="color:#1890ff;">row index: {{rowIndex}}</span>
        </div>
    `,
        props: {
            row: Object,
            column: Object,
            rowIndex: Number,
        },
    };

    export default {
        data() {
            return {
                columns: [
                    {
                        field: "",
                        key: "a",
                        title: "Row Number",
                        width: 200,
                        align: "center",
                        renderBodyCell: ({ row, column, rowIndex }, h) => {
                            return <OtherComp row={row} column={column} rowIndex={rowIndex} />;
                        },
                    },
                    {
                        field: "date",
                        key: "b",
                        title: "Date",
                        width: 200,
                        align: "center",
                    },
                    {
                        field: "hobby",
                        key: "c",
                        title: "Hobby",
                        width: 300,
                        align: "left",
                    },
                    {
                        field: "address",
                        key: "d",
                        title: "Address",
                        width: "",
                        align: "left",
                    },
                ],
                tableData: [
                    {
                        name: "John",
                        date: "1900-05-20",
                        hobby: "coding",
                        address: "No.1 Century Avenue, Shanghai",
                    },
                    {
                        name: "Dickerson",
                        date: "1910-06-20",
                        hobby: "coding",
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
            editRow(rowIndex) {
                alert(`eidt row number:${rowIndex}`);
            },
            deleteRow(rowIndex) {
                this.tableData.splice(rowIndex, 1);
            },
        },
    };
</script>

<style>
    .text-bold {
        font-weight: bold;
    }
</style>
```

:::
