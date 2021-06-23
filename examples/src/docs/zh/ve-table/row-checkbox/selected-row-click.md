:::anchor 行点击触发选中

此示例为行点击触发选中，你也可以通过“事件自定义”实现列点击选中效果
:::demo 可控属性结合“事件自定义”，即可实现点击行触发选中效果

```html
<template>
  <div>
    <ve-table
      style="width:100%"
      :columns="columns"
      :table-data="tableData"
      row-key-field-name="rowKey"
      :checkbox-option="checkboxOption"
      :event-custom-option="eventCustomOption"
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
                const currentRowKey = row["rowKey"];
                this.changeSelectedRowKeysByRowClick(currentRowKey);
              },
            };
          },
        },
        checkboxOption: {
          // 可控属性
          selectedRowKeys: [1003],
          // 行选择改变事件
          selectedRowChange: ({ row, isSelected, selectedRowKeys }) => {},
          // 全选改变事件
          selectedAllChange: ({ isSelected, selectedRowKeys }) => {
            this.changeSelectedRowKeys(selectedRowKeys);
          },
        },

        columns: [
          {
            field: "",
            key: "a",
            // type=checkbox
            type: "checkbox",
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
    methods: {
      // 给可控属性重新赋值
      changeSelectedRowKeys(keys) {
        this.checkboxOption.selectedRowKeys = keys;
      },
      // 行点击触发
      changeSelectedRowKeysByRowClick(currentRowKey) {
        const { selectedRowKeys } = this.checkboxOption;

        if (selectedRowKeys.includes(currentRowKey)) {
          const rowKeyIndex = selectedRowKeys.indexOf(currentRowKey);
          selectedRowKeys.splice(rowKeyIndex, 1);
        } else {
          selectedRowKeys.push(currentRowKey);
        }
      },
    },
  };
</script>
```

:::
