:::anchor 基础用法

:::demo

```html
<template>
  <ve-table
    :max-height="200"
    :columns="columns"
    :table-data="tableData"
    :cell-selection-option="cellSelectionOption"
    rowKeyFieldName="rowKey"
    :border-y="true"
  />
</template>

<script>
  export default {
    data() {
      return {
        cellSelectionOption: {
          // default true
          enable: true,
        },
        columns: [
          {
            field: "name",
            key: "a",
            title: "Name",
            align: "left",
            width: "20%",
          },
          {
            field: "date",
            key: "b",
            title: "Date",
            align: "left",
            width: "20%",
          },
          {
            field: "hobby",
            key: "c",
            title: "Hobby",
            align: "center",
            width: "30%",
          },
          { field: "address", key: "d", title: "Address", width: "30%" },
        ],
        tableData: [
          {
            name: "John",
            date: "1900-05-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Shanghai",
            rowKey: "1",
          },
          {
            name: "Dickerson",
            date: "1910-06-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Beijing",
            rowKey: "2",
          },
          {
            name: "Larsen",
            date: "2000-07-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Chongqing",
            rowKey: "3",
          },
          {
            name: "Geneva",
            date: "2010-08-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Xiamen",
            rowKey: "4",
          },
          {
            name: "Jami",
            date: "2020-09-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Shenzhen",
            rowKey: "5",
          },
        ],
      };
    },
  };
</script>
```

:::
