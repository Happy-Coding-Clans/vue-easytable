:::anchor 表头单元格样式

:::demo 1、回调函数`headerCellClass({ column, rowIndex })`接收 2 个参数，column：当前列配置、rowIndex：表头行索引<br>2、将符合条件的单元格返回指定的 class 名称。class 名称自定义<br>3、如果需要给单元格设置背景色或字体颜色需要加上`!important`

```html
<template>
  <ve-table :columns="columns" :table-data="tableData" :cell-style-option="cellStyleOption" />
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
          { field: "address", key: "d", title: "Address", width: "", align: "left" },
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
