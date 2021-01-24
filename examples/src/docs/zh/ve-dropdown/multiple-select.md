多选

:::demo

```html
<template>
  <ve-dropdown v-model="options" is-multiple>
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
          { value: 0, label: "张三", selected: true },
          { value: 1, label: "李四", selected: true },
          { value: 2, label: "王二" },
        ],
      };
    },
  };
</script>
```

:::
