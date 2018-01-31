:::demo
```html
<template>
         <div class="mt30">
            <h3>列固定</h3>

            <div class="mt30">
               <anchor id="fixed-title-columns" label="固定表头和固定列" h4 ></anchor>
               <fixed-title-columns></fixed-title-columns>
           </div>

            <div class="mt30">
                  <anchor id="complex-header-fixed-column" label="固定复杂表头和固定列" h4 ></anchor>
                  <complex-header-fixed-column></complex-header-fixed-column>
              </div>
        </div>
</template>
<script>

    import fixedTitleColumns from './fixed-title-columns.md'
    import complexHeaderFixedColumn from './complex-header-fixed-column.md'

    export default{
        name: "fixed-columns-title-main",
        components: {
            fixedTitleColumns,
            complexHeaderFixedColumn
        }
    }
</script>
```
:::