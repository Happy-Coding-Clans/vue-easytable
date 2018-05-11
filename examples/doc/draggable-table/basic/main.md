:::demo
```html
<template>
         <div class="mt30">
            <h3>基础用法(API参照table)</h3>

            <div class="mt30">
                <anchor id="set-table-width" label="基础用法" h4 ></anchor>
                <basic-draggable-table></basic-draggable-table>
            </div>
            <div class="mt30">
                <anchor id="no-table-width" label="基础用法，冻结部分列" h4 ></anchor>
                <frozen-draggable-table></frozen-draggable-table>
            </div>
        </div>
</template>
<script>


    import basicDraggableTable from './basic-draggable-table.md'
    import frozenDraggableTable from './frozen-draggable-table.md'



    export default{
        name: "basic-main",
        components: {
            basicDraggableTable,
            frozenDraggableTable
        }
    }
</script>
```
:::