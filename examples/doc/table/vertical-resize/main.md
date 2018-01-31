:::demo
```html
<template>
         <div class="mt30">
            <h3>表格纵向自适应</h3>

            <div class="mt30">
                <anchor id="vertical-table-resize" label="表格纵向自适应" h4 ></anchor>
                <vertical-table-resize></vertical-table-resize>
            </div>
        </div>
</template>
<script>

    import verticalTableResize from './vertical-table-resize.md'

    export default{
        name: "vertical-resize-main",
        components: {
            verticalTableResize,
        }
    }
</script>
```
:::