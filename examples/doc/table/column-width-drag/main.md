:::demo
```html
<template>
         <div class="mt30">
            <h3>列宽拖动</h3>

            <div class="mt30">
               <anchor id="column-width-drag" label="列宽拖动" h4 ></anchor>
               <column-width-drag></column-width-drag>
           </div>
        </div>
</template>
<script>

    import columnWidthDrag from './column-width-drag.md'

    export default{
        name: "column-width-drag-main",
        components: {
            columnWidthDrag
        }
    }
</script>
```
:::