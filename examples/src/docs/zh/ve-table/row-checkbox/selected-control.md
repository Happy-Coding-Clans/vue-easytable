:::anchor 可控属性

:::demo 1、`selectedRowKeys`为多选的"可控属性"，选择后需要在`selectedRowChange`事件和`selectedAllChange`事件中做重新赋值处理。通过这个属性可以自定义更多功能<br>2、设置`selectedRowKeys`属性后`defaultSelectedRowKeys`和`defaultSelectedAllRows`属性将会失效

```html
<template>
  <div>
    <button class="button-demo" @click="selectedSwitch(1002)">
      第二行选中切换
    </button>
    <button class="button-demo" @click="selectedAll()">选中全部</button>
    <button class="button-demo" @click="unselectedAll()">取消选中全部</button><br /><br />
    <ve-table
      style="width:100%"
      :columns="columns"
      :table-data="tableData"
      row-key-field-name="rowKey"
      :checkbox-option="checkboxOption"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        checkboxOption: {
          // 可控属性
          selectedRowKeys: [1003],
          // 行选择改变事件
          selectedRowChange: ({ row, isSelected, selectedRowKeys }) => {
            this.changeSelectedRowKeys(selectedRowKeys);
          },
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
      // 切换选中行
      selectedSwitch(key) {
        let selectedRowKeys = this.checkboxOption.selectedRowKeys;

        const rowKeyIndex = selectedRowKeys.indexOf(key);

        if (rowKeyIndex > -1) {
          selectedRowKeys.splice(rowKeyIndex, 1);
        } else {
          selectedRowKeys.push(key);
        }
      },
      // 选中全部
      selectedAll() {
        this.checkboxOption.selectedRowKeys = this.tableData.map((x) => x.rowKey);
      },
      // 取消选中全部
      unselectedAll() {
        this.checkboxOption.selectedRowKeys = [];
      },
    },
  };
</script>
```

:::
