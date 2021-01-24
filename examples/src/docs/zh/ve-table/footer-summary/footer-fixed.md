:::anchor footer 跟随

:::demo 1、设置了 `maxHeight` 属性后，footer 汇总会固定显示。如果想让汇总信息跟随表格行数据，可以设置 `fixedFooter=false`

```html
<template>
  <ve-table
    border-y
    fixed-header
    :max-height="300"
    :columns="columns"
    :table-data="tableData"
    :footer-data="footerData"
    :fixed-footer="false"
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
            width: 200,
          },
          {
            field: "date",
            key: "b",
            title: "Date",
            align: "left",
          },
          {
            field: "hobby",
            key: "c",
            title: "Hobby",
            align: "center",
          },
          {
            field: "address",
            key: "d",
            title: "Address",
            align: "left",
            width: 200,
          },
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
```

:::
