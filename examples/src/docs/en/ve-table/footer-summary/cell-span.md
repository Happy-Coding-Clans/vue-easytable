:::anchor Footer Column Span

:::demo Set the `date` column and `hoby` column in the first row of footer summary to merge. At the same time, you need to specify that the `hoby` column in the second row will not be rendered

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
    :cellSpanOption="cellSpanOption"
  />
</template>

<script>
  export default {
    data() {
      return {
        cellSpanOption: {
          footerCellSpan: this.footerCellSpan,
        },
        columns: [
          {
            field: "name",
            key: "a",
            title: "Name",
            width: 200,
            align: "center",
          },
          { field: "date", key: "b", title: "Date", width: 200, align: "left" },
          {
            field: "hobby",
            key: "c",
            title: "Hobby",
            width: 200,
            align: "right",
          },
          { field: "address", key: "d", title: "Address", width: "" },
        ],
        tableData: [
          {
            name: "John",
            date: "1900-05-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Shanghai",
          },
          {
            name: "Dickerson",
            date: "1910-06-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Beijing",
          },
          {
            name: "Larsen",
            date: "2000-07-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Chongqing",
          },
          {
            name: "Geneva",
            date: "2010-08-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Xiamen",
          },
          {
            name: "Jami",
            date: "2020-09-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Shenzhen",
          },
        ],
      };
    },
    methods: {
      // footer cell span
      footerCellSpan({ row, column, rowIndex }) {
        if (rowIndex === 0) {
          if (column.field === "date") {
            return {
              rowspan: 1,
              colspan: 2,
            };
          }
          // does not need to be rendered
          else if (column.field === "hobby") {
            return {
              rowspan: 0,
              colspan: 0,
            };
          }
        }
      },
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
