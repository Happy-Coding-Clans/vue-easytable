:::anchor Dynamic Height

:::demo 1、You can use the [calc CSS function](<https://developer.mozilla.org/en-US/docs/Web/CSS/calc()>) to achieve the dynamic height of the table. Such as `max-height="calc(100vh - 10px)"` or `max-height="calc(100% - 10px)"` etc.<br>2、You can try it by changing the height of the browser.

```html
<template>
  <ve-table
    max-height="calc(100vh - 350px)"
    fixed-header
    :columns="columns"
    :table-data="tableData"
  />
</template>

<script>
  export default {
    data() {
      return {
        columns: [
          { field: "name", key: "a", title: "Name", align: "center" },
          { field: "date", key: "b", title: "Date", align: "left" },
          { field: "hobby", key: "c", title: "Hobby", align: "center" },
          { field: "address", key: "d", title: "Address", align: "left" },
        ],
        tableData: [],
      };
    },
    methods: {
      initTableData() {
        let data = [];
        for (let i = 0; i < 20; i++) {
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
