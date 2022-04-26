:::anchor Dynamically turns virtual scrolling on or off

If you have the need to dynamically turn virtual scrolling on or off,Then you only need to modify the value of `virtualScrollOption.enable`. F12 view rendering results

:::demo

```html
<template>
    <div>
        <el-button @click="switchVirtual(1)">Enable virtual scroll</el-button>
        <el-button @click="switchVirtual(0)">Disable virtual scroll</el-button>
        <br />
        <br />
        <div>virtual scroll state：{{ virtualScrollOption.enable ? "Enable" : "Disabled" }}</div>
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
