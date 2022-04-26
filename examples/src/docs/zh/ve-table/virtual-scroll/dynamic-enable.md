:::anchor 动态开启或关闭虚拟滚动

如果你存在动态开启或者关闭虚拟滚动的需求，那么只需要修改`virtualScrollOption.enable`即可。F12 查看渲染结果

:::demo

```html
<template>
    <div>
        <el-button @click="switchVirtual(1)">开启虚拟滚动</el-button>
        <el-button @click="switchVirtual(0)">禁用虚拟滚动</el-button>
        <br />
        <br />
        <div>虚拟滚动状态：{{ virtualScrollOption.enable ? "已开启" : "已禁用" }}</div>
        <br />
        <ve-table
            :max-height="500"
            :virtual-scroll-option="virtualScrollOption"
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
                    enable: false,
                },
                columns: [
                    {
                        field: "index",
                        key: "a",
                        title: "#",
                        width: 100,
                        align: "left",
                    },
                    {
                        field: "name",
                        key: "b",
                        title: "Name",
                        width: 200,
                        align: "left",
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
            // switch virtual scroll
            switchVirtual(enable) {
                this.virtualScrollOption.enable = enable ? true : false;
            },
            // createTableData
            createTableData() {
                let data = [];
                for (let i = 0; i < 100; i++) {
                    data.push({
                        rowKey: i,
                        index: i,
                        name: `name${i}`,
                        hobby: `hobby${i}`,
                        address: `address${i}`,
                    });
                }

                this.tableData = data;
            },
        },

        mounted() {
            this.createTableData();
        },
    };
</script>
```

:::
