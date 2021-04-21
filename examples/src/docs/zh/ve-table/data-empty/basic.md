:::anchor 空数据

:::demo

```html
<template>
  <div>
    <ve-table :columns="columns" :table-data="tableData" border-y />
    <div v-show="tableData.length === 0" class="empty-data">暂无数据</div>
  </div>
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
  };
</script>

<style>
  .empty-data {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    width: 100%;
    color: #666;
    font-size: 16px;
    border: 1px solid #eee;
    border-top: 0;
  }
</style>
```

:::
