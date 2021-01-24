:::anchor 禁用固定表头

:::demo 通过`fixed-header="false"`禁用固定头。内容过多时，表头跟随滚动

```html
<template>
  <ve-table
    :max-height="200"
    :fixed-header="false"
    :columns="columns"
    :table-data="tableData"
  />
</template>

<script>
  export default {
    data() {
      return {
        columns: [
          {
            field: "name",
            key: "a",
            title: "Name",
            align: "center",
          },
          {
            field: "date",
            key: "b",
            title: "Date",
            align: "left",
          },
          {
            field: "hobby",
            key: "c",
            title: "Hobby",
            align: "center",
          },
          { field: "address", key: "d", title: "Address", align: "left" },
        ],
        tableData: [],
      };
    },
    methods: {
      initTableData() {
        let data = [];
        for (let i = 0; i < 15; i++) {
          data.push({
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
      this.initTableData();
    },
  };
</script>
```

:::
