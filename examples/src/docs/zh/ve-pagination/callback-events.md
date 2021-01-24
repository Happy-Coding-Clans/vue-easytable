:::anchor Callback Events
:::demo 1、`on-page-number-change`Page number change callback event<br>2、`on-page-size-change`Change callback events under each page

```html
<template>
  <ve-pagination
    :total="600"
    @on-page-number-change="pageNumberChange"
    @on-page-size-change="pageSizeChange"
  />
</template>
<script>
  export default {
    methods: {
      pageNumberChange(pageIndex) {
        console.log(pageIndex);
      },

      pageSizeChange(pageSize) {
        console.log(pageSize);
      },
    },
  };
</script>
```

:::
