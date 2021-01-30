:::anchor Footer Cell Style

:::demo 1、The callback function `footerCellClass({ row, column, rowIndex })` receives 3 parameters,row：Current row data、column:Current column configuration、rowIndex:Row index<br>2、Returns the qualified cells to the specified class name,class name is custom<br>3、If you need to set the background color or font color to cells, you need to add `!important`

```html
<template>
  <ve-table
    border-y
    fixed-header
    :max-height="300"
    :columns="columns"
    :table-data="tableData"
    :footer-data="footerData"
    :cell-style-option="cellStyleOption"
    rowKeyFieldName="rowkey"
  />
</template>

<style>
  .table-footer-cell-class1 {
    background: #91d5ff !important;
    color: #fff !important;
  }

  .table-footer-cell-class2 {
    background: orange !important;
    color: #fff !important;
  }
</style>

<script>
  export default {
    data() {
      return {
        cellStyleOption: {
          footerCellClass: ({ row, column, rowIndex }) => {
            if (column.field === "address") {
              return "table-footer-cell-class1";
            }

            if (column.field === "date" && rowIndex === 1) {
              return "table-footer-cell-class2";
            }
          },
        },
        columns: [
          { field: "name", key: "a", title: "Name", align: "left" },
          { field: "date", key: "b", title: "Date", align: "left" },
          { field: "hobby", key: "c", title: "Hobby", align: "left" },
          { field: "address", key: "d", title: "Address", width: "", align: "left" },
        ],
        tableData: [],
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
