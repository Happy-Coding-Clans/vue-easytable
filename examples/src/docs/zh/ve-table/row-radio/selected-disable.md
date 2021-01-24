:::anchor 禁用选择

:::demo `disableSelectedRowKeys`设置需要禁止选中的 rowkey 数组（禁止勾选或者禁止取消勾选）。

```html
<template>
  <div>
    <ve-table
      style="width:100%"
      :columns="columns"
      :table-data="tableData"
      :radio-option="radioOption"
      row-key-field-name="rowKey"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        radioOption: {
          // 禁用的选择（禁止勾选或者禁止取消勾选）
          disableSelectedRowKeys: [1003, 1005],
          // 行选择改变事件
          selectedRowChange: ({ row }) => {
            console.log(row);
          },
        },
        columns: [
          {
            field: "",
            key: "a",
            // type=radio
            type: "radio",
            title: "",
            width: 50,
            align: "center",
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
