:::anchor Combination Row Expand

:::demo Row expand, Need specify `rowKeyFieldName` property

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
    export default {
        data() {
            return {
                virtualScrollOption: {
                    // 是否开启
                    enable: true,
                },
                expandOption: {
                    render: ({ row, column, rowIndex }, h) => {
                        return (
                            <p>
                                My name is <span style="color:#1890ff;">{row.name}</span>
                                ,I'm living in {row.address}
                            </p>
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
