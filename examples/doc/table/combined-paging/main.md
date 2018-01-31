:::demo
```html
<template>
         <div class="mt30">
            <h3>表格结合分页</h3>

            <div class="mt30">
                <anchor id="combined-paging" label="表格结合分页" h4 ></anchor>
                <combined-paging></combined-paging>
            </div>
        </div>
</template>
<script>

    import combinedPaging from './combined-paging.md'

    export default{
        name: "combined-paging-main",
        components: {
            combinedPaging,
        }
    }
</script>
```
:::