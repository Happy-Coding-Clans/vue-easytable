:::anchor Language Switching

You can use the velocal component to support multiple languages `VeLocal.use` Method to switch the current language
:::demo

```html
<template>
  <div>
    <div>
      <button class="button-demo" @click="englishLang()">English</button>
      <button class="button-demo" @click="chineseLang()">Chinese</button>
      <br /><br />
    </div>
    <div>
      <ve-pagination :total="600" />
    </div>
  </div>
</template>
<script>
  import zhCN from "vue-easytable/libs/locale/lang/zh-CN";
  import enUS from "vue-easytable/libs/locale/lang/en-US";

  export default {
    methods: {
      englishLang() {
        this.$veLocale.use(enUS);
      },
      chineseLang() {
        this.$veLocale.use(zhCN);
      },
    },
  };
</script>
```

:::
