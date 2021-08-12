:::anchor 自定义
你还可以自定义加载文案、背景色、大小
:::demo 1、`color` 设置加载效果的颜色<br>2、`tip`设置加载文案<br>2、`overlayBackgroundColor`设置遮罩背景色，可以指定 [rgba](https://www.w3schools.com/cssref/func_rgba.asp)，让背景变得透明

```html
<template>
    <div>
        <button class="button-demo" @click="show()">开启 Loading</button>
        <button class="button-demo" @click="close()">关闭 Loading</button>
        <br />
        <br />
        <div
            id="custom-loading-container"
            style="width:100%;height:250px;background-color:#2980b9;"
        />
    </div>
</template>
<script>
    export default {
        data() {
            return {
                loadingInstance: null,
            };
        },
        methods: {
            show() {
                this.loadingInstance.show();
            },
            close() {
                this.loadingInstance.close();
            },
        },
        mounted() {
            this.loadingInstance = this.$veLoading({
                target: document.querySelector("#custom-loading-container"),
                name: "wave",
                color: "#fff",
                tip: "loading...",
                overlayBackgroundColor: "rgba(255, 255, 255, 0.1)",
            });
            this.show();
        },
        destroyed() {
            this.loadingInstance.destroy();
        },
    };
</script>
```

:::
