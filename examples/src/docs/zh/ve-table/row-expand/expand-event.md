:::anchor 行展开事件

:::demo 允许在行展开切换前后做其他的处理<br>1、`beforeExpandRowChange`事件接收三个参数。`beforeExpandedRowKeys`:切换前，展开的数据 key 数组、`row`:当前行数据、`rowIndex`:行索引<br>2、`afterExpandRowChange`事件接收三个参数。`afterExpandedRowKeys`:切换后，展开的数据 key 数组、`row`:当前行数据、`rowIndex`:行索引

```html
<template>
    <ve-table
        style="width:100%"
        :columns="columns"
        :table-data="tableData"
        :expand-option="expandOption"
        row-key-field-name="rowKey"
    />
</template>

<script>
    export default {
        data() {
            return {
                expandOption: {
                    expandable: ({ row, column, rowIndex }) => {
                        if (row["rowKey"] === 1002) {
                            return false;
                        }
                    },
                    render: ({ row, column, rowIndex }, h) => {
                        return (
                            <p>
                                My name is{" "}
                                <span style="color:#1890ff;">{row.name}</span>
                                ,I'm living in {row.address}
                            </p>
                        );
                    },
                    beforeExpandRowChange: ({
                        beforeExpandedRowKeys,
                        row,
                        rowIndex,
                    }) => {
                        if (row["rowKey"] === 1001) {
                            alert("切换前的事件。返回false可中断展开切换");
                            return false;
                        }
                        return true;
                    },
                    afterExpandRowChange: ({
                        afterExpandedRowKeys,
                        row,
                        rowIndex,
                    }) => {
                        alert("切换后的事件");
                    },
                },
                columns: [
                    {
                        field: "",
                        key: "a",
                        // 设置需要显示展开图标的列
                        type: "expand",
                        title: "",
                        width: 50,
                        align: "center",
                    },
                    {
                        field: "name",
                        key: "b",
                        title: "Name",
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
                        rowKey: 1001,
                        name: "John",
                        date: "1900-05-20",
                        hobby: "coding",
                        address: "No.1 Century Avenue, Shanghai",
                    },
                    {
                        rowKey: 1002,
                        name: "Dickerson",
                        date: "1910-06-20",
                        hobby: "coding",
                        address: "No.1 Century Avenue, Beijing",
                    },
                    {
                        rowKey: 1003,
                        name: "Larsen",
                        date: "2000-07-20",
                        hobby: "coding and coding repeat",
                        address: "No.1 Century Avenue, Chongqing",
                    },
                    {
                        rowKey: 1004,
                        name: "Geneva",
                        date: "2010-08-20",
                        hobby: "coding and coding repeat",
                        address: "No.1 Century Avenue, Xiamen",
                    },
                    {
                        rowKey: 1005,
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
