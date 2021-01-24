包含操作

:::demo

```html
<template>
  <ve-dropdown
    v-model="options"
    show-operation
    confirmFilterText="筛选"
    resetFilterText="重置"
    is-multiple
    @on-filter-confirm="filterConfirm"
    @on-filter-reset="filterReset"
  >
    <div style="color:blue;cursor: pointer;">
      点击这里
    </div>
  </ve-dropdown>
</template>
<script>
  export default {
    data() {
      return {
        options: [
          { value: 0, label: "张三" },
          { value: 1, label: "李四", selected: true },
          { value: 2, label: "王二" },
        ],
      };
    },
    methods: {
      filterConfirm(items) {
        console.log(items);
      },
      filterReset(items) {
        console.log(items);
      },
    },
  };
</script>
```

:::
