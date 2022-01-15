:::anchor Footer Width Virtual Scrolling

:::demo Virtual scrolling is set in the table, and footer supports it automatically without additional option

```html
<template>
    <div>
        <ve-table
            fixed-header
            :max-height="500"
            :virtual-scroll-option="virtualScrollOption"
            :columns="columns"
            :table-data="tableData"
            :footer-data="footerData"
            row-key-field-name="rowKey"
        />
    </div>
</template>

<script>
    export default {
        data() {
            return {
                virtualScrollOption: {
                    enable: true,
                },

                columns: [
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
            getRandom(min, max) {
                return Math.floor(Math.random() * (max - min) + min);
            },
            initData() {
                let data = [];
                for (let i = 0; i < 10000; i++) {
                    data.push({
                        rowKey: i,
                        name: i,
                        date: i,
                        hobby: i,
                        address: i,
                    });
                }

                this.tableData = data;

                this.footerData = [
                    {
                        rowKey: 0,
                        name: "Average Values",
                        date: 1100,
                        hobby: 1200,
                        address: 1300,
                    },
                    {
                        rowKey: 1,
                        name: "Summary Values",
                        date: 701000,
                        hobby: 801000,
                        address: 801000,
                    },
                ];
            },
        },
        created() {
            this.initData();
        },
    };
</script>
```

:::
