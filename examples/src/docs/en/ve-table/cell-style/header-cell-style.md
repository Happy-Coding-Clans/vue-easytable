:::anchor Table header cell style

:::demo 1、The callback function `headerCellClass({ column, rowIndex })`receives two parameters,column：Current column configuration、rowIndex：header row index<br>2、Returns the qualified cells to the specified class name,The class name is custom<br>3、If you need to set the background color or font color to cells, you need to add `!important`

```html
<template>
  <ve-table
    :columns="columns"
    :table-data="tableData"
    :cell-style-option="cellStyleOption"
  />
</template>

<style>
  .table-header-cell-class {
    background: orange !important;
    color: #fff !important;
  }
</style>

<script>
  export default {
    data() {
      return {
        cellStyleOption: {
          headerCellClass: ({ column, rowIndex }) => {
            if (column.field === "hobby") {
              return "table-header-cell-class";
            }
          },
        },
        columns: [
          { field: "name", key: "a", title: "Name", align: "left" },
          { field: "date", key: "b", title: "Date", align: "left" },
          { field: "hobby", key: "c", title: "Hobby", align: "left" },
          {
            field: "address",
            key: "d",
            title: "Address",
            width: "",
            align: "left",
          },
        ],
        tableData: [
          {
            name: "John",
            date: "1900-05-20",
            hobby: "coding",
            address: "No.1 Century Avenue, Shanghai",
          },
          {
            name: "Dickerson",
            date: "1910-06-20",
            hobby: "coding",
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
  };
</script>
```

:::
