:::anchor Base Usage

:::demo

```html
<template>
  <div>
    <ve-table
      :max-height="500"
      :virtual-scroll-option="virtualScrollOption"
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
        columns: [
          { field: "name", key: "b", title: "Name", width: 200, align: "left" },
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
            name: i,
            date: i,
            hobby: i,
            address: i,
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
