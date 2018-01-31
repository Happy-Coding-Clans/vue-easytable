:::demo
```html
<template>
         <div class="mt30">
            <h3>表格行/列合并</h3>

            <div class="mt30">
               <anchor id="cell-merge" label="行、列合并" h4 ></anchor>
               <cell-merge></cell-merge>
           </div>
        </div>
</template>
<script>

    import cellMerge from './cell-merge.md'

    export default{
        name: "cell-merge-main",
        components: {
            cellMerge
        }
    }
</script>
```
:::