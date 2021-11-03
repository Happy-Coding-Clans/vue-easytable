:::anchor Row Index

After virtual scrolling is enabled, the row index can be returned through the server. If there are client queries in the table, we need to do some processing. See the following example for details

:::demo 1、`scrolling({ startRowIndex, visibleStartIndex, visibleEndIndex, visibleAboveCount, visibleBelowCount})` is triggered when scrolling. `startRowIndex` is the line number currently starting rendering,`visibleStartIndex`is the starting line number of the currently visible area,`visibleEndIndex` is the end line number of the currently visible area,`visibleAboveCount` is the number of renderings above the currently visible area, `visibleBelowCount` is the number of renderings below the currently visible area<br>2、Calculate the real sequence number of the current virtual scroll through the `scrolling` method combined with the `rowIndex` returned by the `renderbodycell ({row, column, rowindex}` method: `rowIndex + startRowIndex + 1`

```html
<template>
    <div>
        <el-input style="width:250px" v-model="searchValue" placeholder="search name"></el-input>
        <el-button type="primary" @click="search">Search</el-button>
        <br />
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
    import Mock from "mockjs";
    export default {
        data() {
            return {
                // search value
                searchValue: "",
                // start row index
                startRowIndex: 0,
                virtualScrollOption: {
                    // 是否开启
                    enable: true,
                    scrolling: this.scrolling,
                },
                // columns
                columns: [
                    {
                        field: "index",
                        key: "index",
                        title: "#",
                        width: 200,
                        align: "left",
                        renderBodyCell: this.renderRowIndex,
                    },
                    {
                        field: "name",
                        key: "name",
                        title: "Name",
                        width: 200,
                        align: "left",
                    },
                    {
                        field: "hobby",
                        key: "hobby",
                        title: "Hobby",
                        width: 300,
                        align: "left",
                    },
                    {
                        field: "address",
                        key: "address",
                        title: "Address",
                        width: "",
                        align: "left",
                    },
                ],
                // real table data
                tableData: [],
                // source data
                sourceData: [],
            };
        },
        methods: {
            // virtual scrolling
            scrolling({
                startRowIndex,
                visibleStartIndex,
                visibleEndIndex,
                visibleAboveCount,
                visibleBelowCount,
            }) {
                this.startRowIndex = startRowIndex;
                console.log("startRowIndex::", startRowIndex);
                console.log("visibleStartIndex::", visibleStartIndex);
                console.log("visibleEndIndex::", visibleEndIndex);
                console.log("visibleAboveCount::", visibleAboveCount);
                console.log("visibleBelowCount::", visibleBelowCount);
            },
            // render row index
            renderRowIndex({ row, column, rowIndex }) {
                return (
                    <span class="text-bold" style="color:#1890ff;">
                        {rowIndex + this.startRowIndex + 1}
                    </span>
                );
            },

            // search
            search() {
                const searchValue = this.searchValue;
                this.tableData = this.sourceData.filter(
                    (x) =>
                        !searchValue.length ||
                        x.name.toLowerCase().includes(searchValue.toLowerCase()),
                );
            },

            initData() {
                let data = [];
                for (let i = 0; i < 1000; i++) {
                    data.push({
                        rowKey: i,
                        name: Mock.Random.name(),
                        hobby: `hobby`,
                        address: `address`,
                    });
                }

                this.sourceData = data;
                this.tableData = this.sourceData.slice(0);
            },
        },
        created() {
            this.initData();
        },
    };
</script>
```

:::
