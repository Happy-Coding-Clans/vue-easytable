:::anchor Row Click Trigger

This example is row click trigger selection,You can also click and select columns through event customization
:::demo The controllable attribute combined with "event customization" can trigger the selection effect by clicking the line

```html
<template>
  <div>
    <ve-table
      style="width:100%"
      :columns="columns"
      :table-data="tableData"
      :radio-option="radioOption"
      row-key-field-name="rowKey"
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
                const currentRowKey = row["rowKey"];
                this.changeSelectedRowKeyByRowClick(currentRowKey);
              },
            };
          },
        },
        radioOption: {
          selectedRowKey: "",
          selectedRowChange: ({ row }) => {
            this.changeSelectedRowKey(row.rowKey);
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
      changeSelectedRowKey(key) {
        this.radioOption.selectedRowKey = key;
      },
      // 行点击触发
      changeSelectedRowKeyByRowClick(currentRowKey) {
        this.radioOption.selectedRowKey = currentRowKey;
      },
    },
  };
</script>
```

:::
