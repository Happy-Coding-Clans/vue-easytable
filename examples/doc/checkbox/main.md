:::demo

```html
<template>
<div>

    <div class="mt30">
         <h3>单选功能</h3>
         <checkbox-single></checkbox-single>
    </div>
    <div class="mt30">
         <h3>多选功能普通用法</h3>
         <checkbox-multiple-simple></checkbox-multiple-simple>
    </div>
    <div class="mt30">
         <h3>多选功能高级用法</h3>
         <checkbox-multiple-advanced></checkbox-multiple-advanced>
    </div>

</div>
</template>

<script>
import checkboxSingle from './checkbox-single.md'
import checkboxMultipleSimple from './checkbox-multiple-simple.md'
import checkboxMultipleAdvanced from './checkbox-multiple-advanced.md'
export default{
    components:{checkboxSingle,checkboxMultipleAdvanced,checkboxMultipleSimple}
}
</script>
```
:::