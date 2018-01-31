:::demo
```html
<template>
         <div class="mt30">
            <h3>自适应</h3>

            <div class="mt30">
               <anchor id="custom-columns" label="自定义列" h4 ></anchor>
               <custom-columns></custom-columns>
           </div>
        </div>
</template>
<script>

    import customColumns from './custom-columns.md'

    export default{
        name: "custom-columns-main",
        components: {
            customColumns
        }
    }
</script>
```
:::