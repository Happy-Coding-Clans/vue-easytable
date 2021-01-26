:::anchor 触发方式

:::demo 1、`trigger`属性控制展开行事件触发类型。<br />2、`"icon"`：点击展开小图标；`"cell"`：点击单元格;`"row"`:点击行

```html
<template>
  <ve-table
    style="width:100%"
    :columns="columns"
    :table-data="tableData"
    :expand-option="expandOption"
    row-key-field-name="rowKey"
  />
</template>

<script>
  export default {
    data() {
      return {
        expandOption: {
          trigger: "row",
          render: ({ row, column, rowIndex }, h) => {
            return (
              <p>
                My name is <span style="color:#1890ff;">{row.name}</span>,I'm living in{" "}
                {row.address}
              </p>
            );
          },
        },
        columns: [
          {
            field: "",
            key: "a",
            // 设置需要显示展开图标的列
            type: "expand",
            title: "",
            width: 50,
            align: "center",
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
