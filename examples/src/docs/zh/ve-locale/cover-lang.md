:::anchor 覆盖语言包

通过 `VeLocale.update` 方法可以实现文案的修改和扩展
:::demo

```html
<template>
  <div>
    <div>
      <button class="button-demo" @click="coverLang()">修改文案</button>
      <br /><br />
    </div>
    <div>
      <ve-pagination :total="600" />
    </div>
  </div>
</template>
<script>
  export default {
    methods: {
      coverLang() {
        const lang = {
          pagination: {
            goto: "跳转到",
          },
        };
        this.$veLocale.update(lang);
      },
    },
  };
</script>
```

:::
