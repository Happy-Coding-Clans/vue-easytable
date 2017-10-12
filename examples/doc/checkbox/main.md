:::demo

```html
<template>
<div>

    <div class="mt30">
         <h3>单选功能</h3>
         <checkbox-single></checkbox-single>
    </div>
    <div class="mt30">
         <h3>多选功能</h3>
         <checkbox-multiple></checkbox-multiple>
    </div>

</div>
</template>

<script>
import checkboxSingle from './checkbox-single.md'
import checkboxMultiple from './checkbox-multiple.md'
export default{
    components:{checkboxSingle,checkboxMultiple}
}
</script>
```
:::