:::anchor 示例

你可以配合以下按键快速选中单元格：<br>
1、当按下方向上键<code>ArrowUp</code>，选中上一个单元格；<br>
2、当按下方向下键<code>ArrowDown</code>，选中下一个单元格；<br>
3、当按下方向右键<code>ArrowRight</code>，选中同一行下一个单元格，如果是同一行最后一个单元格时将选中下一行第一个单元格；<br>
4、当按下方向左键<code>ArrowLeft</code>，选中同一行前一个单元格，如果是同一行第一个单元格时将选中上一行最后一个单元格；<br>
5、当按下键<code>Tab</code>，功能与按下<code>ArrowRight</code>一致；<br>
6、当按下键<code>Shift + Tab</code>，功能与按下<code>ArrowLeft</code>一致；

:::demo

```html
<template>
    <ve-table
        fixed-header
        :scroll-width="1600"
        :max-height="380"
        border-y
        :columns="columns"
        :table-data="tableData"
        rowKeyFieldName="rowKey"
    />
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        field: "col1",
                        key: "a",
                        title: "col1",
                        width: 50,
                        fixed: "left",
                    },
                    {
                        title: "col2-col3",
                        fixed: "left",
                        children: [
                            {
                                field: "col2",
                                key: "b",
                                title: "col2",
                                width: 50,
                            },
                            {
                                field: "col3",
                                key: "c",
                                title: "col3",
                                width: 50,
                            },
                        ],
                    },
                    {
                        title: "col4-col5-col6",
                        children: [
                            {
                                title: "col4-col5",
                                children: [
                                    {
                                        field: "col4",
                                        key: "d",
                                        title: "col4",
                                        width: 130,
                                    },
                                    {
                                        field: "col5",
                                        key: "e",
                                        title: "col5",
                                        width: 140,
                                    },
                                ],
                            },
                            {
                                title: "col6",
                                field: "col6",
                                key: "f",
                                width: 140,
                            },
                        ],
                    },
                    {
                        title: "col7",
                        fixed: "right",
                        children: [
                            {
                                title: "col7-1",
                                field: "col7",
                                key: "g",
                                width: 50,
                            },
                        ],
                    },
                    {
                        field: "col8",
                        key: "h",
                        title: "col8",
                        width: 50,
                        fixed: "right",
                    },
                ],
                tableData: [],
            };
        },
        methods: {
            initTableData() {
                let data = [];
                for (let i = 0; i < 10; i++) {
                    data.push({
                        rowKey: i,
                        col1: i,
                        col2: i,
                        col3: i,
                        col4: i,
                        col5: i,
                        col6: i,
                        col7: i,
                        col8: i,
                    });
                }
                this.tableData = data;
            },
        },
        created() {
            this.initTableData();
        },
    };
</script>
```

:::
