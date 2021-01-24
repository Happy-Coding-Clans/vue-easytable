:::anchor Body Row Event Custom

:::demo

```html
<template>
  <div>
    Open F12 to view the console information
    <ve-table
      :columns="columns"
      :table-data="tableData"
      :eventCustomOption="eventCustomOption"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        eventCustomOption: {
          bodyRowEvents: ({ row, rowIndex }) => {
            return {
              click: (event) => {
                console.log("click::", row, rowIndex, event);
              },
              dblclick: (event) => {
                console.log("dblclick::", row, rowIndex, event);
              },
              contextmenu: (event) => {
                console.log("contextmenu::", row, rowIndex, event);
              },
              mouseenter: (event) => {
                console.log("mouseenter::", row, rowIndex, event);
              },
              mouseleave: (event) => {
                console.log("mouseleave::", row, rowIndex, event);
              },
            };
          },
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
          {
            field: "name",
            key: "b",
            title: "Name",
            width: 200,
            align: "left",
          },
          {
            field: "hobby",
            key: "c",
            title: "Hobby",
            width: 300,
            align: "left",
          },
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
