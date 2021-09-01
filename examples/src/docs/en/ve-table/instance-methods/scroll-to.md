:::anchor scrollTo

:::demo 1、Scroll the table to the specified location(px)<br>2、Params refer to [scrollTo](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollTo)

```html
<template>
    <div>
        <div style="margin-bottom:20px;line-height:3.0;">
            <button class="button-demo" @click="scrollY(1000)">Scroll vertically to 1000px</button>
            <button class="button-demo" @click="scrollY(500)">Scroll vertically to 500px</button>
            <button class="button-demo" @click="scrollY(0)">Scroll vertically to 0px</button>
            <button class="button-demo" @click="scrollX(500)">Scroll horizontally to 300px</button>
            <button class="button-demo" @click="scrollX(300)">Scroll horizontally to 200px</button>
            <button class="button-demo" @click="scrollX(0)">Scroll horizontally to 0px</button>
        </div>
        <ve-table
            ref="tableRef"
            style="width:1000px"
            :scroll-width="1600"
            :max-height="350"
            border-y
            :columns="columns"
            :table-data="tableData"
            rowKeyFieldName="rowkey"
        />
    </div>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    { field: "col1", key: "a", title: "Title1", fixed: "left" },
                    { field: "col2", key: "b", title: "Title2", fixed: "left" },
                    { field: "col3", key: "c", title: "Title3" },
                    { field: "col4", key: "d", title: "Title4" },
                    { field: "col5", key: "e", title: "Title5" },
                    { field: "col6", key: "f", title: "Title6" },
                    { field: "col7", key: "g", title: "Title7" },
                    { field: "col8", key: "h", title: "Title8" },
                    {
                        field: "col9",
                        key: "i",
                        title: "Title9",
                        fixed: "right",
                    },
                    {
                        field: "col10",
                        key: "j",
                        title: "Title10",
                        fixed: "right",
                    },
                ],
            };
        },
        methods: {
            initTableData() {
                let data = [];
                for (let i = 0; i < 80; i++) {
                    data.push({
                        rowkey: i,
                        col1: i,
                        col2: i,
                        col3: i,
                        col4: i,
                        col5: i,
                        col6: i,
                        col7: i,
                        col8: i,
                        col9: i,
                        col10: i,
                    });
                }
                this.tableData = data;
            },
            // scroll y
            scrollY(val) {
                this.$refs["tableRef"].scrollTo({ top: val, behavior: "smooth" });
            },
            // scroll x
            scrollX(val) {
                this.$refs["tableRef"].scrollTo({ left: val, behavior: "smooth" });
            },
        },
        created() {
            this.initTableData();
        },
    };
</script>
```

:::
