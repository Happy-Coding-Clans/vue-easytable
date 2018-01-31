:::demo
```html
<template>
         <div class="mt30">
            <h3>loading 以及错误提示</h3>

            <div class="mt30">
               <anchor id="loading" label="开启loading" h4 ></anchor>
               <loading></loading>
           </div>

            <div class="mt30">
                  <anchor id="custom-loading-and-error" label="自定义loading以及错误提示" h4 ></anchor>
                  <custom-loading-and-error></custom-loading-and-error>
              </div>
        </div>
</template>
<script>

    import loading from './loading.md'
    import customLoadingAndError from './custom-loading-and-error.md'

    export default{
        name: "loading-main",
        components: {
            loading,
            customLoadingAndError
        }
    }
</script>
```
:::