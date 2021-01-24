:::anchor Override Default Configs

Use Locale.update method to modify the default configs.
:::demo

```html
<template>
  <div>
    <div>
      <button class="button-demo" @click="coverLang()">Override Config</button>
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
            goto: "to",
          },
        };
        this.$veLocale.update(lang);
      },
    },
  };
</script>
```

:::
