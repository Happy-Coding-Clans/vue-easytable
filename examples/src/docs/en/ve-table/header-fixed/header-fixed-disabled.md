:::anchor Disable header fixed

:::demo `fixed-header="false"`disable fixed header.When there is too much content, the header will scroll with table content

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
