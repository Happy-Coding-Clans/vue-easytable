:::anchor 语言切换

你可以通过 VeLocal 组件实现多语言支持，使用 `VeLocal.use` 方法可以切换当前使用的语言
:::demo

```html
<template>
    <div>
        <div>
            <button class="button-demo" @click="englishLang()">英文</button>
            <button class="button-demo" @click="chineseLang()">中文</button>
            <br />
            <br />
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
