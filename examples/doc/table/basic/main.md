:::demo
```html
<template>
         <div class="mt30">
            <h3>基础用法</h3>

            <div class="mt30">
                <anchor id="set-table-width" label="基础用法" h4 ></anchor>
                <basic-set-table-width></basic-set-table-width>
            </div>
            <div class="mt30">
                <anchor id="no-table-width" label="基础用法，只设置每列的宽度" h4 ></anchor>
                <basic-no-table-width></basic-no-table-width>
            </div>
        </div>
</template>
<script>

    import basicSetTableWidth from './basic-set-table-width.md'
    import basicNoTableWidth from './basic-no-table-width.md'



    export default{
        name: "basic-draggable-table-main",
        components: {
            basicSetTableWidth,
            basicNoTableWidth
        }
    }
</script>
```
:::