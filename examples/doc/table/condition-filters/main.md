:::demo
```html
<template>
         <div class="mt30">
            <h3>条件筛选</h3>

            <div class="mt30">
               <anchor id="filters" label="简单表头条件筛选" h4 ></anchor>
               <filters></filters>
           </div>

            <div class="mt30">
                  <anchor id="complex-header-filters" label="复杂表头条件筛选" h4 ></anchor>
                  <complex-header-filters></complex-header-filters>
              </div>
        </div>
</template>
<script>

    import filters from './filters.md'
      import complexHeaderFilters from './complex-header-filters.md'

    export default{
        name: "condition-filters-main",
        components: {
            filters,
            complexHeaderFilters
        }
    }
</script>
```
:::