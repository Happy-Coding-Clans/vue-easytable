:::anchor Ranking Example

:::demo

```html
<template>
  <div>
    <ve-table :columns="columns" :table-data="tableData" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        columns: [
          {
            field: "",
            key: "a",
            title: "Ranking",
            width: 50,
            align: "center",
            renderBodyCell: ({ row, column, rowIndex }, h) => {
              let color;

              if (rowIndex === 0) {
                color = "#ffcc00";
              } else if (rowIndex === 1) {
                color = "#d9d9d9";
              } else if (rowIndex === 2) {
                color = "#ad6800";
              }

              if (color) {
                const props = {
                  style: { color: color },
                  class: "iconfont icon-jiangpai",
                };
                return <i {...props} />;
              }
              return ++rowIndex;
            },
          },
          { field: "name", key: "b", title: "Name", width: 200, align: "left" },
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
