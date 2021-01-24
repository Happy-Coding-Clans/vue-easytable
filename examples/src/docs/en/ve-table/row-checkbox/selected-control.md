:::anchor Controllable attribute

:::demo 1、`selectedRowKeys` is a controllable attribute,After selection, you need to re assign values in the `selectedRowChange` event and the `selectedAllChange` event. More functions can be customized through this property<br>2、After setting the `selectedRowKeys` property, the `defaultSelectedRowKeys` and `defaultSelectedAllRows` properties will be invalid

```html
<template>
  <div>
    <button class="button-demo" @click="selectedSwitch(1002)">
      Second Row Switch Selection
    </button>
    <button class="button-demo" @click="selectedAll()">Select All</button>
    <button class="button-demo" @click="unselectedAll()">Deselect all</button
    ><br /><br />
    <ve-table
      style="width:100%"
      :columns="columns"
      :table-data="tableData"
      row-key-field-name="rowKey"
      :checkbox-optipon="checkboxOptipon"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        checkboxOptipon: {
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
    methods: {
      // 给可控属性重新赋值
      changeSelectedRowKeys(keys) {
        this.checkboxOptipon.selectedRowKeys = keys;
      },
      // 切换选中行
      selectedSwitch(key) {
        let selectedRowKeys = this.checkboxOptipon.selectedRowKeys;

        const rowKeyIndex = selectedRowKeys.indexOf(key);

        if (rowKeyIndex > -1) {
          selectedRowKeys.splice(rowKeyIndex, 1);
        } else {
          selectedRowKeys.push(key);
        }
      },
      // 选中全部
      selectedAll() {
        this.checkboxOptipon.selectedRowKeys = this.tableData.map(
          (x) => x.rowKey
        );
      },
      // 取消选中全部
      unselectedAll() {
        this.checkboxOptipon.selectedRowKeys = [];
      },
    },
  };
</script>
```

:::
