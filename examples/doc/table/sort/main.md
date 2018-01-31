:::demo
```html
<template>
         <div class="mt30">
            <h3>排序</h3>

            <div class="mt30">
               <anchor id="single-columns-sort" label="单字段排序" h4 ></anchor>
               <single-columns-sort></single-columns-sort>
           </div>

           <div class="mt30">
              <anchor id="multiple-columns-sort" label="多字段排序" h4 ></anchor>
              <multiple-columns-sort></multiple-columns-sort>
          </div>
        </div>
</template>
<script>

    import singleColumnsSort from './single-columns-sort.md'
    import multipleColumnsSort from './multiple-columns-sort.md'

    export default{
        name: "sort-main",
        components: {
            singleColumnsSort,
            multipleColumnsSort
        }
    }
</script>
```
:::