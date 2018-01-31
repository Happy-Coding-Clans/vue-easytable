:::demo
```html
<template>
         <div class="mt30">
            <h3>单元格编辑</h3>

            <div class="mt30">
               <anchor id="cell-edit" label="单元格编辑" h4 ></anchor>
               <cell-edit></cell-edit>
           </div>
        </div>
</template>
<script>

    import cellEdit from './cell-edit.md'

    export default{
        name: "cell-edit-main",
        components: {
            cellEdit
        }
    }
</script>
```
:::