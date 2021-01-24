:::anchor Body Column Span

:::demo Set the `date` and `hoby` columns in the second row to merge.At the same time, you need to specify that the `hoby` column in the second row will not be rendered

```html
<template>
  <ve-table
    :columns="columns"
    :table-data="tableData"
    :border-around="true"
    :border-x="true"
    :border-y="true"
    :cellSpanOption="cellSpanOption"
  />
</template>

<script>
  export default {
    data() {
      return {
        cellSpanOption: {
          bodyCellSpan: this.bodyCellSpan,
        },
        columns: [
          {
            field: "name",
            key: "a",
            title: "Name",
            width: 200,
            align: "center",
          },
          {
            field: "date",
            key: "b",
            title: "Date",
            width: 200,
            align: "left",
          },
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
      // body cell span
      bodyCellSpan({ row, column, rowIndex }) {
        if (rowIndex === 1) {
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
    },
  };
</script>
```

:::
