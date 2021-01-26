:::anchor footer 汇总自定义单元格

:::demo 1、column 配置中，支持通过属性 `renderFooterCell` 传入渲染函数，与 body 自定义单元格用法一致。<br>2、渲染函数接收三个参数，row:当前行数据、column:当前列配置、rowIndex:行索引

```html
<template>
  <ve-table
    border-y
    fixed-header
    :max-height="300"
    :columns="columns"
    :table-data="tableData"
    :footer-data="footerData"
    rowKeyFieldName="rowkey"
  />
</template>

<script>
  export default {
    data() {
      return {
        columns: [
          {
            field: "name",
            key: "a",
            title: "Name",
            align: "center",
            renderFooterCell: ({ row, column, rowIndex }, h) => {
              return (
                <span class="text-bold" style="">
                  {row.name}
                </span>
              );
            },
          },
          { field: "date", key: "b", title: "Date", align: "left" },
          { field: "hobby", key: "c", title: "Hobby", align: "center" },
          { field: "address", key: "d", title: "Address", align: "left" },
        ],
        tableData: [],
        footerData: [],
      };
    },
    methods: {
      initTableData() {
        let data = [];
        for (let i = 0; i < 15; i++) {
          data.push({
            rowkey: i,
            name: i,
            date: i,
            hobby: i,
            address: i,
          });
        }
        this.tableData = data;
      },

      initFooterData() {
        this.footerData = [
          {
            rowkey: 0,
            name: "平均值",
            date: 213,
            hobby: 355,
            address: 189,
          },
          {
            rowkey: 1,
            name: "汇总值",
            date: 1780,
            hobby: 890,
            address: 2988,
          },
        ];
      },
    },
    created() {
      this.initTableData();
      this.initFooterData();
    },
  };
</script>

<style>
  .text-bold {
    font-weight: bold;
  }
</style>
```

:::
