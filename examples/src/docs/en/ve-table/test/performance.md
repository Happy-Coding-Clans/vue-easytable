:::demo 基本用法

```html
<template>
    <div>
        <button @click="initData(100)">100条</button>
        &nbsp;
        <button @click="initData(1000)">1000条</button>
        &nbsp;
        <button @click="initData(3000)">3000条</button>
        &nbsp;
        <button @click="initData(10000)">10000条</button>
        &nbsp;
        <button @click="initData(100000)">100000条</button>
        &nbsp;
        <br />
        <br />
        <button @click="reRender">reRender</button>
        &nbsp;
        <button @click="unmount">unmount</button>
        &nbsp; {{msg}}
        <br />
        <br />

        <ve-table
            :scroll-width="1600"
            style="height:500px;"
            fixed-header
            :columns="columns"
            :table-data="tableData"
            :border-around="true"
            :border-x="true"
            :border-y="false"
        />
    </div>
</template>

<script>
    export default {
        data() {
            return {
                msg: "",
                tempData: [],
                tableData: [],
                columns: [
                    {
                        field: "col1",
                        key: "a",
                        title: "col1",
                        width: "10%",
                        fixed: "left",
                    },
                    { field: "col2", key: "b", title: "col2", width: "10%" },
                    { field: "col3", key: "c", title: "col3", width: "10%" },
                    { field: "col4", key: "d", title: "col4", width: "10%" },
                    { field: "col5", key: "e", title: "col5", width: "10%" },
                    { field: "col6", key: "f", title: "col6", width: "10%" },
                    { field: "col7", key: "g", title: "col7", width: "10%" },
                    { field: "col8", key: "h", title: "col8", width: "10%" },
                    { field: "col9", key: "i", title: "col9", width: "10%" },
                    { field: "col10", key: "j", title: "col10", width: "" },
                ],
            };
        },
        methods: {
            initData(count) {
                this.tempData = [];
                for (var i = 0; i < count; i++) {
                    let obj = {
                        col1: i,
                        col2: "2",
                        col3: "3",
                        col4: "4",
                        col5: "5",
                        col6: "6",
                        col7: "7",
                        col8: "8",
                        col9: "9",
                        col10: "10",
                    };
                    this.tempData.push(obj);
                }
            },

            reRender() {
                this.tableData = this.tempData.slice(0);

                let startTime = window.performance.now();
                setTimeout(() => {
                    this.msg =
                        "render took: " + (window.performance.now() - startTime).toFixed(2) + "ms";
                }, 0);
            },
            unmount() {
                this.tableData = this.tempData = [];
                let startTime = window.performance.now();
                setTimeout(() => {
                    this.msg =
                        "unmount took: " + (window.performance.now() - startTime).toFixed(2) + "ms";
                }, 0);
            },
        },
    };
</script>
```

:::
