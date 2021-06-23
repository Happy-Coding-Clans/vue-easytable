:::anchor Combination Row Checkbox

:::demo Row checkbox, Need specify `rowKeyFieldName` property

```html
<template>
  <div>
    <ve-table
      fixed-header
      :max-height="500"
      :virtual-scroll-option="virtualScrollOption"
      :checkbox-option="checkboxOption"
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
        virtualScrollOption: {
          // 是否开启
          enable: true,
        },
        checkboxOption: {
          // 行选择改变事件
          selectedRowChange: ({ row, isSelected, selectedRowKeys }) => {
            console.log(row, isSelected, selectedRowKeys);
          },
          // 全选改变事件
          selectedAllChange: ({ isSelected, selectedRowKeys }) => {
            console.log(isSelected, selectedRowKeys);
          },
        },

        columns: [
          {
            field: "",
            key: "a",
            // type=checkbox
            type: "checkbox",
            title: "",
            width: 100,
            align: "center",
          },
          {
            field: "name",
            key: "b",
            title: "Name",
            width: 200,
            align: "left",
            renderBodyCell: ({ row }, h) => {
              return <span domPropsInnerHTML={row.name}></span>;
            },
          },
          { field: "hobby", key: "c", title: "Hobby", width: 300, align: "left" },
          { field: "address", key: "d", title: "Address", width: "", align: "left" },
        ],
        tableData: [],
      };
    },
    methods: {
      initData() {
        let data = [];
        for (let i = 0; i < 10000; i++) {
          data.push({
            rowKey: i,
            name: `name${i}`,
            hobby: `hobby${i}`,
            address: `address${i}`,
          });
        }

        this.tableData = data;
      },
    },
    created() {
      this.initData();
    },
  };
</script>
```

:::
