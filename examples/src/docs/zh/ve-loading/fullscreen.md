:::anchor 整屏加载

:::demo 1、通过`fullscreen`参数，指定 Loading 全屏展示<br>2、通过`lock`参数，指定禁止鼠标滚动

```html
<template>
    <div>
        <button class="button-demo" @click="show()">开启 Loading</button>
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

                setTimeout(() => {
                    this.loadingInstance.close();
                }, 2000);
            },
        },
        mounted() {
            this.loadingInstance = this.$veLoading({
                fullscreen: true,
                name: "bounce",
                lock: true,
            });
        },
        destroyed() {
            this.loadingInstance.destroy();
        },
    };
</script>
```

:::
