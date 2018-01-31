:::demo
```html
<template>
         <div class="mt30">
            <h3>单元格样式</h3>

            <div class="mt30">
               <anchor id="cell-style" label="单元格样式" h4 ></anchor>
               <cell-style></cell-style>
           </div>
        </div>
</template>
<script>

    import cellStyle from './cell-style.md'

    export default{
        name: "cell-style-main",
        components: {
            cellStyle
        }
    }
</script>
```
:::