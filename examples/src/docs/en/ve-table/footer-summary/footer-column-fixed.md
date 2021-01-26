:::anchor Footer Columns fixed

:::demo Fixed columns are set in the table, which is automatically supported by footer without additional configuration

```html
<template>
  <ve-table
    border-y
    fixed-header
    :max-height="300"
    style="width:900px"
    :scroll-width="1200"
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
            fixed: "left",
            width: 200,
          },
          { field: "date", key: "b", title: "Date", align: "left" },
          { field: "hobby", key: "c", title: "Hobby", align: "center" },
          {
            field: "address",
            key: "d",
            title: "Address",
            align: "left",
            fixed: "right",
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
            name: "Average Values",
            date: 213,
            hobby: 355,
            address: 189,
          },
          {
            rowkey: 1,
            name: "Summary Values",
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
