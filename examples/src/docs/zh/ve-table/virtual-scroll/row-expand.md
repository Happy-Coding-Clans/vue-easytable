:::anchor 结合行展开

:::demo 行展开，要指定属性`rowKeyFieldName`

```html
<template>
    <div>
        <ve-table
            fixed-header
            :max-height="500"
            :virtual-scroll-option="virtualScrollOption"
            :expand-option="expandOption"
            :columns="columns"
            :table-data="tableData"
            row-key-field-name="rowKey"
        />
    </div>
</template>

<script>
    // 此示例是在组件内部定义了一个子组件。你当然也可以通过 `import`关键字导入一个组件
    const ChildTableComp = {
        name: "ChildTableComp",
        template: `
        <div class="child-table-comp">
            <span style="font-weight:bold;">Table Name:{{row.name}}</span>
            <ve-table
              :max-height="100"
              :fixed-header="false"
              style="width:100%"
              :columns="columns"
              :table-data="tableData"
              :virtual-scroll-option="{
                  enable: false,
              }"
            />
        </div>
    `,
        props: {
            row: Object,
        },
        data() {
            return {
                columns: [
                    { field: "col1", key: "a", title: "Col1" },
                    { field: "col2", key: "b", title: "Col2" },
                    { field: "col3", key: "c", title: "Col3" },
                    { field: "col4", key: "d", title: "Col4" },
                    { field: "col5", key: "e", title: "Col5" },
                ],
                tableData: [
                    {
                        col1: "1",
                        col2: "2",
                        col3: "3",
                        col4: "4",
                        col5: "5",
                    },
                    {
                        col1: "1",
                        col2: "2",
                        col3: "3",
                        col4: "4",
                        col5: "5",
                    },
                    {
                        col1: "1",
                        col2: "2",
                        col3: "3",
                        col4: "4",
                        col5: "5",
                    },
                    {
                        col1: "1",
                        col2: "2",
                        col3: "3",
                        col4: "4",
                        col5: "5",
                    },
                ],
            };
        },
    };

    export default {
        data() {
            return {
                virtualScrollOption: {
                    // 是否开启
                    enable: true,
                },
                expandOption: {
                    defaultExpandedRowKeys: [2],
                    render: ({ row, column, rowIndex }, h) => {
                        return (
                            <div>
                                111
                                <ChildTableComp row={row} />
                            </div>
                        );
                    },
                },

                columns: [
                    {
                        field: "",
                        key: "a",
                        // type=expand
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
                        align: "left",
                        renderBodyCell: ({ row }, h) => {
                            return <span domPropsInnerHTML={row.name}></span>;
                        },
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
                tableData: [],
            };
        },
        methods: {
            initData() {
                let data = [];
                for (let i = 0; i < 10000; i++) {
                    data.push({
                        rowKey: i,
                        name: `name${i}`,
                        hobby: `hobby${i}`,
                        address: `address${i}`,
                    });
                }

                this.tableData = data;
            },
        },
        created() {
            this.initData();
        },
    };
</script>
```

:::
