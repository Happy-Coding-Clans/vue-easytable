:::demo
```html
<template>
         <div class="mt30">
            <h3>隐藏表格</h3>

            <div class="mt30">
               <anchor id="hide-table" label="隐藏表格" h4 ></anchor>
               <hide-table></hide-table>
           </div>
        </div>
</template>
<script>

    import hideTable from './hide-table.md'

    export default{
        name: "hide-table-main",
        components: {
            hideTable
        }
    }
</script>
```
:::