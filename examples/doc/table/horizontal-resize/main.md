:::demo
```html
<template>
         <div class="mt30">
            <h3>表格横向自适应</h3>

            <div class="mt30">
                <anchor id="horizontal-table-resize" label="简单表格自适应" h4 ></anchor>
                <horizontal-table-resize></horizontal-table-resize>
            </div>

            <div class="mt30">
                 <anchor id="container-resize" label="容器中自适应" h4 ></anchor>
                 <container-resize></container-resize>
            </div>

            <div class="mt30">
                <anchor id="complex-table-resize" label="复杂表格自适应" h4 ></anchor>
                <complex-table-resize></complex-table-resize>
            </div>
        </div>
</template>
<script>

    import horizontalTableResize from './horizontal-table-resize.md'
    import containerResize from './container-resize.md'
    import complexTableResize from './complex-table-resize.md'

    export default{
        name: "horizontal-resize-main",
        components: {
            horizontalTableResize,
            containerResize,
            complexTableResize
        }
    }
</script>
```
:::