:::anchor ‘容器自适应’列固定

:::demo 1、通过`scroll-width="1600"`设置滚动区域宽度<br>2、不设置外层容器宽度。等同于设置`style="width:100%"`<br>3、改变浏览器宽度试试看。当容器宽度小于`scroll-width`时，出滚动条；大于`scroll-width`时，将会跟随容器自适应

```html
<template>
  <ve-table
    :scroll-width="1600"
    border-y
    :columns="columns"
    :table-data="tableData"
    rowKeyFieldName="rowkey"
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
            title: "Title1",
            fixed: "left",
          },
          {
            field: "col2",
            key: "b",
            title: "Title2",
            fixed: "left",
          },
          {
            field: "col3",
            key: "c",
            title: "Title3",
          },
          { field: "col4", key: "d", title: "Title4" },
          { field: "col5", key: "e", title: "Title5" },
          { field: "col6", key: "f", title: "Title6" },
          {
            field: "col7",
            key: "g",
            title: "Title7",
          },
          {
            field: "col8",
            key: "h",
            title: "Title8",
          },
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
        for (let i = 0; i < 10; i++) {
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
    },
    created() {
      this.initTableData();
    },
  };
</script>
```

:::
