:::anchor Row Click highlight

:::demo By default, line click highlight is on, Must set `row-key-field-name`

```html
<template>
  <div>
    <ve-table
      :row-style-option="rowStyleOption"
      :columns="columns"
      :table-data="tableData"
      row-key-field-name="rowKey"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        rowStyleOption: {
          clickHighlight: true,
        },
        columns: [
          {
            field: "",
            key: "a",
            title: "",
            width: 50,
            align: "center",
            renderBodyCell: ({ row, column, rowIndex }, h) => {
              return ++rowIndex;
            },
          },
          { field: "name", key: "b", title: "Name", width: 200, align: "left" },
          { field: "hobby", key: "c", title: "Hobby", width: 300, align: "left" },
          { field: "address", key: "d", title: "Address", width: "", align: "left" },
        ],
        tableData: [
          {
            rowKey: 1001,
            name: "John",
            date: "1900-05-20",
            hobby: "coding",
            address: "No.1 Century Avenue, Shanghai",
          },
          {
            rowKey: 1002,
            name: "Dickerson",
            date: "1910-06-20",
            hobby: "coding",
            address: "No.1 Century Avenue, Beijing",
          },
          {
            rowKey: 1003,
            name: "Larsen",
            date: "2000-07-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Chongqing",
          },
          {
            rowKey: 1004,
            name: "Geneva",
            date: "2010-08-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Xiamen",
          },
          {
            rowKey: 1005,
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
